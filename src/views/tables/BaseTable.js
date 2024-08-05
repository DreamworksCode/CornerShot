// ** MUI Imports
import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Modal, Typography, useMediaQuery } from '@mui/material'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { FormControl, FormHelperText, InputLabel, MenuItem } from '@mui/material'
import Select from '@mui/material/Select'
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

const createData = (name, heeler, header) => {
  return { name, heeler, header }
}

const rows = [
  createData('Steve Smith', 3, 7),
  createData('David Warner', 4, 4),
  createData('Pat Cummins', 3, 4),
  createData('Jake Fraser McGurk', 2, 6),
  createData('Aaron Finch', 6, 13),
  createData('Travis Head', 5, 5)
]



const BaseTable = ({ contestant, setContestant }) => {
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
  const [contestantData, setContestantData] = React.useState({
    name: '',
    email: '',
    phone_number: null,
    header_rating: null,
    healer_rating: null
  })
  const [selectedId, setSelectedId] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [DeleteOpen, setDeleteOpen] = React.useState(false)
  const handleDeleteOpen = () => setDeleteOpen(true)
  const handleDeleteClose = () => setDeleteOpen(false)
  const [MessageOpen, setMessageOpen] = React.useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
    handleClose()
    handleDeleteClose()
  }
  const [message, setMessage] = React.useState('')
  const [deleteMessage, setDeleteMessage] = React.useState('');

  React.useEffect(async () => { 
    const token = localStorage.getItem('token')
    try {
      const response = await API.getAPICalling('contestant', token)
      setContestant(response.data)
      // console.log(response.data)
    } catch (error) {
      console.log('Some error occured', error)
    }
  }, [contestant])

  const handleEdit = async id => {
    setSelectedId(id)
    const token = localStorage.getItem('token')
    try {
      const response = await API.getAPICalling(`contestant/${id}`, token)
      setContestantData({
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        header_rating: response.data.header_rating,
        healer_rating: response.data.healer_rating
      })
      handleOpen()
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = e => {
    setContestantData({ ...contestantData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (
      contestantData.name.trim('') === '' ||
      contestantData.header_rating === 0 ||
      contestantData.healer_rating === 0
    ) {
      console.log('Required Fields cannot be empty')
    } else {
      const token = localStorage.getItem('token')
      try {
        const response = await API.putAPICalling(`contestant/${selectedId}`, contestantData, token)
        // alert('Successfullly Updated')
        setMessage(response.message);
        handleMessageOpen();
      } catch (error) {
        // console.log('Some error happend')
        setMessage(error.message);
        handleMessageOpen();
      }
    }
  }


  const handleDeleteButtonClick = async (id) => {
    setSelectedId(id);
    const token = localStorage.getItem('token');
    try {
      const response = await API.getAPICalling(`contestant/${id}`, token);
      setContestantData({
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        header_rating: response.data.header_rating,
        healer_rating: response.data.healer_rating
      });
    } catch (error) {
      console.log(error);
    }

    handleDeleteOpen();
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await API.deleteAPICalling(`contestant/${selectedId}`, token);
      setMessage(response.message);
      handleMessageOpen();
    } catch (error) {
      setMessage(error.message);
      handleMessageOpen();
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value > 10) {
      event.target.value = 10;
    }
    else if (value < 0) {
      event.target.value = 0;
    }
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align='center'>Healer Rating</StyledTableCell>
              <StyledTableCell align='center'>Header Rating</StyledTableCell>
              <StyledTableCell align='center'>Update</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contestant.map((person, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component='th' scope='row'>
                  {person.name}
                </StyledTableCell>
                <StyledTableCell align='center'>{person.healer_rating}</StyledTableCell>
                <StyledTableCell align='center'>{person.header_rating}</StyledTableCell>
                <StyledTableCell
                  sx={{}}
                  onClick={() => handleEdit(person.id)}
                  align='center'
                >
                  <EditIcon sx={{ cursor: 'pointer' }} />
                </StyledTableCell>
                <StyledTableCell onClick={() => handleDeleteButtonClick(person.id)} align='center' sx={{ color: 'red' }}>
                  <DeleteIcon sx={{ color: "red", cursor: 'pointer' }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Card>
              <CardHeader title='Update Contestant Information' titleTypographyProps={{ variant: 'h6' }} />
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={3} sm={2}>
                      <Typography
                        variant='body2'
                        sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px' }}
                      >
                        Name
                      </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9}>
                      <TextField
                        required
                        fullWidth
                        type='text'
                        label='Name'
                        name='name'
                        value={contestantData.name}
                        onChange={handleChange}
                        placeholder='John Snow'
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center', paddingTop: '15px' }}>
                        Email:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={9}>
                      <TextField
                        fullWidth
                        required
                        type='email'
                        name='email'
                        value={contestantData.email}
                        onChange={handleChange}
                        // label='City'
                        placeholder='abc@example.com'
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center', paddingTop: '15px' }}>
                        Phone No.
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={9}>
                      <TextField
                        fullWidth
                        type='number'
                        name='phone_number'
                        value={contestantData.phone_number === null ? '' : contestantData.phone_number}
                        onChange={handleChange}
                        // label='City'
                        placeholder='123-456-7890'
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center', paddingTop: '15px' }}>
                        Header rating:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        required
                        fullWidth
                        type='number'
                        name='header_rating'
                        value={contestantData.header_rating === null ? '' : contestantData.header_rating}
                        onChange={handleChange}
                        // label='City'
                        placeholder='00'
                        inputProps={{ max: 10, onInput: handleInputChange }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center', paddingTop: '15px' }}>
                        Healer rating:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        fullWidth
                        required
                        type='number'
                        name='healer_rating'
                        value={contestantData.healer_rating === null ? '' : contestantData.healer_rating}
                        onChange={handleChange}
                        // label='City'
                        placeholder='00'
                        inputProps={{ max: 10, onInput: handleInputChange }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type='submit' variant='contained' size='medium'>
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Modal>

        <Modal
          open={DeleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Are you sure?
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2, mb: 3 }}>
              Do you really want to delete "{contestantData.name}"
            </Typography>
            <Button onClick={handleDelete} sx={{ backgroundColor: "red" }} type='button' variant='contained' size='medium'>
              Delete
            </Button>
          </Box>
        </Modal>

        {/* //New Modal  */}
        <Modal
          open={MessageOpen}
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
      </div>
    </>
  )
}

export default BaseTable
