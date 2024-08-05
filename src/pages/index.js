import React, { useEffect, useState } from 'react'
import Production_Form from 'src/views/form-layouts/Production_Form'
import Production_Select_Form from 'src/views/form-layouts/Production_Select_Form'
import Divider from '@mui/material/Divider'
import router from 'next/router'
import API from './api'

const Dashboard = () => {

  const [productions, setProductions] = useState([])
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
      <Production_Select_Form productions={productions} setProductions={setProductions}/>
      <Divider sx={{ my: 5 }}>or</Divider>
      <Production_Form productions={productions} setProductions={setProductions}/>
    </div>
  )
}

export default Dashboard
