// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import {
  Box,
  Button,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from 'src/pages/api'

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

const GetTeams = ({ teams, check ,round, selectedRopingId, setTeams, teamsForUpdate,setTeamsForUpdate, flag, setFlag }) => {
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
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => setMessageOpen(true)
  const handleMessageClose = () => setMessageOpen(false)
  const [message, setMessage] = useState('')
  const [selectedId, setSelectedId] = useState(false)
  const [times, setTimes] = useState({ time: null, total_time: null })
  const [legPenalty, setLegPenalty] = useState(false)
  const [barrierPenalty, setBarrierPenalty] = useState(false)

  useEffect(() => {
    console.log("UseEffect in GetTeams for round number ", round);
    // console.log('Teams in get Team', teams)
    const newTableIds = new Set(teamsForUpdate.map(team => team.team.id))
    const updatedTeams = teams.filter(team => !newTableIds.has(Number(team.id)))

    // Update the state
    setTeams(updatedTeams)
    console.log(updatedTeams)
  }, [teamsForUpdate,round, check])

  // useEffect(async () => {
  //   if (round > 1) {
  //     console.log('ENtrance')
  //     try {
  //       const response = await API.getAPICalling(`Team-Times/${selectedRopingId}/${round - 1}`)
  //       console.log(response)
  //       const newResponse = response.filter(item => item.current_time !== 0)
  //       console.log('Filtered Response:', newResponse)

  //       const filteredTeamIds = new Set(newResponse.map(item => Number(item.team.id)))
  //       console.log('Filtered Team IDs:', [...filteredTeamIds])
  //       console.log("Teams: ", teams);
  //       const updatedTeams = teams.filter(team => {
  //         const teamId = Number(team.id)
  //         const isIncluded = filteredTeamIds.has(teamId)
  //         console.log(`Checking team ID ${teamId}: ${isIncluded}`)
  //         return isIncluded
  //       })

  //       console.log('Hey ', updatedTeams)
  //     } catch (error) {
  //       console.log('Some error:  ', error)
  //       setTeams([])
  //     }
  //   }
  // }, [round])

  const handleAddInTableClicked = id => {
    setSelectedId(id)
    handleOpen()
  }

  const handleChange = e => {
    const { name, value } = e.target
    setTimes({
      time: Number(value),
      total_time: Number(value)
    })
  }

  const legChange = e => {
    setLegPenalty(e.target.checked)
    if (e.target.checked) {
      setTimes({
        time: times.time,
        total_time: times.total_time + 10
      })
    } else {
      setTimes({
        time: times.time,
        total_time: times.total_time - 10
      })
    }
  }

  const barrierChange = e => {
    setBarrierPenalty(e.target.checked)
    if (e.target.checked) {
      setTimes({
        time: times.time,
        total_time: times.total_time + 5
      })
    } else {
      setTimes({
        time: times.time,
        total_time: times.total_time - 5
      })
    }
  }

  const addTimeCalled = async () => {
    if (times.time === null) {
      // alert("please put some value first");
      setMessage('Time cannot be null. please enter a value')
      handleMessageOpen()
    } else {
      const data = {
        team_id: selectedId,
        roping_id: selectedRopingId,
        round_number: round,
        current_time: times.total_time,
        barrier_penalty: barrierPenalty ? 1 : 0,
        leg_penalty: legPenalty ? 1 : 0
      }
      try {
        const response = await API.postAPICalling('Team-Times/Add_Time', data)
        setMessage('Added Successfully')
        handleMessageOpen()
        setFlag(prev => !prev)
        const updatedState = teams.filter(team => team.id !== selectedId)
        setTeams(updatedState)
      } catch (error) {
        setMessage(error.message)
        handleMessageOpen()
        console.log(error)
      }
    }
    setTimes({
      time: null,
      total_time: null
    })
    setLegPenalty(false)
    setBarrierPenalty(false)
    handleClose()
  }

  return (
    <>
      <Card>
        <CardContent>
          <form>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 300 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Team No.</StyledTableCell>
                        <StyledTableCell align='center'>Header Name</StyledTableCell>
                        <StyledTableCell align='center'>Healer Name</StyledTableCell>
                        <StyledTableCell align='center'>Add Time</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teams.map((team, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component='th' scope='row'>
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align='center'>{team.header.name}</StyledTableCell>
                          <StyledTableCell align='center'>{team.healer.name}</StyledTableCell>
                          <StyledTableCell align='center'>
                            {' '}
                            <Button
                              type='button'
                              onClick={() => handleAddInTableClicked(team.id)}
                              variant='outlined'
                              size='medium'
                              sx={{ color: 'white' }}
                            >
                              ADD
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
          <Card>
            <CardHeader title='Add Team Time' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form>
                <Grid container spacing={5}>
                  <Grid item xs={6} sm={4}>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px' }}
                    >
                      Time Taken
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <TextField
                      required
                      fullWidth
                      type='number'
                      label='time'
                      name='time'
                      value={times.time && times.time}
                      onChange={handleChange}
                      inputProps={{ min: 0 }}
                      placeholder='00'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          inputProps={{ 'aria-label': 'checkbox' }}
                          checked={barrierPenalty}
                          onChange={barrierChange}
                        />
                      }
                      label='Barrier Penalty'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox inputProps={{ 'aria-label': 'checkbox' }} checked={legPenalty} onChange={legChange} />
                      }
                      label='Leg Penalty'
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px' }}
                    >
                      Total Time Taken
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <TextField
                      required
                      fullWidth
                      type='number'
                      name='total_time'
                      value={times.total_time && times.total_time}
                      placeholder='00'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type='button' onClick={addTimeCalled} variant='contained' size='medium'>
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      <Modal
        open={messageOpen}
        onClose={handleMessageClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-description' sx={{ mt: 2, mb: 3, fontSize: '20px' }}>
            {message}
          </Typography>
          <Button onClick={handleMessageClose} type='button' variant='contained' size='medium'>
            OK
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default GetTeams
