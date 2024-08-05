import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Add_contestant from '../form-layouts/PickOnly/Add_contestant'
import Contest_Roping_Information from '../form-layouts/PickOnly/Contest_Roping_Information'

const PickOnly = ({ selectedRopingId, classification }) => {
  const [flag,setFlag]=useState(false);
  useEffect(()=>{
    console.log("roping id for this: ",selectedRopingId);
  },[selectedRopingId]);
  return (
    <div>
      <Add_contestant selectedRopingId={selectedRopingId} classification={classification} flag={flag} setFlag={setFlag} />
      <Divider sx={{ my: 5 }}>Pick Only Roping Information</Divider>
      <Contest_Roping_Information selectedRopingId={selectedRopingId} classification={classification} flag={flag} />
    </div>
  )
}



export default PickOnly
