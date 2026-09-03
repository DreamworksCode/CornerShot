import { Button, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import API from '../api'
import router from 'next/router'
import Contestant_Table from 'src/Components/Contestant/Contestant_Table'
import Contestant_information from 'src/Components/Contestant/Contestant_information'

const Index = () => {
  const [constestantList, setContestantList] = useState(false);
  const [contestant,setContestant]=useState([]);
  useEffect(async()=>{
    const item=localStorage.getItem('token');
    // const item = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsImlhdCI6MTcxNTA3NjAyNywiZXhwIjoxNzE1MDc5NjI3fQ.46D5yWtQYwEX2oYv-qgYUk0E-Fp2XOJHB4Yz4L9jIg0"
    if(item===null){
      router.push("/pages/login")
    }
    try {
      const response=await API.getAPICalling('production',item);
      // console.log(response);
    } catch (error) {
      console.log(" ",error);
      if(error.message==="Unauthorized"){
        router.push("/pages/login")
      }
    }
  },[])
  //ESLint-ignore
  return (
    <div>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button
          onClick={() => setContestantList(prev => !prev)}
          sx={{ marginBottom: '10px' }}
          type='button'
          variant='contained'
          size='medium'
        >
          {!constestantList ? 'Show Contestant List' : 'Hide Contestant List'}
        </Button>
        {constestantList ? <Contestant_Table contestant={contestant} setContestant={setContestant} /> : ''}
      </Grid>
      <Divider sx={{ my: 5 }}>Add Contestant</Divider>
      <Contestant_information setContestant={setContestant} />
    </div>
  )
}

export default Index
