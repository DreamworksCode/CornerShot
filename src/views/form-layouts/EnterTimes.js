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

const EnterTimes = () => {
  return (
    <Card>
      {/* <CardHeader title='Enter Draw' titleTypographyProps={{ variant: 'h6' }} /> */}
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12}>

              <Typography
                variant='body2'
                sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
              >
                Round Information
              </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px', marginBottom:"15px" }}
                >
                  Round #
                </Typography>
              </Grid>
              <Grid item  xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
              </Grid>
                <Grid item xs={12} sx={{margin:"15px 0px"}}></Grid>
              <Grid item xs={6} sm={6}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px', marginBottom:"15px" }}
                >
                  Number of teams in round
                </Typography>
              </Grid>
              <Grid item  xs={6} sm={2}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12}>

              <Typography
                variant='body2'
                sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
              >
                Shot Go Information
              </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px', marginBottom:"15px" }}
                >
                  Number of teams
                </Typography>
              </Grid>
              <Grid item  xs={6} sm={6}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
              </Grid>
                <Grid item xs={12} sx={{margin:"15px 0px"}}></Grid>
              <Grid item xs={6} sm={6}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px', marginBottom:"15px" }}
                >
                  Order of teams
                </Typography>
              </Grid>
              <Grid item  xs={6} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Teams</InputLabel>
                <Select
                  label='Contestant'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='UK'>Slowest to fastest</MenuItem>
                  <MenuItem value='USA'>fastest to slowest</MenuItem>
                </Select>
              </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={4} >
            <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px', marginBottom:"15px" }}
                >
                  Roping Name:
                </Typography>
            </Grid>
            <Grid item xs={6} sm={4} >
            <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Roping</InputLabel>
                <Select
                  label='Roping'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='UK'>ROPING 1</MenuItem>
                  <MenuItem value='USA'>ROPING 2</MenuItem>
                  <MenuItem value='Australia'>ROPING 3</MenuItem>
                  <MenuItem value='Germany'>ROPING 4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4} >
            <Button type='submit' variant='contained' size='large'>
                Add Team
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} >
            <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px', marginBottom:"15px" }}
                >
                  Fast time in 1st go:
                </Typography>
            </Grid>
            <Grid item xs={6} sm={4} >
            <FormControl fullWidth>
            <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </FormControl>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={6} sm={4} >
            <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px', marginBottom:"15px" }}
                >
                  Number of places to pay:
                </Typography>
            </Grid>
            <Grid item xs={6} sm={4} >
            <FormControl fullWidth>
            <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </FormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EnterTimes
