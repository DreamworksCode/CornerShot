import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
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
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import API from 'src/pages/api'

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

const GetRopingReports = ({ selectedRopingId, roping, selectedPayoff, payoffId, isChecked, individual }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 700,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: 600
  }

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: 600
  }

  const [selectedReport, setSelectedReport] = useState(1)

  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  const [drawOpen, setDrawOpen] = useState(false)
  const handleDrawOpen = () => setDrawOpen(true)
  const handleDrawClose = () => setDrawOpen(false)
  const [drawEntries, setDrawEntries] = useState([])

  const [averageTableOpen, setAverageTableOpen] = useState(false)
  const handleAverageOpen = () => setAverageTableOpen(true)
  const handleAverageClose = () => setAverageTableOpen(false)
  const [averageData, setAverageData] = useState([])

  const [teamOpen, setTeamOpen] = useState(false)
  const handleTeamOpen = () => setTeamOpen(true)
  const handleTeamClose = () => setTeamOpen(false)
  const [teams, setTeams] = useState([])

  const [timersheetOpen, setTimerSheetOpen] = useState(false)
  const handleTimerSheetOpen = () => setTimerSheetOpen(true)
  const handleTimerSheetClose = () => setTimerSheetOpen(false)
  const [timerTeams, setTimerteams] = useState([])

  const [contestantOpen, setContestantOpen] = useState(false)
  const handleContestantOpen = () => setContestantOpen(true)
  const handleContestantClose = () => setContestantOpen(false)
  const [contestants, setContestants] = useState([])

  const [resultsPayoffOpen, setResultsPayoffOpen] = useState(false)
  const handleResultsPayoffOpen = () => setResultsPayoffOpen(true)
  const handleResultsPayoffClose = () => setResultsPayoffOpen(false)
  const [payoffData, setPayoffData] = useState([])
  const [payoffEntry, setPayoffEntry] = useState([])

  const handleChange = e => {
    const { value } = e.target
    setSelectedReport(Number(value))
  }

  const handleSubmit = async () => {
    if (selectedReport === 1) {
      try {
        const response = await API.getAPICalling(`Reports/ContestantsByNames/${selectedRopingId}`)
        console.log(response)
        setContestants(response)
        handleContestantOpen()
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message)
        handleMessageOpen()
      }
    } else if (selectedReport === 2) {
      try {
        const response = await API.getAPICalling(`draw-entries/getDraw/${selectedRopingId}`)
        console.log(response)
        setDrawEntries(response)
        handleDrawOpen()
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message)
        handleMessageOpen()
      }
    } else if (selectedReport === 3) {
      try {
        const response = await API.getAPICalling(`Team-Times/max-rounds?roping_id=${selectedRopingId}`)
        response.forEach(item => {
          if (item.current_time === 0) {
            item.round_number -= 1
          }
        })

        // Sort by round_number (descending), then by total_time (ascending)
        response.sort((a, b) => {
          if (b.round_number !== a.round_number) {
            return b.round_number - a.round_number
          } else {
            return a.total_time - b.total_time
          }
        })

        setAverageData(response)
        handleAverageOpen()
        console.log(response)
      } catch (error) {
        console.log('Some error:  ', error)
        setAverageData([])
        setMessage(error.message)
        handleMessageOpen()
      }
    } else if (selectedReport === 4) {
      try {
        const response = await API.getAPICalling(`Team-Times/max-rounds?roping_id=${selectedRopingId}`)
        response.forEach(item => {
          if (item.current_time === 0) {
            item.round_number -= 1
          }
        })

        // Sort by round_number (descending), then by total_time (ascending)
        response.sort((a, b) => {
          if (b.round_number !== a.round_number) {
            return b.round_number - a.round_number
          } else {
            return a.total_time - b.total_time
          }
        })
        if(selectedPayoff===null){
            setMessage("No payoffs for this production");
            handleMessageOpen();
        }
        else{
          const limitedResponse = response.slice(0, selectedPayoff.payoff.places_to_pay)
          setPayoffData(limitedResponse)
  
          // setAverageData(response)
          handleResultsPayoffOpen()
        }
        console.log(response)
      } catch (error) {
        console.log('Some error:  ', error)
        setAverageData([])
        setMessage(error.message)
        handleMessageOpen()
      }
    } else if (selectedReport === 5) {
      let value = roping.type
      let type
      switch (value) {
        case 'Draw Pot':
          type = 'Draw_Pot'
          break
        case 'Round Robin':
          type = 'Round_Robin'
          break
        case 'Pick Only':
          type = 'Pick_Only'
          break
        case 'Pick or Draw':
          type = 'Pick_Or_Draw'
          break
        case 'Pick & Draw':
          type = 'Pick_And_Draw'
          break
        default:
          type = 'Draw_Pot'
      }
      try {
        const response = await API.getAPICalling(`Teams/?ropingId=${selectedRopingId}&roping_team_type=${type}`)
        // console.log("For round numeber ", round ," the teams are :",response);
        setTeams(response)
        handleTeamOpen()
      } catch (error) {
        console.log('Some error:  ', error)
        setTeams([])
        setMessage(error.message)
        handleMessageOpen()
      }
    } else if (selectedReport === 6) {
      let value = roping.type
      let type
      switch (value) {
        case 'Draw Pot':
          type = 'Draw_Pot'
          break
        case 'Round Robin':
          type = 'Round_Robin'
          break
        case 'Pick Only':
          type = 'Pick_Only'
          break
        case 'Pick or Draw':
          type = 'Pick_Or_Draw'
          break
        case 'Pick & Draw':
          type = 'Pick_And_Draw'
          break
        default:
          type = 'Draw_Pot'
      }
      try {
        const response = await API.getAPICalling(`Teams/?ropingId=${selectedRopingId}&roping_team_type=${type}`)
        // console.log("For round numeber ", round ," the teams are :",response);
        setTimerteams(response)
        handleTimerSheetOpen()
      } catch (error) {
        console.log('Some error:  ', error)
        setTimerteams([])
        setMessage(error.message)
        handleMessageOpen()
      }
    } else {
      setMessage('Please select a type first')
      handleMessageOpen()
    }
  }

  useEffect(async () => {
    if (payoffId != null) {
      try {
        const response = await API.getAPICalling(
          `Reports/view_payoff/${selectedRopingId}/${payoffId}?Check=${isChecked ? 1 : 0}`
        )
        setPayoffEntry(response)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }, [payoffId, isChecked, selectedRopingId])

  return (
    <>
      <Grid item xs={6} sm={2}>
        <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}>
          Report Type
        </Typography>
      </Grid>
      <Grid item xs={6} sm={7}>
        <FormControl fullWidth>
          <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
          <Select
            label='Country'
            defaultValue=''
            value={`${selectedReport}`}
            onChange={handleChange}
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
          >
            <MenuItem value='1'>Contestant by Name</MenuItem>
            <MenuItem value='2'>Draw Entries</MenuItem>
            <MenuItem value='3'>Results</MenuItem>
            <MenuItem value='4'>Results with Payoff</MenuItem>
            <MenuItem value='5'>Teams by number</MenuItem>
            <MenuItem value='6'>Timer Sheet</MenuItem>
            {/* <MenuItem value='7'>Time Sheet with Handicap</MenuItem> */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button type='button' onClick={handleSubmit} variant='contained' size='large'>
          Get Report
        </Button>
      </Grid>

      {/* Modal for Message Display */}
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

      {/* Modal Contestant By Name  */}
      <Modal
        open={contestantOpen}
        onClose={handleContestantClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style2}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: 'black',
                width: '100%',
                borderTopLeftRadius: '7px',
                borderTopRightRadius: '7px',
                padding: '10px'
              }}
            >
              <Typography
                id='modal-modal-description'
                fontWeight='bold'
                sx={{ mt: 2, mb: 3, fontSize: '20px', textAlign: 'center', color: 'white' }}
              >
                {roping.name}
              </Typography>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableBody>
                {contestants.map((contestant, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0
                      }
                    }}
                  >
                    <TableCell align='left'>{index + 1}</TableCell>
                    <TableCell align='center' ><Typography fontWeight="600">{contestant.contestantName}</Typography></TableCell>
                    <TableCell align='justify' >
                      {contestant.teams.map((team, index) => (
                         <Typography key={index}  >
                          • {team.role === 'header' ? 'heading' : 'healing'} for{' '}
                          <Typography fontWeight="500" sx={{display:"inline"}}>{team.role === 'header' ? team.healer : team.header}</Typography>
                       </Typography>
                        
                      ))}
                     
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
      </Modal>

      {/* Modal for Draw Entries  */}
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
                {drawEntries.map((draw, index) => (
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

      {/* Modal for Results  */}
      <Modal
        open={averageTableOpen}
        onClose={handleAverageClose}
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
                  <StyledTableCell align='center'>Total Time </StyledTableCell>
                  <StyledTableCell align='center'>Number Caught </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {averageData.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row' align='center'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{data.team.header.name}</StyledTableCell>
                    <StyledTableCell align='center'>{data.team.healer.name}</StyledTableCell>
                    <StyledTableCell align='center'>{data.total_time}</StyledTableCell>
                    <StyledTableCell align='center'>
                      {/* {data.current_time === 0 ? data.round_number - 1 : data.round_number} */}
                      {data.round_number}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* Modal for Results with payoff  */}
      <Modal
        open={resultsPayoffOpen}
        onClose={handleResultsPayoffClose}
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
                  <StyledTableCell align='center'>Total Time </StyledTableCell>
                  <StyledTableCell align='center'>Number Caught </StyledTableCell>
                  <StyledTableCell align='center'>Payoff ({individual ? 'Per Roper' : 'Per Team'}) </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payoffData.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row' align='center'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{data.team.header.name}</StyledTableCell>
                    <StyledTableCell align='center'>{data.team.healer.name}</StyledTableCell>
                    <StyledTableCell align='center'>{data.total_time}</StyledTableCell>
                    <StyledTableCell align='center'>
                      {/* {data.current_time === 0 ? data.round_number - 1 : data.round_number} */}
                      {data.round_number}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {individual
                        ? isChecked
                          ? Math.ceil(payoffEntry.distributedValues[index] / 2)
                          : payoffEntry.distributedValues[index] / 2
                        : payoffEntry.distributedValues[index]}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* Modal for Teams by Number  */}
      <Modal
        open={teamOpen}
        onClose={handleTeamClose}
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

      {/* Modal for Timer Sheet  */}
      <Modal
        open={timersheetOpen}
        onClose={handleTimerSheetClose}
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
                  {Array.from({ length: roping.num_rounds }).map((_, index) => (
                    <StyledTableCell key={index} align='center'>
                      Time on {index + 1}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align='center'>Total Time </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timerTeams &&
                  timerTeams.map((team, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component='th' scope='row' align='center'>
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align='center'>{team.header.name}</StyledTableCell>
                      <StyledTableCell align='center'>{team.healer.name}</StyledTableCell>
                      {Array.from({ length: roping.num_rounds }).map((_, index) => (
                        <StyledTableCell key={index} align='center'>
                          0
                        </StyledTableCell>
                      ))}
                      <StyledTableCell align='center'>0 </StyledTableCell>
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

export default GetRopingReports
