import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Box, FormControl, InputLabel, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material'
import Select from '@mui/material/Select'
import API from 'src/pages/api'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

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
  
  const [selectedType, setSelectedType] = useState(null)
  const [contestant, setContestant] = useState([])

  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }


  const [emailOpen,setEmailOpen]=useState(false);
  const handleEmailOpen=()=>setEmailOpen(true);
  const handleEmailClose=()=>setEmailOpen(false);


  const handleChange = e => {
    const { value } = e.target
    setSelectedType(Number(value))
  }

  const handleSubmit = async () => {
    if (selectedType === 1) {
      const token = localStorage.getItem('token')
      try {
        const response = await API.getAPICalling('contestant', token)
        setContestant(response.data)
        handleEmailOpen();
        // console.log(response.data)
      } catch (error) {
        console.log('Some error occured', error)
      }
    } else if (selectedType === 2) {
      setMessage("Right now we dont have any operation for this event :)");
      handleMessageOpen();
    } else {
      setMessage('Please select an option first');
      handleMessageOpen();
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
            onChange={handleChange}
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
          >
            <MenuItem value='1'>Email List</MenuItem>
            {/* <MenuItem value='2'>Send Message</MenuItem> */}
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


      {/* Modal for Draw Entries  */}
      <Modal
        open={emailOpen}
        onClose={handleEmailClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
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
        </Box>
      </Modal>
    </>
  )
}

export default GetContestantReports
