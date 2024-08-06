import * as React from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
// import Divider from '@mui/material/Divider'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
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
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles';

// ** Icons Imports
// import Phone from 'mdi-material-ui/Phone'
// import EmailOutline from 'mdi-material-ui/EmailOutline'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import MessageOutline from 'mdi-material-ui/MessageOutline'

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

const createData = (no, header, heeler) => {
  return { no, header, heeler }
}

const rows = [
  createData(1, 'David Warner', 'Aaron Finch'),
  createData(2, 'Martin Guptil', 'Tom Latham'),
  createData(3, 'Quinton Decock', 'Hashim Amla'),
  createData(4, 'Rohit Sharma', 'Shikhar Dhawan'),
  createData(5, 'Evin Lewis', 'Shai Hope'),
  createData(6, 'Jason Roy', 'Alex Hales'),
  createData(7, 'Fakhar Zaman', 'Imam Ul Haq'),
  createData(8, 'Tamim Iqbal', 'Liton Das')
]


const Contest_Roping_Information = ({ selectedRopingId, classification, flag }) => {
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
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [message, setMessage] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false);
  const [numberOfTeams,setNumberOfTeams]=React.useState(null);
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }
  const [teams, setTeams] = React.useState([])
  const [drawState, setDrawState] = React.useState('Incomplete')
  const [participants, setParticipants] = React.useState({ header: 0, healer: 0 })

  React.useEffect(async () => {
    try {
      const response = await API.getAPICalling(`draw-entries/getDraw/${selectedRopingId}`)
      console.log(response)
      let headersCount = 0
      let healersCount = 0

      response.forEach(item => {
        if (item.header_entries === 1) {
          headersCount++
        }
        if (item.healer_entries === 1) {
          healersCount++
        }
      })

      setParticipants({
        header: headersCount,
        healer: healersCount
      })
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [flag,selectedRopingId])

  React.useEffect(async () => {
    setDrawState("Processing");
    try {
      const response = await API.getAPICalling(`drawpot/${selectedRopingId}`)
      console.log(response.data)
      setDrawState("Complete")
      const len=response.length;
      setNumberOfTeams(len);
      setTeams(response);
    } catch (error) {
      console.log('Some error:  ', error)
      setDrawState("Incomplete");
      setNumberOfTeams(null);
      setTeams([]);
    }
  }, [selectedRopingId])

  const handleDrawTeamsButtonClick = async () => {
    if (participants.header === 0 || participants.healer === 0 || participants.header !== participants.healer) {
      setMessage('The number of headers and healers should be same')
      handleMessageOpen()
    }else if(teams.length!==0){
      setMessage("Firstly Delete the existing team from the draw then draw again");
      handleMessageOpen();
    }
     else {
      setDrawState('Processing')
      const data = {
        ropingId: selectedRopingId,
        classification: classification
      }
      console.log(data)
      try {
        const response = await API.postAPICalling(`drawpot/teams`, data)
        console.log(response.data)
        setMessage(response.message)
        handleMessageOpen()
        setDrawState('Complete')
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message)
        handleMessageOpen()
        setDrawState('Incomplete')
      }
    }
  }

  const handleDeleteDrawButtonClick = async () => {
    try {
      const response = await API.deleteAPICalling(`drawpot/${selectedRopingId}`)
      console.log(response.data)
      setTeams([])
      setMessage(response.message)
      handleMessageOpen()
      setNumberOfTeams(null);
      setDrawState('Incomplete')
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const handleListTeamClick = async () => {
    try {
      console.log("In list team :", selectedRopingId);
      const response = await API.getAPICalling(`drawpot/${selectedRopingId}`)
      console.log(response)
      setTeams(response)
      const len=response.length;
      setNumberOfTeams(len);
      handleOpen()
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  return (
    <>
      <Card>
        {/* <CardHeader title='Roping Information' titleTypographyProps={{ variant: 'h6' }} /> */}
        <CardContent>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
                >
                  Draw information and activities
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                  Number of headers entered
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  type='number'
                  value={participants.header}
                  // label='Phone No.'
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                  Number of heelers entered
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  type='number'
                  value={participants.healer}
                  // label='Phone No.'
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label='Draw unique patterns if possible'
                  control={<Checkbox name='form-layouts-alignment-checkbox' />}
                  sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                  Draw Status
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField value={drawState} fullWidth type='text' />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={6} sm={4}>
                <Button onClick={handleDrawTeamsButtonClick} type='button' variant='contained' size='medium'>
                  Draw Partners
                </Button>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Button onClick={handleDeleteDrawButtonClick} type='button' variant='contained' size='medium'>
                  Delete Draw Teams
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
                >
                  Team information and activities
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                  Number of teams entered
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  type='number'
                  value={numberOfTeams?numberOfTeams:""}
                  // label='Phone No.'
                  placeholder='00'
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleListTeamClick} type='button' variant='contained' size='medium'>
                  List Teams
                </Button>
              </Grid>
              {/* <Grid item xs={12}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
                >
                  Arrange Teams
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='female'
                    name='radio-buttons-group'
                  >
                    <FormControlLabel value='LIFO' control={<Radio />} label='First to enter last to rope' />
                    <FormControlLabel value='FIFO' control={<Radio />} label='First to enter first to rope' />
                    <FormControlLabel value='Random' control={<Radio />} label='Random order' />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px', textAlign: 'center' }}>
                  Roper Seperation:
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  type='number'
                  // label='Phone No.'
                  placeholder='00'
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleOpen} type='button' variant='contained' size='medium'>
                  Arrange Teams
                </Button>
              </Grid> */}
            </Grid>
          </form>
        </CardContent>
      </Card>
      <div>
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
                    <StyledTableCell align='center'>Teams</StyledTableCell>
                    <StyledTableCell align='center'>Header</StyledTableCell>
                    <StyledTableCell align='center'>Heeler</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams &&
                    teams.map((team, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component='th' scope='row' align='center'>
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align='center'>{team.header.name}</StyledTableCell>
                        <StyledTableCell align='center'>{team.healer.name}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </div>
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
    </>
  )
}

export default Contest_Roping_Information

// TOM MARVOLO RIDDLE
// I AM LORD VOLDEMORT
