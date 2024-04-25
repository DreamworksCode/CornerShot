import React, { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { InputLabel, MenuItem } from '@mui/material'

const Production_Select_Form = () => {
  return (
    <Card>
      <CardHeader title=' Select From Existing Production' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
          <Grid item xs={12} >
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Production Name</InputLabel>
                <Select
                  label='Production Name'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='UK'>DreamWorks Event</MenuItem>
                  <MenuItem value='USA'>Citronics Event</MenuItem>
                  <MenuItem value='Australia'>Aarambh Event</MenuItem>
                  <MenuItem value='Germany'>Manthan Event</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                select
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Production_Select_Form


