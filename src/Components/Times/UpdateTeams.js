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
import React, { useState } from 'react'
import API from 'src/pages/api'
import formatTime from 'src/utils/formatTime'

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

const UpdateTeams = ({ teamsForUpdate, leg, barrier, setFlag, payoutComplete }) => {
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedId,setSelectedId]=useState(false);
  const [version, setVersion] = useState(null)
  const [times,setTimes]=useState({time:null});
  const [legPenalty,setLegPenalty]=useState(false);
  const [barrierPenalty,setBarrierPenalty]=useState(false);
  const [isNoTime,setIsNoTime]=useState(false);

  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => setMessageOpen(true)
  const handleMessageClose = () => setMessageOpen(false)

  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyData, setHistoryData] = useState([])
  const handleHistoryClose = () => setHistoryOpen(false)




  const handleUpdateInTableClicked=(id)=>{
    const selectedObject=teamsForUpdate.filter(team=>team.id===id);
    console.log("HELLO ",selectedObject);
    setTimes({
      time: selectedObject[0].raw_time
    });
    setLegPenalty(!!selectedObject[0].leg_penalty)
    setBarrierPenalty(!!selectedObject[0].barrier_penalty)
    setIsNoTime(!!selectedObject[0].is_no_time)
    setSelectedId(id);
    setVersion(selectedObject[0].version)
    handleOpen();
  }

  const handleViewHistory = async id => {
    const token = localStorage.getItem('token')
    try {
      const response = await API.getAPICalling(`Team-Times/corrections/${id}`, token)
      setHistoryData(response)
      setHistoryOpen(true)
    } catch (error) {
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setTimes({
      time:Number(value)
    })

  }

  const legChange=(e)=>{
    setLegPenalty(e.target.checked);
  }

  const barrierChange=(e)=>{
    setBarrierPenalty(e.target.checked)
  }

  const noTimeChange=(e)=>{
    setIsNoTime(e.target.checked)
  }

  const addTimeCalled=async ()=>{
    if(times.time===null && !isNoTime){
      setMessage('please put some value first')
      handleMessageOpen()
    }
    else{
      const data={
        version,
        raw_time: isNoTime ? 0 : times.time,
        broke_barrier: barrierPenalty,
        caught_one_leg: legPenalty,
        is_no_time: isNoTime
      }
      const token = localStorage.getItem('token')
      try {
        const response=await API.putAPICalling(`Team-Times/update-time/${selectedId}`,data, token);
        setMessage('Time updated successfully')
        handleMessageOpen()
        setFlag(prev=>!prev);
      } catch (error) {
        // covers both a stale version (someone else already changed this record) and a
        // payout-complete lock - either way, re-fetch so the list reflects current reality
        // instead of silently resending stale data
        console.log(error);
        setMessage(error.message)
        handleMessageOpen()
        setFlag(prev => !prev)
      }
    }
    setTimes({
      time:null
    });
    setLegPenalty(false);
    setBarrierPenalty(false);
    setIsNoTime(false);
    handleClose();
  }

  return (
    <>
      <Card>
        <CardContent>
          {payoutComplete && (
            <Typography variant='body2' color='error' sx={{ fontWeight: 600, mb: 2 }}>
              This roping's payout has been marked complete — corrections are disabled.
            </Typography>
          )}
          <form>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 300 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Team No.</StyledTableCell>
                        <StyledTableCell align='center'>Header Name</StyledTableCell>
                        <StyledTableCell align='center'>Heeler Name</StyledTableCell>
                        <StyledTableCell align='center'>Time</StyledTableCell>
                        <StyledTableCell align='center'>Update Time</StyledTableCell>
                        <StyledTableCell align='center'>History</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teamsForUpdate.map((team, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component='th' scope='row'>
                            {team.team.team_number !== undefined && team.team.team_number !== null
                              ? team.team.team_number
                              : index + 1}
                          </StyledTableCell>
                          <StyledTableCell align='center'>{team.team.header.name}</StyledTableCell>
                          <StyledTableCell align='center'>{team.team.healer.name}</StyledTableCell>
                          <StyledTableCell align='center'>{formatTime(team.current_time)}</StyledTableCell>
                          <StyledTableCell align='center'>
                            {' '}
                            <Button
                              type='button'
                              onClick={()=>handleUpdateInTableClicked(team.id)}
                              variant='outlined'
                              size='medium'
                              sx={{ color: 'white' }}
                              disabled={payoutComplete}
                            >
                              Update
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <Button
                              type='button'
                              onClick={() => handleViewHistory(team.id)}
                              variant='text'
                              size='small'
                            >
                              View
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
                  <Grid item xs={12} sm={6} sx={{textAlign:"center"}}>
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
                  <Grid item xs={12} sm={6} sx={{textAlign:"center"}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          inputProps={{ 'aria-label': 'checkbox' }}
                          checked={legPenalty}
                          onChange={legChange}
                        />
                      }
                      label='Leg Penalty'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{textAlign:"center"}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          inputProps={{ 'aria-label': 'checkbox' }}
                          checked={isNoTime}
                          onChange={noTimeChange}
                        />
                      }
                      label='No Time (NT)'
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
        open={historyOpen}
        onClose={handleHistoryClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Correction History
          </Typography>
          {historyData.length === 0 && <Typography variant='body2'>No corrections recorded for this time.</Typography>}
          {historyData.map(entry => (
            <Box key={entry.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {entry.correctedBy ? entry.correctedBy.email : 'Unknown user'} — {new Date(entry.created_at).toLocaleString()}
              </Typography>
              <Typography variant='body2'>
                Time: {formatTime(entry.before.raw_time)} → {formatTime(entry.after.raw_time)}
              </Typography>
              <Typography variant='body2'>
                Round: {entry.before.round_number} → {entry.after.round_number}
              </Typography>
              <Typography variant='body2'>
                Barrier Penalty: {entry.before.barrier_penalty ? 'Yes' : 'No'} → {entry.after.barrier_penalty ? 'Yes' : 'No'}
              </Typography>
              <Typography variant='body2'>
                Leg Penalty: {entry.before.leg_penalty ? 'Yes' : 'No'} → {entry.after.leg_penalty ? 'Yes' : 'No'}
              </Typography>
              <Typography variant='body2'>
                No Time: {entry.before.is_no_time ? 'Yes' : 'No'} → {entry.after.is_no_time ? 'Yes' : 'No'}
              </Typography>
            </Box>
          ))}
          <Button onClick={handleHistoryClose} type='button' variant='contained' size='medium'>
            Close
          </Button>
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

export default UpdateTeams
