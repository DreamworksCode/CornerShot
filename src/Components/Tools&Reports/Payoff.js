import React, { useState } from 'react'
import { Divider } from '@mui/material'
import AddPayoff from '../Payoff/AddPayoff'
import UpdatePayoff from '../Payoff/UpdatePayoff'

const Payoff = () => {
  const [flag,setFlag]=useState(false);
  return (
    <div>
        <AddPayoff setFlag={setFlag}/>
        <Divider>Update Payoff</Divider>
        <UpdatePayoff flag={flag}/>
    </div>
  )
}

export default Payoff