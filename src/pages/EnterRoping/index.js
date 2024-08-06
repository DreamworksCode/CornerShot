import React, { useEffect, useState } from 'react'
import API from '../api'
import router from 'next/router'
import DrawPot from 'src/views/ropingTypes/DrawPot'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
// import Divider from '@mui/material/Divider'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { CardHeader, Divider, InputLabel, MenuItem } from '@mui/material'
import RoundRobin from 'src/views/ropingTypes/RoundRobin'
import PickOnly from 'src/views/ropingTypes/PickOnly'
import PickOrDraw from 'src/views/ropingTypes/PickOrDraw'
import PickAndDraw from 'src/views/ropingTypes/PickAndDraw'

const index = () => {
  const [ropingType, setRopingType] = useState('Draw Pot')
  const [ropingList, setRopingList] = useState([])
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
