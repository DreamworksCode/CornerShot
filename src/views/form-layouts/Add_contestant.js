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

const Add_contestant = () => {
  return (
    <Card>
      <CardHeader title='Enter Draw' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600,fontSize:"16px", textAlign: 'end', paddingTop: '15px' }}>
                Contestant Name
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Contestant</InputLabel>
                <Select
                  label='Contestant'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='UK'>ARTH</MenuItem>
                  <MenuItem value='USA'>AYUSH</MenuItem>
                  <MenuItem value='Australia'>JAYESH</MenuItem>
                  <MenuItem value='Germany'>KULDEEP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                Header entries
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                Heeler entries
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                Header Rating
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                Heeler Rating
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText id='form-layouts-basic-password-helper'>
                * Add aditional draw entries to existing entry count
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button type='submit' variant='contained' size='medium'>
                Update Draw
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button type='submit' variant='contained' size='medium'>
                Remove from Draw
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button type='submit' variant='contained' size='medium'>
                List Draw Entries
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Add_contestant
