// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GetTeams from '../tables/EnterTimes/GetTeams'
import API from 'src/pages/api'
import UpdateTeams from '../tables/EnterTimes/UpdateTeams'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))


const EnterTimes = ({ roping, selectedRopingId }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: 600
  }
  const [teams, setTeams] = useState([])
  const [teamsForUpdate, setTeamsForUpdate] = useState([])
  const [round, setRound] = useState(1)
  const [showTeams, setShowTeams] = useState(false)
  const [barrier, setBarrier] = useState(null)
  const [leg, setLeg] = useState(null)
  const [flag, setFlag] = useState(false);
  
  const [open,setOpen]=useState(false);
  const handleOpen=()=>setOpen(true);
  const handleClose=()=>setOpen(false);
  const [tableData,setTableData]=useState(null);

  const [averageTableOpen, setAverageTableOpen]=useState(false);
  const handleAverageOpen=()=>setAverageTableOpen(true);
  const handleAverageClose=()=>setAverageTableOpen(false);
  const [averageData,setAverageData]=useState([]);

  const [data,setData]=useState([]);
  const [check,setCheck]=useState(false);


  useEffect(async () => {
    // console.log('Roping in enter time, ', roping)
    let value = roping.type
    let type
    switch (value) {
      case 'Draw Pot':
        type = 'Draw_Pot'
        break
      case 'Round Robin':
        type = 'Round_Robin'
        break
      case 'Pick Only':
        type = 'Pick_Only'
        break
      case 'Pick or Draw':
        type = 'Pick_Or_Draw'
        break
      case 'Pick & Draw':
        type = 'Pick_And_Draw'
        break
      default:
        type = 'Draw_Pot'
    }

    if(round===1){
      try {
        const response = await API.getAPICalling(`Teams/?ropingId=${selectedRopingId}&roping_team_type=${type}`)
        // console.log("For round numeber ", round ," the teams are :",response);
        setTeams(response)
      } catch (error) {
        console.log('Some error:  ', error)
        setTeams([])
      }
    }

    setLeg(roping.ropingRules.leg_penalty)
    setBarrier(roping.ropingRules.barrier_penalty)
    setTeamsForUpdate([]);
    try {
      const response = await API.getAPICalling(`Team-Times/${selectedRopingId}/${round}`)
      console.log("for round number ", round ," the time table teams are : " ,response)
      setTeamsForUpdate(response)
    } catch (error) {
      console.log('Some error:  ', error)
      setTeamsForUpdate([])
    }


    try {
      const response = await API.getAPICalling(`Team-Times/${selectedRopingId}/0`)
      // console.log("for round number ", round ," the time table teams are : " ,response)
      setData(response)
    } catch (error) {
      console.log('Some error:  ', error)
      setData([])
    }

    if (round > 1) {
      console.log('ENtrance')
      try {
        const response = await API.getAPICalling(`Team-Times/${selectedRopingId}/${round - 1}`)
        const teams = await API.getAPICalling(`Teams/?ropingId=${selectedRopingId}&roping_team_type=${type}`)
        // console.log(response)
        const newResponse = response.filter(item => item.current_time !== 0)
        // console.log('Filtered Response:', newResponse)

        const filteredTeamIds = new Set(newResponse.map(item => Number(item.team.id)))
        // console.log('Filtered Team IDs:', [...filteredTeamIds])
        // console.log("Teams: ", teams);
        const updatedTeams = teams.filter(team => {
          const teamId = Number(team.id)
          const isIncluded = filteredTeamIds.has(teamId)
          // console.log(`Checking team ID ${teamId}: ${isIncluded}`)
          return isIncluded
        });
        
        setTeams(updatedTeams);
        setCheck(prev=>!prev);

        console.log('Hey ', updatedTeams)
      } catch (error) {
        console.log('Some error:  ', error)
        setTeams([]);
        setCheck(prev=>!prev);

      }
    }
    try {
      const response = await API.getAPICalling(`Team-Times/max-rounds?roping_id=${selectedRopingId}`)
      // console.log("for round number ", round ," the time table teams are : " ,response)
      setAverageData(response)
    } catch (error) {
      console.log('Some error:  ', error)
      setAverageData([])
    }
    

  }, [selectedRopingId, roping, round, flag])

  const handleChange = e => {
    const { name, value } = e.target
    setRound(Number(value))
  }

  // useEffect(async () => {
  //   setLeg(roping.ropingRules.leg_penalty)
  //   setBarrier(roping.ropingRules.barrier_penalty)
  //   try {
  //     const response = await API.getAPICalling(`Team-Times/${selectedRopingId}/${round}`)
  //     console.log("for round number ", round ," the time table teams are : " ,response)
  //     setTeamsForUpdate(response)
  //   } catch (error) {
  //     console.log('Some error:  ', error)
  //     setTeamsForUpdate([])
  //   }
  // }, [selectedRopingId,roping ,round, flag])


  const handleFastTimeClicked=()=>{
    if(teamsForUpdate.length===0){
      alert("No team has been assigned a time")
    }
    else{
      const teamWithMinTime = teamsForUpdate
  .filter(team => team.current_time > 0)
  .reduce((minTeam, currentTeam) => 
    currentTeam.current_time < minTeam.current_time ? currentTeam : minTeam
  );
  console.log(teamWithMinTime)

  setTableData(teamWithMinTime);
  handleOpen();
    }
  }


  const handleAverageTimeClicked=()=>{
    handleAverageOpen();
  }

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
                  >
                    Round Information
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 600,
                      fontSize: '16px',
                      textAlign: 'start',
                      paddingTop: '15px',
                      marginBottom: '15px'
                    }}
                  >
                    Round #
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    type='number'
                    name='round'
                    value={round}
                    onChange={handleChange}
                    inputProps={{ min: 1, max: roping.num_rounds }}
                    placeholder='00'
                  />
                </Grid>
                <Grid item xs={12} sx={{ margin: '15px 0px' }}></Grid>
                <Grid item xs={6} sm={6}>
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 600,
                      fontSize: '16px',
                      textAlign: 'start',
                      paddingTop: '15px',
                      marginBottom: '15px'
                    }}
                  >
                    Number of teams in round
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    fullWidth
                    type='number'
                    value={teams.length}
                    // label='Phone No.'
                    placeholder='00'
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'start', paddingTop: '15px' }}
                  >
                    Shot Go Information
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 600,
                      fontSize: '16px',
                      textAlign: 'start',
                      paddingTop: '15px',
                      marginBottom: '15px'
                    }}
                  >
                    Number of teams
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    type='number'
                    // label='Phone No.'
                    placeholder='00'
                  />
                </Grid>
                <Grid item xs={12} sx={{ margin: '15px 0px' }}></Grid>
                <Grid item xs={6} sm={6}>
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 600,
                      fontSize: '16px',
                      textAlign: 'start',
                      paddingTop: '15px',
                      marginBottom: '15px'
                    }}
                  >
                    Order of teams
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Teams</InputLabel>
                    <Select
                      label='Contestant'
                      defaultValue=''
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                    >
                      <MenuItem value='UK'>Slowest to fastest</MenuItem>
                      <MenuItem value='USA'>fastest to slowest</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ margin: '20px 0px' }}>
                  <GetTeams
                    flag={flag}
                    setFlag={setFlag}
                    setTeamsForUpdate={setTeamsForUpdate}
                    check={check}
                    teams={teams}
                    setTeams={setTeams}
                    round={round}
                    selectedRopingId={selectedRopingId}
                    teamsForUpdate={teamsForUpdate}
                  />
              </Grid>

              <Grid
                item
                xs={12}
                sm={showTeams ? 12 : 4}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 600,
                    fontSize: '16px',
                    textAlign: 'center',
                    paddingTop: '15px',
                    marginBottom: '15px'
                  }}
                >
                  List of Teams with their Time
                </Typography>

                <Button
                  onClick={() => setShowTeams(prev => !prev)}
                  sx={{ marginBottom: '10px' }}
                  type='button'
                  variant='contained'
                  size='medium'
                >
                  {!showTeams ? 'Show Team List' : 'Hide Team List'}
                </Button>
                {/* {showTeams && <UpdateTeams teamsForUpdate={teamsForUpdate} selectedRopingId={selectedRopingId} round={round} />} */}
              </Grid>

              {showTeams && (
                <Grid item xs={12}>
                  <UpdateTeams
                    teamsForUpdate={teamsForUpdate}
                    flag={flag}
                    setFlag={setFlag}
                    selectedRopingId={selectedRopingId}
                    round={round}
                    leg={leg}
                    barrier={barrier}
                  />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sm={showTeams ? 6 : 4}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 600,
                    fontSize: '16px',
                    textAlign: 'center',
                    paddingTop: '15px',
                    marginBottom: '15px'
                  }}
                >
                  Average Time Table
                </Typography>

                <Button onClick={handleAverageTimeClicked} sx={{ marginBottom: '10px' }} type='button' variant='contained' size='medium'>
                Average Time
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={showTeams ? 6 : 4}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 600,
                    fontSize: '16px',
                    textAlign: 'center',
                    paddingTop: '15px',
                    marginBottom: '15px'
                  }}
                >
                  Fast Time in this round
                </Typography>
                <Button onClick={handleFastTimeClicked} sx={{ marginBottom: '10px' }} type='button' variant='contained' size='medium'>
                   Fast Time
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>





      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>S.No</StyledTableCell>
                  <StyledTableCell align='center'>Header Name</StyledTableCell>
                  <StyledTableCell align='center'>Heeler Name </StyledTableCell>
                  <StyledTableCell align='center'>Time </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tableData && 
                  <StyledTableRow >
                    <StyledTableCell component='th' scope='row' align='center'>
                      1
                    </StyledTableCell>
                    <StyledTableCell align='center'>{tableData.team.header.name}</StyledTableCell>
                    <StyledTableCell align='center'>{tableData.team.healer.name}</StyledTableCell>
                    <StyledTableCell align='center'>{tableData.current_time}</StyledTableCell>
                  </StyledTableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>


      <Modal
        open={averageTableOpen}
        onClose={handleAverageClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>S.No</StyledTableCell>
                  <StyledTableCell align='center'>Header Name</StyledTableCell>
                  <StyledTableCell align='center'>Heeler Name </StyledTableCell>
                  <StyledTableCell align='center'>Total Time </StyledTableCell>
                  <StyledTableCell align='center'>Number Caught </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {averageData.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row' align='center'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{data.team.header.name}</StyledTableCell>
                    <StyledTableCell align='center'>{data.team.healer.name}</StyledTableCell>
                    <StyledTableCell align='center'>{data.total_time}</StyledTableCell>
                    <StyledTableCell align='center'>{data.current_time===0?data.round_number-1:data.round_number}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>


    </>
  )
}

export default EnterTimes
