// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

const Contest_Roping_Information = () => {
  return (
    <Card>
      {/* <CardHeader title='Roping Information' titleTypographyProps={{ variant: 'h6' }} /> */}
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={2}>
              <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                Roping Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Roping</InputLabel>
                <Select
                  label='TYPE'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='Draw Pot'>Roping 1</MenuItem>
                  <MenuItem value='Pick & Draw'>Roping 2</MenuItem>
                  <MenuItem value='Pick Only'>Roping 3</MenuItem>
                  <MenuItem value='Pick or Draw'>Roping 4</MenuItem>
                  <MenuItem value='Round Robin'>Roping 5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
              >
                Team information and activities
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                Number of teams entered
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='button' variant='contained' size='medium'>
                List Teams
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
              >
                Arrange Teams
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                >
                  <FormControlLabel value='LIFO' control={<Radio />} label='First to enter last to rope' />
                  <FormControlLabel value='FIFO' control={<Radio />} label='First to enter first to rope' />
                  <FormControlLabel value='Random' control={<Radio />} label='Random order' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px',textAlign:"center" }}>
                Roper Seperation:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='button' variant='contained' size='medium'>
                Arrange Teams
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
              >
                Draw information and activities
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                Number of headers entered
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                Number of heelers entered
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label='Draw unique patterns if possible'
                control={<Checkbox name='form-layouts-alignment-checkbox' />}
                sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                Draw Status
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth type='text' />
            </Grid>

            <Grid item xs={12}></Grid>
            <Grid item xs={6} sm={4}>
              <Button type='button' variant='contained' size='medium'>
                Draw Patterns
              </Button>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Button type='button' variant='contained' size='medium'>
                Delete Draw Teams
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Contest_Roping_Information
