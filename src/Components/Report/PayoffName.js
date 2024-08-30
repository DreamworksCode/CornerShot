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
import { useEffect, useState } from 'react'
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles'
import dynamic from 'next/dynamic';

const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false });


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

const PayoffName = ({ setPayoffId, payoffId, isChecked, roping, individual, setSelectedPayoff }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 700,
    bgcolor: 'background.paper',
    border: '6px double black',
    boxShadow: 24,
    p: 2,
    overflowY: 'auto',
    maxHeight: 600
  }

  const [payoffs, setPayoffs] = useState([])
  const [payoffData, setPayoffData] = useState(null)

  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  const [payoffOpen, setPayoffOpen] = useState(false)
  const handlePayoffOpen = () => {
    setPayoffOpen(true)
  }
  const handlePayoffClose = () => {
    setPayoffOpen(false)
  }

  useEffect(async () => {
    const id = localStorage.getItem('productinoId')
    try {
      const response = await API.getAPICalling(`payoffs/get?production_id=${id}`)
      setPayoffs(response)
      setPayoffId(response[0].payoff.id)
      setSelectedPayoff(response[0])
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleChange = e => {
    const { value } = e.target
    setPayoffId(Number(value))
    const filteredObject = payoffs.find(item => item.payoff.id === Number(value))
    setSelectedPayoff(filteredObject)
  }

  const handleSubmit = async () => {
    if (payoffId === null) {
      setMessage('Please select a payoff first')
      handleMessageOpen()
    } else {
      const id = localStorage.getItem('productinoId')
      try {
        const response = await API.getAPICalling(`Reports/view_payoff/${id}/${payoffId}?Check=${isChecked ? 1 : 0}`)
        setPayoffData(response)
        handlePayoffOpen()
        console.log(response)
      } catch (error) {
        console.log(error)
        setMessage(error.message)
        handleMessageOpen()
      }
    }
  }

  // const downloadPayoffPDF = () => {
  //   if(typeof window !== "undefined"){
  //   const element = document.getElementById('payoffTable');
  //   html2pdf()
  //     .from(element)
  //     .set({
  //       margin: 1,
  //       filename: 'payoffTable.pdf',
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  //     })
  //     .save()
  //   }
  // }

  const downloadPayoffPDF = async () => {
    if (typeof window !== "undefined") {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("payoffTable");
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: "payoffTable.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };

  return (
    <>
      <Grid item xs={6} sm={2}>
        <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}>
          Payoff name
        </Typography>
      </Grid>
      <Grid item xs={6} sm={7}>
        <FormControl fullWidth>
          <InputLabel id='form-layouts-separator-select-label'>Payoff</InputLabel>
          <Select
            label='Country'
            defaultValue=''
            // value={payoffId}
            onChange={handleChange}
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
          >
            {payoffs.map(payoff => (
              <MenuItem key={payoff.payoff.id} value={payoff.payoff.id}>
                {payoff.payoff.payoff_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button type='button' onClick={handleSubmit} variant='contained' size='large'>
          View Payoff
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

      {/* Modal for Draw Entries  */}
      <Modal
        open={payoffOpen}
        onClose={handlePayoffClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div id='payoffTable'>
            <Typography
              id='modal-modal-description'
              fontWeight='bold'
              sx={{ mt: 2, mb: 3, fontSize: '20px', textAlign: 'center' }}
            >
              {roping.name}
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2, mb: 3, fontSize: '16px', textAlign: 'center' }}>
              Total Payoff:- {payoffData && payoffData.finalTotalPayoff}
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2, mb: 3, fontSize: '16px', textAlign: 'center' }}>
              Stock Charge:- {payoffData && payoffData.stockChargeValue}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Team Position</StyledTableCell>
                    <StyledTableCell align='center'>Amount ({individual ? 'Per Roper' : 'Per Team'})</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payoffData &&
                    payoffData.distributedValues.map((data, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component='th' scope='row' align='center'>
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {individual ? (isChecked ? Math.ceil(data / 2) : data / 2) : data}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button onClick={downloadPayoffPDF} type='button' variant='contained' size='medium'>
            Download
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default PayoffName