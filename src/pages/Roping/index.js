import React, { useEffect, useState } from 'react'
import Add_Roping from 'src/views/form-layouts/Add_Roping';
import Divider from '@mui/material/Divider'
import Roping_information from 'src/views/form-layouts/Roping_information';
import API from '../api';
import router from 'next/router';

const RopingInformation = () => {
  const [check,setCheck]=useState(false);
  const handleCheck=()=>{
    setCheck(prev=>!prev);
  }
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
  return (
    <div>
      <Add_Roping handleCheck={handleCheck}/>
      <Divider sx={{ my: 5 }}>Update Roping </Divider>
      <Roping_information check={check}/>
    </div>
  )
}

export default RopingInformation;
