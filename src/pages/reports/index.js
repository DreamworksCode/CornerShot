import {  FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import Payoff from 'src/Components/Tools&Reports/Payoff';
import Report from 'src/Components/Tools&Reports/Report';
import API from '../api';
import router from 'next/router';

const index = () => {
  const [choice,setChoice]=useState("Reports");
  const handleChange=(e)=>{
    setChoice(e.target.value);
  }

  useEffect(async()=>{
    const item=localStorage.getItem('token');
    // const item = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsImlhdCI6MTcxNTA3NjAyNywiZXhwIjoxNzE1MDc5NjI3fQ.46D5yWtQYwEX2oYv-qgYUk0E-Fp2XOJHB4Yz4L9jIg0"
    if(item===null){
      router.push("/pages/login")
    }
    try {
      const response=await API.getAPICalling('production',item);
      console.log(response);
    } catch (error) {
      console.log(" ",error);
      if(error.message==="Unauthorized"){
        router.push("/pages/login")
      }
    }
  },[])
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

