import React from 'react'
import Add_Roping from 'src/views/form-layouts/Add_Roping';
import Divider from '@mui/material/Divider'
import Roping_information from 'src/views/form-layouts/Roping_information';

const RopingInformation = () => {
  return (
    <div>
      <Add_Roping/>
      <Divider sx={{ my: 5 }}>Roping Information</Divider>
      <Roping_information/>
    </div>
  )
}

export default RopingInformation;
