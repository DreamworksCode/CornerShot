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
  useMediaQuery
} from '@mui/material'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles'

const GetProductionReports = ({ selectedPayoff, isChecked }) => {
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

  const [production, setProduction] = useState('')

  useEffect(() => {
    const item = localStorage.getItem('production')
    setProduction(item)
  }, [])

  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  const [selectedType, setSelectedType] = useState(1)

  const [contestantFeesOpen, setContestantFeesOpen] = useState(false)
  const handleContestantFeesOpen = () => setContestantFeesOpen(true)
  const handleContestantFeesClose = () => setContestantFeesOpen(false)
  const [contestantFees, setContestantFees] = useState([])

  const [contestantWinningsOpen, setContestantWinningsOpen] = useState(false)
  const handleContestantWinningsOpen = () => setContestantWinningsOpen(true)
  const handleContestantWinningsClose = () => setContestantWinningsOpen(false)
  const [contestantWinnings, setContestantWinnings] = useState([])

  const handleChange = e => {
    const { value } = e.target
    setSelectedType(Number(value))
  }

  const handleSubmit = async () => {
    if (selectedType === 1) {
      const productionId = localStorage.getItem('productinoId')
      try {
        const response = await API.getAPICalling(`Reports/contestant-fees?productionId=${productionId}`)
        setContestantFees(response)
        console.log(response)
        handleContestantFeesOpen()
      } catch (error) {
        console.log(error.message)
        setMessage(error.message)
        handleMessageOpen()
      }
    } else {
      const productionId = localStorage.getItem('productinoId')
      try {
        const response = await API.getAPICalling(
          `Reports/winning-teams?productionId=${productionId}&payoffId=${selectedPayoff.payoff.id}&check=${
            isChecked ? 1 : 0
          }`
        )
        setContestantWinnings(response)
        handleContestantWinningsOpen()
      } catch (error) {
        console.log(error.message)
        setMessage(error.message)
        handleMessageOpen()
      }
    }
  }

  const downloadContestantWinningsPDF = async() => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('contestantWinningsTable')
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: 'contestantWinnings.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .save()
    }
  }

  const downloadContestantFeesPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('contestantFeesTable')
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: 'contestantFees.pdf',
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
            value={`${selectedType}`}
            onChange={handleChange}
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
          >
            <MenuItem value='1'>Contestant Fees</MenuItem>
            <MenuItem value='2'>Contestant Winnings</MenuItem>
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

      {/* Modal for Contestant Fees */}
      <Modal
        open={contestantFeesOpen}
        onClose={handleContestantFeesClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div id="contestantFeesTable">
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
                  {production}
                </Typography>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {' '}
                      <Typography fontSize='14px' fontWeight='600'>
                        S.No
                      </Typography>{' '}
                    </TableCell>
                    <TableCell align='center'>
                      <Typography fontSize='14px' fontWeight='600'>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      {' '}
                      <Typography fontSize='14px' fontWeight='600'>
                        Roping(s) Name
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      {' '}
                      <Typography fontSize='14px' fontWeight='600'>
                        Entry Fee
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      {' '}
                      <Typography fontSize='14px' fontWeight='600'>
                        Total Fees
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contestantFees.map((contestant, index) => (
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
                      <TableCell align='center'>
                        {contestant.participations.map((ropings, index) => (
                          <Typography key={index}>{ropings.ropingName}</Typography>
                        ))}
                      </TableCell>
                      <TableCell align='center'>
                        {contestant.participations.map((ropings, index) => (
                          <Typography key={index}>{ropings.entryFees}</Typography>
                        ))}
                      </TableCell>
                      <TableCell align='center'>
                        <Typography fontWeight='600'>{contestant.totalFees}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadContestantFeesPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
        </Box>
      </Modal>

      {/* Modal for Contestant Winnings */}
      <Modal
        open={contestantWinningsOpen}
        onClose={handleContestantWinningsClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div id='contestantWinningsTable'>
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
                  {production}
                </Typography>
              </Grid>
            </Grid>
            {contestantWinnings.map((contestant, index) => (
              <>
                <Typography
                  id='modal-modal-description'
                  fontWeight='800'
                  sx={{ mt: 2, mb: 3, fontSize: '18px', textAlign: 'center', color: 'black' }}
                >
                  {contestant.ropingName}
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 600 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {' '}
                          <Typography fontSize='14px' fontWeight='600'>
                            Team No.
                          </Typography>{' '}
                        </TableCell>
                        <TableCell align='center'>
                          <Typography fontSize='14px' fontWeight='600'>
                            Header
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          {' '}
                          <Typography fontSize='14px' fontWeight='600'>
                            Heeler
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          {' '}
                          <Typography fontSize='14px' fontWeight='600'>
                            Winnings
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contestant.winningTeams.map((winningTeams, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            }
                          }}
                        >
                          <TableCell align='left'>Team {index + 1}</TableCell>
                          <TableCell align='center'>
                            <Typography>{winningTeams.team.header}</Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography>{winningTeams.team.healer}</Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography>{winningTeams.winningAmount}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ))}
          </div>
          <Button onClick={downloadContestantWinningsPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default GetProductionReports