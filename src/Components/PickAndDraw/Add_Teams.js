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


const Add_Teams = ({ selectedRopingId, flag, setFlag, classification }) => {
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
  const [headerRatingsSaved, setHeaderRatingsSaved] = useState(false)
  const [healerRatingsSaved, setHealerRatingsSaved] = useState(false)
  const [entry, setEntry] = useState({ header: 1, healer: 0 })
  const [drawValues,setDrawValues]=useState([]);
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


  const [drawOpen,setDrawOpem]=useState(false);
  const handleDrawOpen=()=>setDrawOpem(true);
  const handleDrawClose=()=>setDrawOpem(false);

  useEffect(() => {
    console.log(
      'This useEffect is in addContestant page and the roping id which we are getting is : ',
      selectedRopingId
    )
  }, [selectedRopingId])

  useEffect(async ()=>{
    try {
      const response = await API.getAPICalling(`draw-entries/getDraw/${selectedRopingId}`,)
      console.log(response)
      setDrawValues(response);
    } catch (error) {
      console.log('Some error:  ', error)
    }
  },[flag])

  useEffect(async () => {
    console.log("In add teams useEDffecty");
    try {
      const response = await API.getAPICalling(`Teams/?ropingId=${selectedRopingId}&roping_team_type=Pick_And_Draw`)
      console.log(response)
      setDrawEntries(response)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [flag, selectedRopingId])

  const handleHeaderHeaderRatingChange = e => {
    const { value } = e.target
    setSelectedHeader({ ...selectedHeader, header_rating: value === '' ? null : Number(value) })
    setHeaderRatingsSaved(false)
  }
  const handleHeaderHealerRatingChange = e => {
    const { value } = e.target
    setSelectedHeader({ ...selectedHeader, healer_rating: value === '' ? null : Number(value) })
    setHeaderRatingsSaved(false)
  }
  const handleHealerHeaderRatingChange = e => {
    const { value } = e.target
    setSelectedHealer({ ...selectedHealer, header_rating: value === '' ? null : Number(value) })
    setHealerRatingsSaved(false)
  }
  const handleHealerHealerRatingChange = e => {
    const { value } = e.target
    setSelectedHealer({ ...selectedHealer, healer_rating: value === '' ? null : Number(value) })
    setHealerRatingsSaved(false)
  }

  const handleAddTeam = async () => {
    if (
      !selectedHeader ||
      selectedHeader.header_rating === null ||
      selectedHeader.healer_rating === null ||
      !selectedHealer ||
      selectedHealer.header_rating === null ||
      selectedHealer.healer_rating === null
    ) {
      setMessage('Both the header and healer need both a header rating and a healer rating on file before they can form a team - fill in the missing rating(s) below first')
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
        header_headerRating: selectedHeader.header_rating,
        header_healerRating: selectedHeader.healer_rating,
        healer_headerRating: selectedHealer.header_rating,
        healer_healerRating: selectedHealer.healer_rating,
        header_Id: selectedHeader.id,
        healer_Id: selectedHealer.id,
        roping_team_type:"Pick_And_Draw"
      }
      console.log(data);
      try {
        const response = await API.postAPICalling('Teams/PickAndDraw_PickOnlyteam', data)
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
    if(!selectedHeader || !selectedHealer){
      setMessage("Please select a contestant first");
      handleMessageOpen();
    }
    else{
      const data={
        roping_Id :selectedRopingId,
        header_Id:selectedHeader.id,
        healer_Id:selectedHealer.id,
        roping_team_type:"Pick_And_Draw"
      }
      try {
        const response = await API.deleteAPIWithoutToken(`Teams/delete-teams`, data)
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


  const handleListTeam=async ()=>{

    try {
      const response = await API.getAPICalling(`Teams/?ropingId=${selectedRopingId}&roping_team_type=Pick_And_Draw`)
      console.log(response)
      setDrawEntries(response);
      handleOpen();
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message);
      handleMessageOpen();
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
                    setHeaderRatingsSaved(false)
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                  Header Rating
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  onChange={handleHeaderHeaderRatingChange}
                  inputProps={{ min: 0 }}
                  name='header_rating'
                  required
                  disabled={!selectedHeader}
                  value={selectedHeader && selectedHeader.header_rating !== null ? selectedHeader.header_rating : ''}
                  type='number'
                  placeholder='00'
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                  (Healer Rating)
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  onChange={handleHeaderHealerRatingChange}
                  inputProps={{ min: 0 }}
                  required
                  disabled={!selectedHeader}
                  value={selectedHeader && selectedHeader.healer_rating !== null ? selectedHeader.healer_rating : ''}
                  type='number'
                  placeholder='00'
                />
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
                    setHealerRatingsSaved(false)
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                  Heeler Rating
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  onChange={handleHealerHealerRatingChange}
                  inputProps={{ min: 0 }}
                  type='number'
                  disabled={!selectedHealer}
                  value={selectedHealer && selectedHealer.healer_rating !== null ? selectedHealer.healer_rating : ''}
                  name='healer_rating'
                  placeholder='00'
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                  (Header Rating)
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  onChange={handleHealerHeaderRatingChange}
                  inputProps={{ min: 0 }}
                  type='number'
                  required
                  disabled={!selectedHealer}
                  value={selectedHealer && selectedHealer.header_rating !== null ? selectedHealer.header_rating : ''}
                  placeholder='00'
                />
              </Grid>
              {selectedHeader && selectedHeader.header_rating !== null && selectedHeader.healer_rating !== null && !headerRatingsSaved && (
                <Grid item xs={6} sx={{ textAlign: 'center' }}>
                  <Button
                    onClick={() =>
                      API.putAPICalling(`contestant/${selectedHeader.id}`, {
                        header_rating: selectedHeader.header_rating,
                        healer_rating: selectedHeader.healer_rating
                      })
                        .then(() => {
                          setHeaderRatingsSaved(true)
                          setMessage("Header's ratings saved to profile")
                          handleMessageOpen()
                        })
                        .catch(error => {
                          setMessage(error.message)
                          handleMessageOpen()
                        })
                    }
                    type='button'
                    variant='outlined'
                    size='small'
                  >
                    Save header&apos;s ratings to profile
                  </Button>
                </Grid>
              )}
              {selectedHealer && selectedHealer.header_rating !== null && selectedHealer.healer_rating !== null && !healerRatingsSaved && (
                <Grid item xs={6} sx={{ textAlign: 'center' }}>
                  <Button
                    onClick={() =>
                      API.putAPICalling(`contestant/${selectedHealer.id}`, {
                        header_rating: selectedHealer.header_rating,
                        healer_rating: selectedHealer.healer_rating
                      })
                        .then(() => {
                          setHealerRatingsSaved(true)
                          setMessage("Healer's ratings saved to profile")
                          handleMessageOpen()
                        })
                        .catch(error => {
                          setMessage(error.message)
                          handleMessageOpen()
                        })
                    }
                    type='button'
                    variant='outlined'
                    size='small'
                  >
                    Save healer&apos;s ratings to profile
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleAddTeam} type='button' variant='contained' size='medium'>
                  Add Team
                </Button>
              </Grid>
              <Grid item  xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleDeleteTeam} type='button' variant='contained' size='medium'>
                  Delete Team
                </Button>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleListTeam} type='button' variant='contained' size='medium'>
                  List all Teams
                </Button>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleDrawOpen} type='button' variant='contained' size='medium'>
                  List Draw Entries
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

      <Modal
          open={drawOpen}
          onClose={handleDrawClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}> 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='center'>Header Rating</StyledTableCell>
              <StyledTableCell align='center'>Heeler Rating </StyledTableCell>
              <StyledTableCell align='center'>Header Entries </StyledTableCell>
              <StyledTableCell align='center'>Heeler Entries </StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {drawValues.map((draw, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component='th' scope='row' align='center'>
                  {draw.contestant.name}
                </StyledTableCell>
                <StyledTableCell align='center'>{draw.header_rating}</StyledTableCell>
                <StyledTableCell align='center'>{draw.healer_rating}</StyledTableCell>
                <StyledTableCell align='center'>{draw.header_entries}</StyledTableCell>
                <StyledTableCell align='center'>{draw.healer_entries}</StyledTableCell>
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

export default Add_Teams
