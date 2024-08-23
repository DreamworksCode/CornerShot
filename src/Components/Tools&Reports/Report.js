// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Typography } from '@mui/material'
import Select from '@mui/material/Select'
import GetRopingReports from '../Report/GetRopingReports'
import GetProductionReports from '../Report/GetProductionReports'
import PayoffName from '../Report/PayoffName'
import GetContestantReports from '../Report/GetContestantReports'
import { useEffect, useState } from 'react'
import API from 'src/pages/api'

const Report = () => {
  const [ropingList, setRopingList] = useState([])
  const [selectedRopingId, setSelectedRopingId] = useState(null)
  const [roping, setRoping] = useState({})
  const [payoffId, setPayoffId] = useState(null)
  const [selectedPayoff, setSelectedPayoff] = useState(null)

  useEffect(async () => {
    const productionId = localStorage.getItem('productinoId')
    try {
      const response = await API.getAPICalling(`ropings/getnames/${productionId}`)
      console.log(response)
      setRopingList(response)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [])

  const handleChange = async e => {
    // setRopingInformation({ ...ropingInformation, [e.target.name]: e.target.value })
    if (e.target.name === 'name') {
      const ropingId = e.target.value
      setSelectedRopingId(ropingId)
      console.log(ropingId)
      try {
        const response = await API.getAPICalling(`ropings/getroping/${ropingId}`)
        console.log(response)
        setRoping(response.roping)
      } catch (error) {
        console.log('Some error:  ', error)
      }
    }
  }

  const [isChecked, setIsChecked] = useState(true)

  const handleCheckboxChange = event => {
    setIsChecked(event.target.checked)
    console.log('Checkbox is checked:', event.target.checked)
  }

  const [individual, setIndividual] = useState(false)
  const handleIndividualChange = e => {
    console.log(typeof e.target.value)
    if (e.target.value === '1') {
      setIndividual(false)
    } else {
      setIndividual(true)
    }
  }

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
                    name='name'
                    onChange={handleChange}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    {ropingList.map(roping => (
                      <MenuItem key={roping.id} value={roping.id}>
                        {roping.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {selectedRopingId && (
                <>
                  <Grid item xs={12}></Grid>

                  <GetRopingReports
                    selectedRopingId={selectedRopingId}
                    roping={roping}
                    selectedPayoff={selectedPayoff}
                    payoffId={payoffId}
                    individual={individual}
                    isChecked={isChecked}
                  />

                  <Grid item xs={12}></Grid>

                  <PayoffName
                    payoffId={payoffId}
                    setPayoffId={setPayoffId}
                    isChecked={isChecked}
                    roping={roping}
                    individual={individual}
                    setSelectedPayoff={setSelectedPayoff}
                  />

                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
                    >
                      Payoff Parameters
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      label='Report on paid entries only'
                      control={<Checkbox name='form-layouts-alignment-checkbox' />}
                      sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      label='Round to the nearest dollar'
                      control={
                        <Checkbox
                          name='form-layouts-alignment-checkbox'
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                      }
                      sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
                      <Select
                        label='Country'
                        defaultValue=''
                        value={individual ? '2' : '1'}
                        onChange={handleIndividualChange}
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                      >
                        <MenuItem value='1'>Payoff/Team</MenuItem>
                        <MenuItem value='2'>Contestant Winnings</MenuItem>
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

                  <GetProductionReports />

                  <Grid item xs={12}>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}
                    >
                      Contestant Reports
                    </Typography>
                  </Grid>

                  <GetContestantReports />
                </>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default Report
