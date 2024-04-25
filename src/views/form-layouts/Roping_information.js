// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Typography } from '@mui/material'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

const Roping_information = () => {
  return (
    <Card>
      {/* <CardHeader title='Roping Information' titleTypographyProps={{ variant: 'h6' }} /> */}
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Roping Name
              </Typography>
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
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Roping Type
              </Typography>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
                <Select
                  label='TYPE'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='Draw Pot'>Draw Pot</MenuItem>
                  <MenuItem value='Pick & Draw'>Pick & Draw</MenuItem>
                  <MenuItem value='Pick Only'>Pick Only</MenuItem>
                  <MenuItem value='Pick or Draw'>Pick or Draw</MenuItem>
                  <MenuItem value='Round Robin'>Round Robin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Draw Count
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Number of Rounds
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Entry Fee(Individual)
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Stock Charge Percent
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Assosiation Fee(Per Team)
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Prize Deduction
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Added Money
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Progressive after round
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Barrier Penalty
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Leg Penalty
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Classification
              </Typography>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, marginBottom: '10px',marginTop:"20px",  textAlign: 'center', fontSize: '18px' }}
              >
                HandiCap
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label='HandiCap Roping'
                control={<Checkbox name='form-layouts-alignment-checkbox' />}
                sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, textAlign:"end", paddingTop:"15px" }}>
                Round to Handicap
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
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Amount to handicap per number in seconds
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600,textAlign:"end",paddingTop:"15px" }}>
                Handicap down amount
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
              <Typography variant='body2' sx={{ fontWeight: 600,textAlign:"end",paddingTop:"15px"  }}>
                Maximum amount
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
              <Typography variant='body2' sx={{ fontWeight: 600,textAlign:"end",paddingTop:"15px"  }}>
                Handicap up amount
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
              <Typography variant='body2' sx={{ fontWeight: 600,textAlign:"end",paddingTop:"15px"  }}>
                Minimum amount
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
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, marginBottom: '10px',marginTop:"20px", textAlign: 'center', fontSize: '18px' }}
              >
                Incentive
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label='Roping for incentive sidepot'
                control={<Checkbox name='form-layouts-alignment-checkbox' />}
                sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600,textAlign:"end",paddingTop:"15px" }}>
                Number of rounds:
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
              <Typography variant='body2' sx={{ fontWeight: 600,textAlign:"end" ,paddingTop:"15px" }}>
                Classification
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
              <Button type='submit' variant='contained' size='large'>
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Roping_information
