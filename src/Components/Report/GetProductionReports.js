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

const GetProductionReports = () => {
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
            {/* <MenuItem value='2'>Contestant Winnings</MenuItem> */}
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
                  <TableCell>  <Typography fontSize="14px" fontWeight='600'>S.No</Typography> </TableCell>
                  <TableCell align='center'>
                    <Typography fontSize="14px" fontWeight='600'>Name</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    {' '}
                    <Typography fontSize="14px" fontWeight='600'>Roping(s) Name</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    {' '}
                    <Typography fontSize="14px" fontWeight='600'>Entry Fee</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    {' '}
                    <Typography fontSize="14px" fontWeight='600'>Total Fees</Typography>
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
        </Box>
      </Modal>
    </>
  )
}

export default GetProductionReports

//Entry fees = 738
//stock charge value = 88.56
//Association fees = 738
// Prize deduction = 12
// Added Money = 123
