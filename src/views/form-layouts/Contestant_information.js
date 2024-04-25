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
import { FormControl, FormHelperText, InputLabel, MenuItem, Typography } from '@mui/material'
import Select from '@mui/material/Select'

const Contestant_information = () => {
  return (
    <>
    <Card>
      <CardHeader title='Add Contestant Information' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={3} sm={2}>
              <Typography variant='body2' sx={{ fontWeight: 600,fontSize:"16px", textAlign: 'center', paddingTop: '15px' }}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={9} sm={9}>
            <TextField
                fullWidth
                type='text'
                label="Name"
                placeholder='John Snow'
              />
            </Grid>
            <Grid item xs={3} sm={2}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
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
    <Card>
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
    </Card>
    </>
  )
}

export default Contestant_information

