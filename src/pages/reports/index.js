import {  FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import React, {  useState } from 'react'
import Payoff from 'src/views/form-layouts/Payoff';
import Report from 'src/views/form-layouts/Report';

const index = () => {
  const [choice,setChoice]=useState("Reports");
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
              <FormControlLabel value='Reports' control={<Radio />} label='Reports' />
              <FormControlLabel value='Payoff' control={<Radio />} label='Payoff' />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      {
        choice==="Reports"?
        <Report/>:
        <Payoff/>
      }
    </div>
  )
}

export default index

