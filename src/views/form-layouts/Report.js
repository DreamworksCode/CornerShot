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
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Typography
} from '@mui/material'
import Select from '@mui/material/Select'

const Report = () => {
  return (
    <>
      <Card>
        <CardHeader title='Roping Reports' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={2}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
                >
                  Roping Name
                </Typography>
              </Grid>
              <Grid item xs={6} sm={7}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Roping</InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value='UK'>Roping 1</MenuItem>
                    <MenuItem value='USA'>Roping 2</MenuItem>
                    <MenuItem value='Australia'>Roping 3</MenuItem>
                    <MenuItem value='Germany'>Roping 4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={6} sm={2}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
                >
                  Roping Type
                </Typography>
              </Grid>
              <Grid item xs={6} sm={7}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value='UK'>Contestant by Name</MenuItem>
                    <MenuItem value='USA'>Draw Entries</MenuItem>
                    <MenuItem value='Australia'>Results</MenuItem>
                    <MenuItem value='Germany'>Results with Payoff</MenuItem>
                    <MenuItem value='Germany'>Teams by number</MenuItem>
                    <MenuItem value='Germany'>Time Sheet</MenuItem>
                    <MenuItem value='Germany'>Time Sheet with Handicap</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button type='button' variant='contained' size='large'>
                  Get Report
                </Button>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={6} sm={2}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
                >
                  Payoff name
                </Typography>
              </Grid>
              <Grid item xs={6} sm={7}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Payoff</InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value='UK'>Contestant by Name</MenuItem>
                    <MenuItem value='USA'>Draw Entries</MenuItem>
                    <MenuItem value='Australia'>Results</MenuItem>
                    <MenuItem value='Germany'>Results with Payoff</MenuItem>
                    <MenuItem value='Germany'>Teams by number</MenuItem>
                    <MenuItem value='Germany'>Time Sheet</MenuItem>
                    <MenuItem value='Germany'>Time Sheet with Handicap</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button type='button' variant='contained' size='large'>
                  View Payoff
                </Button>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
                >
                  Payoff Parameters
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label='Report on paid entries only'
                  control={<Checkbox name='form-layouts-alignment-checkbox' />}
                  sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label='Round to the nearest dollar'
                  control={<Checkbox name='form-layouts-alignment-checkbox' />}
                  sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value='UK'>Payoff/Team</MenuItem>
                    <MenuItem value='USA'>Contestant Winnings</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
                >
                  Production Reports
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
                >
                  Report Type
                </Typography>
              </Grid>
              <Grid item xs={6} sm={7}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value='UK'>Contestant Fees</MenuItem>
                    <MenuItem value='USA'>Contestant Winnings</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button type='button' variant='contained' size='large'>
                  Get Report
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
                >
                  Contestant Reports
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
                >
                  Report Type
                </Typography>
              </Grid>
              <Grid item xs={6} sm={7}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value='UK'>Email List</MenuItem>
                    <MenuItem value='USA'>Send Message</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button type='button' variant='contained' size='large'>
                  Get Report
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default Report
