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
import RopingStageBadge from '../Roping/RopingStageBadge'

const Report = () => {
  const [ropingName, setRopingName] = useState('')
  const [selectedRopingId, setSelectedRopingId] = useState(null)
  const [roping, setRoping] = useState({})
  const [payoffId, setPayoffId] = useState(null)
  const [selectedPayoff, setSelectedPayoff] = useState(null)

  useEffect(async () => {
    const ropingId = localStorage.getItem('activeRopingId')
    if (!ropingId) {
      return
    }
    setRopingName(localStorage.getItem('activeRopingName') || '')
    setSelectedRopingId(parseInt(ropingId, 10))
    try {
      const response = await API.getAPICalling(`ropings/getroping/${ropingId}`)
      console.log(response)
      setRoping(response.roping)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [])

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
      <Card variant='outlined'>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={2}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
              >
                Roping Name
              </Typography>
            </Grid>
            <Grid item xs={6} sm={7} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                {ropingName || 'No roping selected - pick one on the Roping Information tab to see Roping Reports'}
              </Typography>
              {selectedRopingId && <RopingStageBadge ropingId={selectedRopingId} />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {selectedRopingId && (
        <Grid container spacing={5}>
          <Grid item xs={12} sx={{ mt: 3 }}>
                    <GetRopingReports
                      selectedRopingId={selectedRopingId}
                      roping={roping}
                      selectedPayoff={selectedPayoff}
                      payoffId={payoffId}
                      individual={individual}
                      isChecked={isChecked}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <PayoffName
                      payoffId={payoffId}
                      setPayoffId={setPayoffId}
                      isChecked={isChecked}
                      roping={roping}
                      individual={individual}
                      setSelectedPayoff={setSelectedPayoff}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <Card variant='outlined'>
                      <CardHeader title='Display Options' titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent>
                        <Grid container spacing={5} alignItems='center'>
                          <Grid item xs={12} sm={6}>
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
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel id='form-layouts-separator-select-label'>Payoff Display</InputLabel>
                              <Select
                                label='Payoff Display'
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
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <GetProductionReports selectedPayoff={selectedPayoff} isChecked={isChecked} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <GetContestantReports />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Report
