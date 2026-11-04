import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
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
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import API from 'src/pages/api'
import formatCurrency from 'src/utils/formatCurrency'
import formatTime from 'src/utils/formatTime'
import FinancialSummary from './FinancialSummary'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import ClipboardTextOutline from 'mdi-material-ui/ClipboardTextOutline'
import TimerOutline from 'mdi-material-ui/TimerOutline'
import FormatListNumbered from 'mdi-material-ui/FormatListNumbered'
import TrophyOutline from 'mdi-material-ui/TrophyOutline'
import FormatListNumberedRtl from 'mdi-material-ui/FormatListNumberedRtl'
import ChartBoxOutline from 'mdi-material-ui/ChartBoxOutline'
import ScaleBalance from 'mdi-material-ui/ScaleBalance'

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

  const [ratingAdjustmentOpen, setRatingAdjustmentOpen] = useState(false)
  const handleRatingAdjustmentOpen = () => setRatingAdjustmentOpen(true)
  const handleRatingAdjustmentClose = () => setRatingAdjustmentOpen(false)
  const [ratingAdjustmentData, setRatingAdjustmentData] = useState([])

  const [standingsOpen, setStandingsOpen] = useState(false)
  const handleStandingsOpen = () => setStandingsOpen(true)
  const handleStandingsClose = () => setStandingsOpen(false)
  const [standingsData, setStandingsData] = useState(null)

  const [shortRoundOpen, setShortRoundOpen] = useState(false)
  const handleShortRoundOpen = () => setShortRoundOpen(true)
  const handleShortRoundClose = () => setShortRoundOpen(false)
  const [shortRoundData, setShortRoundData] = useState(null)

  const fetchContestantByName = async () => {
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
  }

  const fetchDrawEntries = async () => {
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
  }

  const fetchResults = async () => {
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
  }

  const fetchResultsWithPayoff = async () => {
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
  }

  const fetchTeamsByNumber = async () => {
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
  }

  const fetchTimerSheet = async () => {
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
  }

  const fetchTimeSheetWithHandicap = async () => {
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
  }

  const fetchRatingAdjustment = async () => {
    try {
      const response = await API.getAPICalling(`Reports/rating-adjustment/${selectedRopingId}`)
      setRatingAdjustmentData(response)
      handleRatingAdjustmentOpen()
    } catch (error) {
      console.log('Some error:  ', error)
      setRatingAdjustmentData([])
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const fetchStandings = async () => {
    try {
      const response = await API.getAPICalling(`Reports/standings/${selectedRopingId}`)
      setStandingsData(response)
      handleStandingsOpen()
    } catch (error) {
      console.log('Some error:  ', error)
      setStandingsData(null)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const fetchShortRound = async () => {
    try {
      const response = await API.getAPICalling(`Reports/short-round/${selectedRopingId}`)
      setShortRoundData(response)
      handleShortRoundOpen()
    } catch (error) {
      console.log('Some error:  ', error)
      setShortRoundData(null)
      setMessage(
        error.message && error.message.toLowerCase().includes('1-round')
          ? 'Short Round is not available for a 1-round roping.'
          : error.message
      )
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

  const downloadRatingAdjustmentPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('ratingAdjustmentTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'RatingAdjustment.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  const downloadStandingsPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('standingsTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'Standings.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  const downloadShortRoundPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('shortRoundTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'ShortRound.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Roping Reports' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Typography variant='overline' color='text.secondary' sx={{ fontWeight: 700 }}>
              Entries &amp; Teams
            </Typography>
            <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchDrawEntries} variant='outlined' size='medium' startIcon={<FileDocumentOutline />}>
                  Draw Sheet
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchTeamsByNumber} variant='outlined' size='medium' startIcon={<AccountGroupOutline />}>
                  Teams by Number
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchContestantByName} variant='outlined' size='medium' startIcon={<ClipboardTextOutline />}>
                  Contestant by Name
                </Button>
              </Grid>
            </Grid>

            <Divider />

            <Typography variant='overline' color='text.secondary' sx={{ fontWeight: 700, mt: 3, display: 'block' }}>
              Time &amp; Results
            </Typography>
            <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchTimerSheet} variant='outlined' size='medium' startIcon={<TimerOutline />}>
                  Time Sheet
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchTimeSheetWithHandicap} variant='outlined' size='medium' startIcon={<TimerOutline />}>
                  Time Sheet (Handicap)
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchResults} variant='outlined' size='medium' startIcon={<FormatListNumbered />}>
                  Results
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchStandings} variant='outlined' size='medium' startIcon={<TrophyOutline />}>
                  Standings
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchShortRound} variant='outlined' size='medium' startIcon={<FormatListNumberedRtl />}>
                  Short Round
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchRatingAdjustment} variant='outlined' size='medium' startIcon={<ChartBoxOutline />}>
                  Rating Adjustment Preview
                </Button>
              </Grid>
            </Grid>

            <Divider />

            <Typography variant='overline' color='text.secondary' sx={{ fontWeight: 700, mt: 3, display: 'block' }}>
              Payoff &amp; Financials
            </Typography>
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchResultsWithPayoff} variant='outlined' size='medium' startIcon={<ScaleBalance />}>
                  Payoff
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <FinancialSummary selectedRopingId={selectedRopingId} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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
                      <StyledTableCell align='center'>{draw.header_rating === null || draw.header_rating === undefined ? 'Not set' : draw.header_rating}</StyledTableCell>
                      <StyledTableCell align='center'>{draw.healer_rating === null || draw.healer_rating === undefined ? 'Not set' : draw.healer_rating}</StyledTableCell>
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
                      <StyledTableCell align='center'>{formatTime(data.total_time)}</StyledTableCell>
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
                      <StyledTableCell align='center'>{formatTime(data.total_time)}</StyledTableCell>
                      <StyledTableCell align='center'>
                        {/* {data.current_time === 0 ? data.round_number - 1 : data.round_number} */}
                        {data.round_number}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        {formatCurrency(
                          individual
                            ? isChecked
                              ? Math.ceil(payoffEntry.distributedValues[index] / 2)
                              : payoffEntry.distributedValues[index] / 2
                            : payoffEntry.distributedValues[index]
                        )}
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

      {/* Modal for Rating Adjustment Preview  */}
      <Modal
        open={ratingAdjustmentOpen}
        onClose={handleRatingAdjustmentClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div id='ratingAdjustmentTable'>
            <Typography
              sx={{ mt: 1, mb: 2, fontSize: '14px', textAlign: 'center', fontStyle: 'italic' }}
            >
              Preview only — these adjustments are not applied until each team's round time is saved.
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Header</StyledTableCell>
                    <StyledTableCell align='center'>Heeler</StyledTableCell>
                    <StyledTableCell align='center'>Team Rating</StyledTableCell>
                    <StyledTableCell align='center'>Adjustment (sec)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratingAdjustmentData.map((team, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align='center'>{team.headerName}</StyledTableCell>
                      <StyledTableCell align='center'>{team.healerName}</StyledTableCell>
                      <StyledTableCell align='center'>{team.teamRating}</StyledTableCell>
                      <StyledTableCell align='center'>{team.adjustmentSeconds}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadRatingAdjustmentPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
        </Box>
      </Modal>

      {/* Modal for Standings  */}
      <Modal
        open={standingsOpen}
        onClose={handleStandingsClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div id='standingsTable'>
            {standingsData && (
              <Typography
                fontWeight='bold'
                sx={{ mt: 1, mb: 2, fontSize: '18px', textAlign: 'center' }}
              >
                {standingsData.ropingName}
              </Typography>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Header</StyledTableCell>
                    <StyledTableCell align='center'>Heeler</StyledTableCell>
                    <StyledTableCell align='center'>Status</StyledTableCell>
                    <StyledTableCell align='center'>Round</StyledTableCell>
                    <StyledTableCell align='center'>Total Time</StyledTableCell>
                    <StyledTableCell align='center'>Barrier Penalty</StyledTableCell>
                    <StyledTableCell align='center'>Leg Penalty</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {standingsData &&
                    standingsData.standings.map((team, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align='center'>{team.header}</StyledTableCell>
                        <StyledTableCell align='center'>{team.healer}</StyledTableCell>
                        <StyledTableCell align='center' sx={{ color: team.status === 'Eliminated' ? 'red' : 'inherit' }}>
                          {team.status}
                        </StyledTableCell>
                        <StyledTableCell align='center'>{team.roundNumber ?? '-'}</StyledTableCell>
                        <StyledTableCell align='center'>{formatTime(team.totalTime)}</StyledTableCell>
                        <StyledTableCell align='center'>{team.barrierPenalty ? 'Yes' : team.barrierPenalty === null ? '-' : 'No'}</StyledTableCell>
                        <StyledTableCell align='center'>{team.legPenalty ? 'Yes' : team.legPenalty === null ? '-' : 'No'}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadStandingsPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
        </Box>
      </Modal>

      {/* Modal for Short Round  */}
      <Modal
        open={shortRoundOpen}
        onClose={handleShortRoundClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div id='shortRoundTable'>
            {shortRoundData && (
              <Typography sx={{ mt: 1, mb: 2, fontSize: '14px', textAlign: 'center' }}>
                Cutoff round: {shortRoundData.cutoffRound} • Teams in short round: {shortRoundData.teamsInShortRound}{' '}
                • Sort order: {shortRoundData.sortOrder === 'SLOW_TO_FAST' ? 'Slow to Fast' : 'Fast to Slow'} •
                Qualified: {shortRoundData.qualifiedCount}
              </Typography>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>S.No</StyledTableCell>
                    <StyledTableCell align='center'>Header</StyledTableCell>
                    <StyledTableCell align='center'>Heeler</StyledTableCell>
                    <StyledTableCell align='center'>Total Time</StyledTableCell>
                    <StyledTableCell align='center'>Tie</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shortRoundData &&
                    shortRoundData.teams.map((team, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component='th' scope='row' align='center'>
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align='center'>{team.header}</StyledTableCell>
                        <StyledTableCell align='center'>{team.healer}</StyledTableCell>
                        <StyledTableCell align='center'>{formatTime(team.totalTime)}</StyledTableCell>
                        <StyledTableCell align='center'>{team.tieIncluded ? 'Tie' : ''}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadShortRoundPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default GetRopingReports
