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
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
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
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles';

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
  const [contestantList, setContestantList] = useState([])
  const [selectedHeader, setSelectedHeader] = useState({
    id: null,
    header_rating: null
  })
  const [selectedHealer, setSelectedHealer] = useState({
    id: null,
    healer_rating: null
  })
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
    const item = localStorage.getItem('token')
    try {
      const response = await API.getAPICalling(`contestant`, item)
      console.log(response.data)
      setContestantList(response.data)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [])

  useEffect(async () => {
    try {
      const response = await API.getAPICalling(`PickOrDraw/get-teams/${selectedRopingId}`)
      console.log(response)
      setDrawEntries(response)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [flag, selectedRopingId])

  const handleHeaderChange = e => {
    // console.log(e.target.name)
    if (e.target.name === 'name') {
      const id = e.target.value
      const selectedObject = contestantList.find(item => item.id === id)
      setSelectedHeader({
        id: selectedObject.id,
        header_rating: selectedObject.header_rating
      })
      console.log(selectedObject)
    } else {
      const { name, value } = e.target;
      setSelectedHeader({ ...selectedHeader,  
        [name]: value === '' ? '' : Number(value), // Convert to number or keep it as empty string
      })
    }
  }
  const handleHealerChange = e => {
    // console.log(e.target.name)
    if (e.target.name === 'name') {
      const id = e.target.value
      const selectedObject = contestantList.find(item => item.id === id)
      setSelectedHealer({
        id: selectedObject.id,
        healer_rating: selectedObject.healer_rating
      })
      console.log(selectedObject)
    } else {
      const { name, value } = e.target;
      setSelectedHealer({ ...selectedHealer,        
         [name]: value === '' ? '' : Number(value), // Convert to number or keep it as empty string

      })
    }
  }

  const handleAddTeam = async () => {
    if (
      selectedHeader.id === null ||
      selectedHeader.header_rating === null ||
      selectedHealer.healer_rating === null ||
      selectedHealer.id === null
    ) {
      setMessage('please fill out the required fields first')
      handleMessageOpen()
    } else {
      const data = {
        roping_Id: selectedRopingId,
        classification: classification,
        headerRating: selectedHeader.header_rating,
        healerRating: selectedHealer.healer_rating,
        header_Id: selectedHeader.id,
        healer_Id: selectedHealer.id
      }
      console.log(data);
      try {
        const response = await API.postAPICalling('PickOrDraw/createteam', data)
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
    if(selectedHeader.id===null || selectedHealer.id===null || selectedHeader.header_rating===null || selectedHealer.healer_rating===null){
      setMessage("Please select a contestant first");
      handleMessageOpen();
    }
    else{
      const data={
        roping_Id :selectedRopingId,
        header_Id:selectedHeader.id,
        healer_Id:selectedHealer.id
      }
      try {
        const response = await API.deleteAPIWithoutToken(`PickOrDraw/delete-teams`, data)
        console.log(response)
        setMessage(response.message)
        setFlag(prev=>!prev);
        handleMessageOpen();
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message);
        handleMessageOpen();
      }
    }
  }

  const handleListTeams=async()=>{
    try {
      const response = await API.getAPICalling(`PickOrDraw/get-teams/${selectedRopingId}`)
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
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Header</InputLabel>
                  <Select
                    label='Header'
                    name='name'
                    onChange={handleHeaderChange}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    {contestantList.map(contestant => (
                      <MenuItem key={contestant.id} value={contestant.id}>
                        {contestant.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                  Header Rating
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  onChange={handleHeaderChange}
                  name='header_rating'
                  required
                  value={selectedHeader.header_rating ? selectedHeader.header_rating : ''}
                  type='number'
                  // label='Phone No.'
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
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Healer</InputLabel>
                  <Select
                    label='Healer'
                    name='name'
                    onChange={handleHealerChange}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    {contestantList.map(contestant => (
                      <MenuItem key={contestant.id} value={contestant.id}>
                        {contestant.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                  Heeler Rating
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  onChange={handleHealerChange}
                  type='number'
                  required
                  value={selectedHealer.healer_rating ? selectedHealer.healer_rating : ''}
                  name='healer_rating'
                  // label='Phone No.'
                  placeholder='00'
                />
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
                <Button onClick={handleListTeams} type='button' variant='contained' size='medium'>
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

export default Add_Teams
