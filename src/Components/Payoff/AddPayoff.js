import * as React from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
// import InputAdornment from '@mui/material/InputAdornment'
import { Box, Modal, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import API from 'src/pages/api'

const AddPayoff = ({ handleCheck, setFlag }) => {
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

  const [inputValues, setInputValues] = React.useState({
    payoff_name: '',
    places_to_pay: null,
    pot_percentage: null
  })

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    if (inputValues.payoff_name === '') {
      setMessage('Please enter the payoff name first')
      handleMessageOpen()
    } else {
      setOpen(true)
    }
  }
  const handleClose = () => setOpen(false)
  const [message, setMessage] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'payoff_name') {
      setInputValues({ payoff_name: value })
    } else {
      setInputValues({ ...inputValues, [name]: Number(value) })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (
      inputValues.payoff_name === 'null' ||
      inputValues.places_to_pay === null ||
      inputValues.pot_percentage === null
    ) {
      setMessage('Fields cannot be null')
      handleMessageOpen()
    } else {
      const data = {
        payoff_name: inputValues.payoff_name,
        places_to_pay: inputValues.places_to_pay,
        pot_percentage: inputValues.pot_percentage
      }
      setInputValues({
        payoff_name: '',
        places_to_pay: null,
        pot_percentage: null
      })
      const id = localStorage.getItem('productinoId')
      try {
        const response = await API.postAPICalling(`/payoffs/add/${id}`, data)
        setMessage(response.message)
        handleMessageOpen()
        handleClose()
        setFlag(prev=>!prev);
      } catch (error) {
        setMessage(error.message)
        handleMessageOpen()
        handleClose()
      }
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Add New Payoff' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='payoff_name'
                  label='Payoff Name'
                  placeholder='Average Payoff 1 Team'
                  value={inputValues.payoff_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleOpen} variant='contained' size='large'>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Card>
              {/* <CardHeader title='Roping Information' titleTypographyProps={{ variant: 'h6' }} /> */}
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Number of places to pay
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        name='places_to_pay'
                        placeholder='00'
                        value={inputValues.places_to_pay}
                        onChange={handleChange}
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
                        name='pot_percentage'
                        placeholder='00'
                        value={inputValues.pot_percentage}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Button type='submit' variant='contained' size='large'>
                        CONFIRM
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button type='button' onClick={handleClose} variant='contained' size='large'>
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Modal>
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
      </div>
    </>
  )
}

export default AddPayoff
