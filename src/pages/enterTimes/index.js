import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from '../api'
import router from 'next/router'
import EnterTimes from 'src/Components/Times/EnterTimes'
import RopingStageBadge from 'src/Components/Roping/RopingStageBadge'

const index = () => {
const [ropingName, setRopingName] = useState('')
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

useEffect(() => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const productionId = parseInt(localStorage.getItem('productinoId'), 10)
  if (token !== null && (isNaN(productionId) || productionId <= 0)) {
    router.push('/')
  }
}, [])

useEffect(() => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const ropingId = parseInt(localStorage.getItem('activeRopingId'), 10)
  if (token !== null && (isNaN(ropingId) || ropingId <= 0)) {
    router.push('/roping')
  }
}, [])

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
    setClassification(response.roping.ropingRules.classification)
  } catch (error) {
    console.log('Some error:  ', error)
  }
}, [])

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
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                {ropingName || 'No roping selected'}
              </Typography>
              {selectedRopingId && <RopingStageBadge ropingId={selectedRopingId} />}
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
