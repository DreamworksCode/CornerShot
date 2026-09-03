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
  const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 800,
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

  

  const [contestantOpen, setContestantOpen] = useState(false)
  const handleContestantOpen = () => setContestantOpen(true)
  const handleContestantClose = () => setContestantOpen(false)
  const [contestants, setContestants] = useState([])

  const [resultsPayoffOpen, setResultsPayoffOpen] = useState(false)
  const handleResultsPayoffOpen = () => setResultsPayoffOpen(true)
  const handleResultsPayoffClose = () => setResultsPayoffOpen(false)
  const [payoffData, setPayoffData] = useState([])
  const [payoffEntry, setPayoffEntry] = useState([])

  const [timersheetOpen, setTimerSheetOpen] = useState(false)
  const handleTimerSheetOpen = () => setTimerSheetOpen(true)
  const handleTimerSheetClose = () => setTimerSheetOpen(false)
  const [timerTeams, setTimerteams] = useState([])

  const [timersheetWithHandicapOpen, setTimerSheetWithHandicapOpen] = useState(false)
  const handleTimerSheetWithHandicapOpen = () => setTimerSheetWithHandicapOpen(true)
  const handleTimerSheetWithHandicapClose = () => setTimerSheetWithHandicapOpen(false)
  const [teamsWithHandicap, setTeamsWithHandicap] = useState([])

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
        if (selectedPayoff === null) {
          setMessage('No payoffs for this production')
          handleMessageOpen()
        } else {
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
      try {
        const response = await API.getAPICalling(`Reports/teams-handicap/${selectedRopingId}`)
        setTimerteams(response)
        handleTimerSheetOpen()
      } catch (error) {
        console.log('Some error:  ', error)
        setTimerteams([])
        setMessage(error.message)
        handleMessageOpen()
      }
    } else if (selectedReport === 7) {
      try {
        const response = await API.getAPICalling(`Reports/teams-handicap/${selectedRopingId}`)
        setTeamsWithHandicap(response)
        handleTimerSheetWithHandicapOpen()
      } catch (error) {
        console.log('Some error:  ', error)
        setTeamsWithHandicap([])
        setMessage(error.message)
        handleMessageOpen()
      }
    }else {
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

  const downloadContestantByNamePDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('contestantByNameTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'contestantByName.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  const downloadDrawEntriesPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('drawEntriesTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'DrawEntries.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  const downloadResultsPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('resultsTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'Results.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  const downloadResultsWithPayoffPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('resultsWithPayoffTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'ResultsWithPayoff.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  const downloadTeamsPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('teamsTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'Teams.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  const downloadTimerSheetPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('timerSheetTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'TimerSheet.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  const downloadTimerSheetWithHandicapPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('timerSheetWithHandicap')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'TimerSheetWithHandicap.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

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
            <MenuItem value='7'>Time Sheet with Handicap</MenuItem>
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
          <div id='contestantByNameTable'>
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
                      <TableCell align='center'>
                        <Typography fontWeight='600'>{contestant.contestantName}</Typography>
                      </TableCell>
                      <TableCell align='justify'>
                        {contestant.teams.map((team, index) => (
                          <Typography key={index}>
                            • {team.role === 'header' ? 'heading' : 'healing'} for{' '}
                            <Typography fontWeight='500' sx={{ display: 'inline' }}>
                              {team.role === 'header' ? team.healer : team.header}
                            </Typography>
                          </Typography>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadContestantByNamePDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
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
          <div id='drawEntriesTable'>
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
          </div>
          <Button onClick={downloadDrawEntriesPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
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
          <div id='resultsTable'>
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
          </div>
          <Button onClick={downloadResultsPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
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
          <div id='resultsWithPayoffTable'>
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
          </div>
          <Button onClick={downloadResultsWithPayoffPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
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
          <div id='teamsTable'>
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
          </div>
          <Button onClick={downloadTeamsPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
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
          <div id='timerSheetTable'>
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
                    timerTeams.map((team, index) => {
                      const totalRounds = team.rounds.reduce((acc, round) => acc + (round || 0), 0)

                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell component='th' scope='row' align='center'>
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align='center'>{team.headerName}</StyledTableCell>
                          <StyledTableCell align='center'>{team.healerName}</StyledTableCell>
                          {Array.from({ length: roping.num_rounds }).map((_, index) => (
                            <StyledTableCell key={index} align='center'>
                              {team.rounds[index] ? team.rounds[index] : 0}
                            </StyledTableCell>
                          ))}
                          <StyledTableCell align='center'>{totalRounds} </StyledTableCell>
                        </StyledTableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadTimerSheetPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
        </Box>
      </Modal>

       {/* Modal for Timer Sheet With Handicap  */}
       <Modal
        open={timersheetWithHandicapOpen}
        onClose={handleTimerSheetWithHandicapClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style3}>
          <div id='timerSheetWithHandicap'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Header</StyledTableCell>
                    <StyledTableCell align='center'>Heeler</StyledTableCell>
                    <StyledTableCell align='center'>Handicap(in sec)</StyledTableCell>
                    {Array.from({ length: roping.num_rounds }).map((_, index) => (
                      <StyledTableCell key={index} align='center'>
                        Time on {index + 1}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align='center'>Total Time </StyledTableCell>
                    <StyledTableCell align='center'>Time After Handicap </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamsWithHandicap &&
                    teamsWithHandicap.map((team, index) => {
                      const totalRounds = team.rounds.reduce((acc, round) => acc + (round || 0), 0)

                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell align='center'>{team.headerName}</StyledTableCell>
                          <StyledTableCell align='center'>{team.healerName}</StyledTableCell>
                          <StyledTableCell align='center'>{team.handicapInSeconds}</StyledTableCell>
                          {Array.from({ length: roping.num_rounds }).map((_, index) => (
                            <StyledTableCell key={index} align='center'>
                              {team.rounds[index] ? team.rounds[index] : 0}
                            </StyledTableCell>
                          ))}
                          <StyledTableCell align='center'>{totalRounds} </StyledTableCell>
                          <StyledTableCell align='center'>{totalRounds-team.handicapInSeconds} </StyledTableCell>
                        </StyledTableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadTimerSheetWithHandicapPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default GetRopingReports

//Header's header rating=3;
//Healer's healer rating=4
//Team rating=2
//Classification=10
//handicap_down_amount=2
//maximum_amount=20
//Difference = classification - team rating = 8
// obtained_amount = difference * handicap_down_amount= 8*2=16
// if(obtained_amount<maximum_amount){
//  handicap in seconds = obtained_amount
//}
//else{
//  handicap in seconds = maximum_amount
//}
