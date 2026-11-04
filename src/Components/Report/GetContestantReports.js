import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
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
import API from 'src/pages/api'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import EmailOutline from 'mdi-material-ui/EmailOutline'

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

const GetContestantReports = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
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

  const [contestant, setContestant] = useState([])

  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  const [emailOpen, setEmailOpen] = useState(false)
  const handleEmailOpen = () => setEmailOpen(true)
  const handleEmailClose = () => setEmailOpen(false)

  const fetchEmailList = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await API.getAPICalling('contestant', token)
      setContestant(response.data)
      handleEmailOpen()
    } catch (error) {
      console.log('Some error occured', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const downloadContestantEmailPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('contestantEmailTable')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'contestantEmail.pdf',
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
          <CardHeader title='Contestant Reports' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} md={3}>
                <Button fullWidth type='button' onClick={fetchEmailList} variant='outlined' size='medium' startIcon={<EmailOutline />}>
                  Email List
                </Button>
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

      {/* Modal for Draw Entries  */}
      <Modal
        open={emailOpen}
        onClose={handleEmailClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div id='contestantEmailTable'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Name</StyledTableCell>
                    <StyledTableCell align='center'>Email</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contestant.map((person, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component='th' scope='row' align='center'>
                        {person.name}
                      </StyledTableCell>
                      <StyledTableCell align='center'>{person.email}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadContestantEmailPDF} type='button' variant='contained' size='medium'>
            Downlaod
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default GetContestantReports
