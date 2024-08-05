import { Divider} from '@mui/material'
import React, {  useState } from 'react'
import Add_contestant from '../form-layouts/PickAndDraw/Add_contestant'
import Contest_Roping_Information from '../form-layouts/PickAndDraw/Contest_Roping_Information'
import Add_Teams from '../form-layouts/PickAndDraw/Add_Teams'

const PickAndDraw = ({ selectedRopingId, classification }) => {
  const [flag,setFlag]=useState(false);
  return (
    <div>
    <Add_Teams selectedRopingId={selectedRopingId} classification={classification} flag={flag} setFlag={setFlag}/>
      {/* <Divider sx={{ my: 5 }}>Draw</Divider>
    <Add_contestant selectedRopingId={selectedRopingId} flag={flag} setFlag={setFlag} /> */}
      <Divider sx={{ my: 5 }}>Roping Information</Divider>
      <Contest_Roping_Information selectedRopingId={selectedRopingId} classification={classification} setFlag={setFlag} flag={flag} />
    </div>
  ) 
}

export default PickAndDraw

