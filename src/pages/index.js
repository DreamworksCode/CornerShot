import React from 'react'
import Production_Form from 'src/views/form-layouts/Production_Form'
import Production_Select_Form from 'src/views/form-layouts/Production_Select_Form'
import Divider from '@mui/material/Divider'

const Dashboard = () => {
  return (
    <div>
      <Production_Select_Form/>
      <Divider sx={{ my: 5 }}>or</Divider>
      <Production_Form/>
    </div>
  )
}

export default Dashboard
