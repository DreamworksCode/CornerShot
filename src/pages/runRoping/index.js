import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from '../api'
import router from 'next/router'
import RunRoping from 'src/Components/Times/RunRoping'
import RopingStageBadge from 'src/Components/Roping/RopingStageBadge'

const index = () => {
  const [ropingName, setRopingName] = useState('')
  const [selectedRopingId, setSelectedRopingId] = useState(null)
  const [roping, setRoping] = useState(null)

  useEffect(async () => {
    const item = localStorage.getItem('token')
    if (item === null) {
      router.push('/pages/login')
    }
    try {
      const response = await API.getAPICalling('production', item)
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
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [])

  return (
    <div>
      <Card>
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
      {roping && <RunRoping roping={roping} selectedRopingId={selectedRopingId} />}
    </div>
  )
}

export default index
