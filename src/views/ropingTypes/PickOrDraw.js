import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Add_contestant from '../form-layouts/PickOrDraw/Add_contestant'
import Contest_Roping_Information from '../form-layouts/PickOrDraw/Contest_Roping_Information'
import Add_Teams from '../form-layouts/PickOrDraw/Add_Teams'

const PickOrDraw = ({ selectedRopingId, classification }) => {
  const [flag,setFlag]=useState(false);
  const [choice,setChoice]=useState("Pick");
  useEffect(()=>{
    console.log("roping id for this: ",selectedRopingId);
  },[selectedRopingId]);
  const handleChange=(e)=>{
    setChoice(e.target.value);
  }
  return (
    <div>
      <Grid container spacing={5}>
       <Grid item xs={12} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <FormControl>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue={choice}
              onChange={handleChange}
              name='radio-buttons-group'
              sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row", marginBottom:"20px"}}
            >
              <FormControlLabel value='Pick' control={<Radio />} label='Pick' />
              <FormControlLabel value='Draw' control={<Radio />} label='Draw' />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      {
        choice==="Draw"?
        <Add_contestant selectedRopingId={selectedRopingId} flag={flag} setFlag={setFlag} />:
      <Add_Teams selectedRopingId={selectedRopingId} classification={classification} flag={flag} setFlag={setFlag}/>
      }
      {/* <Divider sx={{ my: 5 }}>Or Enter Team</Divider> */}
      <Divider sx={{ my: 5 }}>Roping Information</Divider>
      <Contest_Roping_Information selectedRopingId={selectedRopingId} classification={classification} flag={flag} />
    </div>
  )
}

export default PickOrDraw

