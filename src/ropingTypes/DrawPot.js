import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Add_contestant from 'src/Components/DrawPot/Add_contestant';
import Contest_Roping_Information from 'src/Components/DrawPot/Contest_Roping_Information';

const DrawPot = ({ selectedRopingId, classification }) => {
  const [flag,setFlag]=useState(false);
  useEffect(()=>{
    console.log("roping id for this: ",selectedRopingId);
  },[selectedRopingId]);
  return (
    <div>
      <Add_contestant selectedRopingId={selectedRopingId} flag={flag} setFlag={setFlag} />
      <Divider sx={{ my: 5 }}>Roping Information</Divider>
      <Contest_Roping_Information selectedRopingId={selectedRopingId} classification={classification} flag={flag} />
    </div>
  )
}

export default DrawPot
