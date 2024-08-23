// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {
  Box,
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

// ** Icons Imports
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import API from 'src/pages/api'

// const percentageArray = [40, 30, 20, 10]

const UpdatePayoff = ({ check, flag }) => {
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

  const [payoffs, setPayoffs] = useState([])
  const [selectedPayoff, setSelectedPayoff] = useState({
    id: null,
    places_to_pay: null,
    pot_percentage: null
  })
  const [percentageArray, setPercentageArray] = useState([])

  const [listOpen, setListOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  useEffect(async () => {
    const id = localStorage.getItem('productinoId')
    try {
      const response = await API.getAPICalling(`payoffs/get?production_id=${id}`)
      setPayoffs(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }, [flag])

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'name') {
      const object = payoffs.find(item => item.payoff.id === value)
      console.log(object)
      setSelectedPayoff(object.payoff)
      setPercentageArray(object.distribution)
    } else {
        setSelectedPayoff({ ...selectedPayoff, [name]: Number(value) })
    }
  }

  const handleDeleteButtonClicked = async () => {
    if (selectedPayoff.id === null) {
      setMessage('Please select a payoff ')
      handleMessageOpen()
    } else {
      const id = localStorage.getItem('productinoId')
      try {
        const response = await API.deleteAPICalling(`payoffs/delete?payoff_id=${selectedPayoff.id}&production_id=${id}`)
        console.log(response)
        setMessage(response.message)
        handleMessageOpen()
      } catch (error) {
        console.log(error)
        setMessage(error.message)
        handleMessageOpen()
      }
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (selectedPayoff.places_to_pay <= 0 || selectedPayoff.pot_percentage <= 0) {
      setMessage('Values cannot be empty')
      handleMessageOpen()
    } else {
      const id = localStorage.getItem('productinoId');
      const data={
        places_to_pay: selectedPayoff.places_to_pay,
        pot_percentage: selectedPayoff.pot_percentage
      }
      try {
        const response = await API.putAPICalling(`payoffs/update/${selectedPayoff.id}/${id}`,data)
        console.log(response)
        setMessage(response.message);
        handleMessageOpen();
      } catch (error) {
        console.log(error)
        setMessage(error.message)
        handleMessageOpen()
      }
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                  Payoff Name
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Payoff</InputLabel>
                  <Select
                    label='Payoff'
                    name='name'
                    onChange={handleChange}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    {payoffs.map(payoff => (
                      <MenuItem key={payoff.payoff.id} value={payoff.payoff.id}>
                        {payoff.payoff.payoff_name}
                      </MenuItem>
                    ))}
                    {/* <MenuItem value='UK'>PAYOFF 1</MenuItem>
                    <MenuItem value='USA'>PAYOFF 2</MenuItem>
                    <MenuItem value='Australia'>PAYOFF 3</MenuItem>
                    <MenuItem value='Germany'>PAYOFF 4</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                  Number of places to pay
                </Typography>
                <TextField
                  fullWidth
                  type='number'
                  value={selectedPayoff.places_to_pay}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0 }} 
                  name='places_to_pay'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                  Pot Percentage
                </Typography>
                <TextField
                  fullWidth
                  type='number'
                  required
                  value={selectedPayoff.pot_percentage}
                  onChange={handleChange}
                  name='pot_percentage'
                  placeholder='00'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={listOpen ? 12 : 6}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Button onClick={() => setListOpen(prev => !prev)} variant='contained' size='large'>
                  {listOpen ? 'Hide Percentage Distribution' : 'Show Percentage Distribution'}
                </Button>
              </Grid>
              {listOpen && (
                <TableContainer component={Paper}>
                  <Table sx={{ miaxWidth: 550 }} size='small' aria-label='a dense table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>Teams</TableCell>
                        <TableCell align='center'>Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {percentageArray.map((percentage, index) => (
                        <TableRow key={index} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                          <TableCell align='center' component='th' scope='row'>
                            {index + 1}
                          </TableCell>
                          <TableCell align='center'>{percentage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Grid item xs={12} sm={listOpen ? 6 : 3} sx={{ textAlign: 'center' }}>
                <Button disabled={selectedPayoff.id===null?true:false} type='submit' variant='contained' size='large'>
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={listOpen ? 6 : 3} sx={{ textAlign: 'center' }}>
                <Button disabled={selectedPayoff.id===null?true:false} onClick={handleDeleteButtonClicked} type='button' variant='contained' size='large'>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
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

export default UpdatePayoff
