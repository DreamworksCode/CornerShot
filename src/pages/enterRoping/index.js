import React, { useEffect, useState } from 'react'
import API from '../api'
import router from 'next/router'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
// import Divider from '@mui/material/Divider'

import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'
import RoundRobin from 'src/ropingTypes/RoundRobin'
import DrawPot from 'src/ropingTypes/DrawPot'
import PickOnly from 'src/ropingTypes/PickOnly'
import PickAndDraw from 'src/ropingTypes/PickAndDraw'
import PickOrDraw from 'src/ropingTypes/PickOrDraw'

const index = () => {
  const [ropingType, setRopingType] = useState('Draw Pot')
  const [ropingName, setRopingName] = useState('')
  const [selectedRopingId, setSelectedRopingId] = useState(null)
  const [roping, setRoping] = useState({})
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
            <Grid item xs={12} sm={6}>
              <Typography variant='body1' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                {ropingName || 'No roping selected'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Divider sx={{ my: 5 }}>Draw Information</Divider>
      {selectedRopingId && (
        <>
          {(() => {
            switch (roping.type) {
              case 'Draw Pot':
                return <DrawPot selectedRopingId={selectedRopingId} classification={classification} />
                case 'Round Robin':
                  return <RoundRobin selectedRopingId={selectedRopingId} classification={classification} />
                case 'Pick Only':
                  return <PickOnly selectedRopingId={selectedRopingId} classification={classification} />
              case 'Pick & Draw':
                return <PickAndDraw selectedRopingId={selectedRopingId} classification={classification} />
              case 'Pick or Draw':
                return <PickOrDraw selectedRopingId={selectedRopingId} classification={classification} />
              default:
                return null
            }
          })()}
        </>
      )}
    </div>
  )
}

export default index
