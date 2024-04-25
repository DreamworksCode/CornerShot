import { Divider } from '@mui/material'
import React from 'react'
import Add_contestant from 'src/views/form-layouts/Add_contestant'
import Contest_Roping_Information from 'src/views/form-layouts/Contest_Roping_Information'

const index = () => {
  return (
    <div>
      <Add_contestant/>
      <Divider sx={{ my: 5 }}>Roping Information</Divider>
      <Contest_Roping_Information/>
    </div>
  )
}

export default index