// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import {
  Box,
  FormControlLabel,
  FormHelperText,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery
} from '@mui/material'
import { useEffect, useState } from 'react'
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles';
import ContestantAutocomplete from 'src/Components/Contestant/ContestantAutocomplete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const Add_contestant = ({ selectedRopingId, flag, setFlag, classification }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: 600
  }
  const [selectedHeader, setSelectedHeader] = useState(null)
  const [selectedHealer, setSelectedHealer] = useState(null)
  const [headerRatingSaved, setHeaderRatingSaved] = useState(false)
  const [healerRatingSaved, setHealerRatingSaved] = useState(false)
  const [entry, setEntry] = useState({ header: 1, healer: 0 })
  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const [drawEntries, setDrawEntries] = useState([])
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    console.log(
      'This useEffect is in addContestant page and the roping id which we are getting is : ',
      selectedRopingId
    )
  }, [selectedRopingId])

  useEffect(async () => {
    try {
      const response = await API.getAPICalling(`Teams/?ropingId=${selectedRopingId}&roping_team_type=Pick_Only`)
      console.log(response)
      setDrawEntries(response)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [flag, selectedRopingId])

  const handleHeaderRatingChange = e => {
    const { value } = e.target
    setSelectedHeader({ ...selectedHeader, header_rating: value === '' ? null : Number(value) })
    setHeaderRatingSaved(false)
  }
  const handleHealerRatingChange = e => {
    const { value } = e.target
    setSelectedHealer({ ...selectedHealer, healer_rating: value === '' ? null : Number(value) })
    setHealerRatingSaved(false)
  }

  const handleSaveHeaderRating = async () => {
    try {
      await API.putAPICalling(`contestant/${selectedHeader.id}`, { header_rating: selectedHeader.header_rating })
      setHeaderRatingSaved(true)
      setMessage('Header rating saved to profile')
      handleMessageOpen()
    } catch (error) {
      setMessage(error.message)
      handleMessageOpen()
    }
  }
  const handleSaveHealerRating = async () => {
    try {
      await API.putAPICalling(`contestant/${selectedHealer.id}`, { healer_rating: selectedHealer.healer_rating })
      setHealerRatingSaved(true)
      setMessage('Healer rating saved to profile')
      handleMessageOpen()
    } catch (error) {
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const handleAddTeam = async () => {
    if (
      !selectedHeader ||
      selectedHeader.header_rating === null ||
      !selectedHealer ||
      selectedHealer.healer_rating === null
    ) {
      setMessage('please fill out the required fields first')
      handleMessageOpen()
    }
    else if (selectedHeader.id===selectedHealer.id){
      setMessage("Header and healer cannot be same");
      handleMessageOpen();
    }
    else {
      const data = {
        roping_Id: selectedRopingId,
        classification: classification,
        headerRating: selectedHeader.header_rating,
        healerRating: selectedHealer.healer_rating,
        header_Id: selectedHeader.id,
        healer_Id: selectedHealer.id,
        roping_team_type:"Pick_Only"
      }
      console.log(data)
      try {
        const response = await API.postAPICalling('Teams/PickOnlyTeams', data)
        console.log(response)
        // if(response.message==="Error creating Draw"){
        // }
        // else{
        //   setMessage("Added Successfully");
        // }
        setMessage(response.message)
        handleMessageOpen()
        setFlag(prev => !prev)
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message)
        handleMessageOpen()
      }
    }
  }

  const handleDeleteTeam=async(e)=>{
    if(!selectedHeader || !selectedHealer || selectedHeader.header_rating===null || selectedHealer.healer_rating===null){
      setMessage("Please select a contestant first");
      handleMessageOpen();
    }
    else{
      const data={
        roping_Id :selectedRopingId,
        header_Id:selectedHeader.id,
        healer_Id:selectedHealer.id,
        roping_team_type:"Pick_Only"
      }
      try {
        const response = await API.deleteAPIWithoutToken(`Teams/DeletePickOnly-teams`, data)
        console.log(response)
        setMessage(response.message)
        setFlag(prev=>!prev);
        handleMessageOpen();
      } catch (error) {
        console.log('Some error:  ', error)
        if(error.message==="Internal server error"){
          setMessage("Cannot delete Teams as time is already added");
        handleMessageOpen()
        }
        else{
          setMessage(error.message)
          handleMessageOpen()
        }
      }
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Add Team' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={3}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'end', paddingTop: '15px' }}
                >
                  Header Name
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <ContestantAutocomplete
                  label='Header'
                  value={selectedHeader}
                  onSelect={contestant => {
                    setSelectedHeader(contestant)
                    setHeaderRatingSaved(false)
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                  Header Rating
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  onChange={handleHeaderRatingChange}
                  inputProps={{ min: 0 }}
                  name='header_rating'
                  required
                  disabled={!selectedHeader}
                  value={selectedHeader && selectedHeader.header_rating !== null ? selectedHeader.header_rating : ''}
                  type='number'
                  placeholder='00'
                />
              </Grid>
              <Grid item xs={6} sm={1} sx={{ display: 'flex', alignItems: 'center' }}>
                {selectedHeader && selectedHeader.header_rating !== null && !headerRatingSaved && (
                  <Button onClick={handleSaveHeaderRating} type='button' variant='outlined' size='small'>
                    Save to profile
                  </Button>
                )}
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'end', paddingTop: '15px' }}
                >
                  Healer Name
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <ContestantAutocomplete
                  label='Healer'
                  value={selectedHealer}
                  onSelect={contestant => {
                    setSelectedHealer(contestant)
                    setHealerRatingSaved(false)
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                  Heeler Rating
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  onChange={handleHealerRatingChange}
                  inputProps={{ min: 0 }}
                  type='number'
                  required
                  disabled={!selectedHealer}
                  value={selectedHealer && selectedHealer.healer_rating !== null ? selectedHealer.healer_rating : ''}
                  name='healer_rating'
                  placeholder='00'
                />
              </Grid>
              <Grid item xs={6} sm={1} sx={{ display: 'flex', alignItems: 'center' }}>
                {selectedHealer && selectedHealer.healer_rating !== null && !healerRatingSaved && (
                  <Button onClick={handleSaveHealerRating} type='button' variant='outlined' size='small'>
                    Save to profile
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleAddTeam} type='button' variant='contained' size='medium'>
                  Add Team
                </Button>
              </Grid>
              <Grid item  xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleDeleteTeam} type='button' variant='contained' size='medium'>
                  Delete Team
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleOpen} type='button' variant='contained' size='medium'>
                  List all Teams
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Modal
        open={messageOpen}
        onClose={handleMessageClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-description' sx={{ mt: 2, mb: 3, fontSize: '20px' }}>
            {message}
          </Typography>
          <Button onClick={handleMessageClose} type='button' variant='contained' size='medium'>
            OK
          </Button>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>S.No</StyledTableCell>
                  <StyledTableCell align='center'>Header Name</StyledTableCell>
                  <StyledTableCell align='center'>Heeler Name </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drawEntries.map((draw, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row' align='center'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{draw.header.name}</StyledTableCell>
                    <StyledTableCell align='center'>{draw.healer.name}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  )
}

export default Add_contestant
