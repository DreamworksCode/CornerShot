import React, { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import API from 'src/pages/api'
import { Box, Modal, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
 


const Production_Form = ({ setProductions }) => {  
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
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [values, setValues] = useState({
    name: '',
    date: ''
  })

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.name.trim('') === '') {
      setMessage('Please Enter the Event Name')
      handleOpen();
    } else if (values.date.trim('') === '') {
      setMessage('Please Enter the Event Date')
      handleOpen();
    } else {
      const item = localStorage.getItem('token')
      e.preventDefault()
      console.log(values)
      const data = {
        name: values.name,
        date: values.date
      }
      setValues({ name: '', date: '' })
      try {
        const response = await API.postAPICalling('production', data, item)
        console.log(response)
        setProductions(prev => [...prev, data])
        setMessage("Production Added Successfully");
        handleOpen();
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message);
        handleOpen();
      }
    }
  }
  return (
    <>
      <Card>
        <CardHeader title='Add New Production' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Production Name'
                  value={values.name}
                  name='name'
                  onChange={handleChange}
                  placeholder='Production 1'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='date'
                  value={values.date}
                  name='date'
                  onChange={handleChange}
                  label='Event Date'
                  placeholder='00-00-0000'
                  // helperText='You can use letters, numbers & periods'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <EmailOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
              <TextField
                fullWidth
                type='number'
                label='Phone No.'
                placeholder='+1-123-456-8790'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Message'
                placeholder='Bio...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid> */}
              <Grid item xs={12}>
                <Button type='submit' variant='contained' size='large'>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-description' sx={{ mt: 2, mb: 3, fontSize: '20px' }}>
            {message}
          </Typography>
          <Button onClick={handleClose} type='button' variant='contained' size='medium'>
            OK
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default Production_Form
