import React, { useEffect, useState } from 'react';
import Add_Roping from 'src/views/form-layouts/Add_Roping';
import Divider from '@mui/material/Divider';
import Roping_information from 'src/views/form-layouts/Roping_information';
import API from '../api';
import router from 'next/router';

const RopingInformation = () => {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck(prev => !prev);
  };

  useEffect(() => {


    async function fetchData() {
      const item = localStorage.getItem('token');
      
      if (item === null) {
        router.push("/pages/login");
      }

      try {
        const response = await API.getAPICalling('production', item);

        // console.log(response);
      } catch (error) {
        console.log(" ", error);

        if (error.message === "Unauthorized") {
          router.push("/pages/login");
        }
      }
    }
    
    fetchData();
  }, []);

  return (
    <div>
      <Add_Roping handleCheck={handleCheck} />
      <Divider sx={{ my: 5 }}>Update Roping</Divider>
      <Roping_information check={check} />
    </div>
  );
};
export default RopingInformation;
