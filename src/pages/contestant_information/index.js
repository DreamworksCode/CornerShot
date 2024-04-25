import { Button, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import Contestant_information from 'src/views/form-layouts/Contestant_information'
import Update_Contestant from 'src/views/form-layouts/Update_Contestant'
import BaseTable from 'src/views/tables/BaseTable'

const index = () => {
  const [constestantList, setContestantList] = useState(false)
  return (
    <div>
      {/* <Grid container spacing={5}>
        <Grid item xs={6} sm={4}>
          <Button onClick={()=>setContestantState(true)} type='button' variant='contained' size='medium'>
            New Contestant
          </Button>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Button onClick={()=>setContestantState(false)} type='button' variant='contained' size='medium'>
            Update Contestant
          </Button>
        </Grid>
      </Grid> */}
      {/* {
        contestantState?<Contestant_information />:<Update_Contestant/>
      } */}
      <Grid item xs={12} sx={{textAlign:"center"}}>
        <Button onClick={()=>setContestantList(prev=>!prev)} sx={{marginBottom:"10px"}}  type='button' variant='contained' size='medium'>
          {!constestantList?"Show Contestant List":"Hide Contestant List"}
        </Button>
        {constestantList?<BaseTable/>:""}
      </Grid>
      <Divider sx={{ my: 5 }}>Add Contestant</Divider>
      <Contestant_information />
    </div>
  )
}

export default index
