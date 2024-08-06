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
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Typography, useMediaQuery } from '@mui/material'
import Select from '@mui/material/Select'
import { useState } from 'react'
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles';




const Contestant_information = ({setContestant}) => {
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
  const [credentials,setCredentials]=useState({
    name:"",
    email:"",
    phone_number:"",
    header_rating:null,
    healer_rating:null
  });

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleChange=(e)=>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(credentials.name.trim('')==="" || credentials.header_rating===0 || credentials.healer_rating===0){
      setMessage("Required Fields cannot be empty");
      handleOpen();
    }
    else{
      const token=localStorage.getItem('token');
      try {
        const response=await API.postAPICalling('contestant',credentials,token);
        setMessage("Contestant Added Successfully");
        setContestant(prevArray => [...prevArray, credentials]);
        handleOpen();        
      } catch (error) {
        setMessage(
          error.message
        )
        handleOpen();
      }
      setCredentials({
        name:"",
        email:"",
        phone_number:"",
        header_rating:null,
        healer_rating:null
      })
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value > 10) {
      event.target.value = 10;
    }
    else if(value<0){
      event.target.value=0;
    }
  };

  return (
    <>
    <Card>
      <CardHeader title='Add Contestant Information' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={3} sm={2}>
              <Typography variant='body2'  sx={{ fontWeight: 600,fontSize:"16px", textAlign: 'center', paddingTop: '15px' }}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={9} sm={9}>
            <TextField
            required
                fullWidth
                type='text'
                label="Name"
                name='name'
                value={credentials.name}
                onChange={handleChange}
                placeholder='John Snow'
              />
            </Grid>
            {/* <Grid item xs={3} sm={2}>
              <Typography variant='body2' sx={{ fontWeight: 600,fontSize:"16px", textAlign: 'center', paddingTop: '15px' }}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={9} sm={9}>
            <TextField
                fullWidth
                type='text'
                label="Address"
                placeholder='North of the kingdom, winterfell'
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                City:
              </Typography>
              <TextField
                fullWidth
                type='text'
                label='City'
                placeholder='City Name'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                State:
              </Typography>
              <TextField
                fullWidth
                type='text'
                label='State'
                placeholder='State Name'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Zip
              </Typography>
              <TextField
                fullWidth
                type='text'
                label='Zip'
                placeholder='Zip Code'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Phone:
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='City'
                placeholder='123-456-7890'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Cell:
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='State'
                placeholder='123-456-7890'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Email:
              </Typography>
              <TextField
                fullWidth
                type='email'
                // label='Email'
                placeholder='123@example.com'
              />
            </Grid> */}
            <Grid item xs={6} sm={2}>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign:"center", paddingTop:"15px" }}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type='email'
                name='email'
                required
                value={credentials.email}
                onChange={handleChange}
                // label='City'
                placeholder='abc@example.com'
              />
            </Grid>
            <Grid item xs={6} sm={2}>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign:"center", paddingTop:"15px" }}>
                Phone No.
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                name='phone_number'
                value={credentials.phone_number===null?"":credentials.phone_number}
                onChange={handleChange}
                // label='City'
                placeholder='123-456-7890'
              />
            </Grid>
            <Grid item xs={6} sm={2}>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign:"center", paddingTop:"15px" }}>
                Header rating:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
              required
                fullWidth
                type='number'
                name='header_rating'
                value={credentials.header_rating===null?"":credentials.header_rating}
                onChange={handleChange}
                // label='City'
                placeholder='00'
                inputProps={{ max: 10, onInput: handleInputChange }}

              />
            </Grid>
            <Grid item xs={6} sm={2}>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign:"center", paddingTop:"15px" }}>
                Healer rating:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                required
                type='number'
                name='healer_rating'
                value={credentials.healer_rating===null?"":credentials.healer_rating}
                onChange={handleChange}
                placeholder='00'
                inputProps={{ max: 10, onInput: handleInputChange }}

              />
            </Grid>
            <Grid item xs={12} >
              <Button type='submit' variant='contained' size='medium'>
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
    {/* <Card>
      <CardHeader title='Add Card/Rating Information' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={2}>
              <Typography variant='body2' sx={{ fontWeight: 600,fontSize:"16px", textAlign: 'center', paddingTop: '15px' }}>
                Card Number
              </Typography>
            </Grid>
            <Grid item xs={6} sm={10}>
            <TextField
                fullWidth
                type='number'
                label="Number"
                placeholder='Card Number'
              />
            </Grid> 
            <Grid item xs={6} sm={2}>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign:"center", paddingTop:"15px" }}>
                Header rating:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type='number'
                // label='City'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant='body2' sx={{ fontWeight: 600, textAlign:"center", paddingTop:"15px" }}>
              Heeler rating:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type='number'
                // label='City'
                placeholder='00'
              />
            </Grid>
           
            <Grid item xs={12} >
              <Button type='submit' variant='contained' size='medium'>
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card> */}

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

export default Contestant_information

