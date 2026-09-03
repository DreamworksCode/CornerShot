import { Divider } from '@mui/material'
import React, { useState } from 'react'
import Add_Teams from 'src/Components/PickAndDraw/Add_Teams'
import Contest_Roping_Information from 'src/Components/PickAndDraw/Contest_Roping_Information'

const PickAndDraw = ({ selectedRopingId, classification }) => {
  const [flag, setFlag] = useState(false)
  return (
    <div>
      <Add_Teams selectedRopingId={selectedRopingId} classification={classification} flag={flag} setFlag={setFlag} />
      <Divider sx={{ my: 5 }}>Roping Information</Divider>
      <Contest_Roping_Information
        selectedRopingId={selectedRopingId}
        classification={classification}
        setFlag={setFlag}
        flag={flag}
      />
    </div>
  )
}

export default PickAndDraw
