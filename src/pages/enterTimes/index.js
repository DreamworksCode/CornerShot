import { Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EnterTimes from 'src/views/form-layouts/EnterTimes'
import API from '../api'
import router from 'next/router'

const index = () => {  
const [ropingList, setRopingList] = useState([])
const [selectedRopingId, setSelectedRopingId] = useState(null)
const [roping, setRoping] = useState(null)
const [classification, setClassification] = useState(null)
useEffect(async () => {
  const item = localStorage.getItem('token')
  // const item = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsImlhdCI6MTcxNTA3NjAyNywiZXhwIjoxNzE1MDc5NjI3fQ.46D5yWtQYwEX2oYv-qgYUk0E-Fp2XOJHB4Yz4L9jIg0"
  if (item === null) {
    router.push('/pages/login')
  }
  try {
    const response = await API.getAPICalling('production', item)
    // console.log(response);
  } catch (error) {
    console.log(' ', error)
    if (error.message === 'Unauthorized') {
      router.push('/pages/login')
    }
  }
}, [])

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
      setClassification(response.roping.ropingRules.classification)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }
}

  return (
    <div>
       <Card>
        {/* <CardHeader title='Roping Information' titleTypographyProps={{ variant: 'h6' }} /> */}
        <CardContent>
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
          </Grid>
        </CardContent>
      </Card>
      <Divider sx={{ my: 5 }}></Divider>
      {
        roping && <EnterTimes roping={roping} selectedRopingId={selectedRopingId}/>
      }
    </div>
  )
}

export default index
