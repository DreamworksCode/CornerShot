// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'
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
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const ropingTypeToTeamType = type => {
  switch (type) {
    case 'Draw Pot':
      return 'Draw_Pot'
    case 'Round Robin':
      return 'Round_Robin'
    case 'Pick Only':
      return 'Pick_Only'
    case 'Pick or Draw':
      return 'Pick_Or_Draw'
    case 'Pick & Draw':
      return 'Pick_And_Draw'
    default:
      return 'Draw_Pot'
  }
}

const RunRoping = ({ roping, selectedRopingId }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 700,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: 600
  }

  const [round, setRound] = useState(1)
  const [arrangeMode, setArrangeMode] = useState('FIRST_IN_FIRST_ROPE')
  const [runRopingData, setRunRopingData] = useState(null)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [payoutComplete, setPayoutComplete] = useState(false)

  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => setMessageOpen(true)
  const handleMessageClose = () => setMessageOpen(false)

  const [timeOpen, setTimeOpen] = useState(false)
  const handleTimeOpen = () => setTimeOpen(true)
  const handleTimeClose = () => setTimeOpen(false)
  const [time, setTime] = useState(null)
  const [barrierPenalty, setBarrierPenalty] = useState(false)
  const [legPenalty, setLegPenalty] = useState(false)
  const [isNoTime, setIsNoTime] = useState(false)

  useEffect(async () => {
    if (!selectedRopingId) {
      return
    }
    try {
      const token = localStorage.getItem('token')
      const response = await API.getAPICalling(`Reports/run-roping/${selectedRopingId}/${round}`, token)
      setRunRopingData(response)
    } catch (error) {
      console.log('Some error:  ', error)
      setRunRopingData(null)
    }
  }, [selectedRopingId, round, refreshFlag])

  useEffect(async () => {
    if (!selectedRopingId) {
      return
    }
    const token = localStorage.getItem('token')
    try {
      const response = await API.getAPICalling(`Reports/financial-summary/${selectedRopingId}`, token)
      setPayoutComplete(response.payoutStatus === 'COMPLETE')
    } catch (error) {
      setPayoutComplete(false)
    }
  }, [selectedRopingId, refreshFlag])

  const handleRoundChange = e => {
    setRound(Number(e.target.value))
  }

  const handleArrangeTeams = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await API.postAPICalling(
        'Teams/ArrangeTeams',
        {
          ropingId: selectedRopingId,
          roping_team_type: ropingTypeToTeamType(roping.type),
          mode: arrangeMode
        },
        token
      )
      setMessage(response.message)
      handleMessageOpen()
      setRefreshFlag(prev => !prev)
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const handleAddTimeClick = () => {
    setTime(null)
    setBarrierPenalty(false)
    setLegPenalty(false)
    setIsNoTime(false)
    handleTimeOpen()
  }

  const handleTimeChange = e => {
    const { value } = e.target
    setTime(value === '' ? null : Number(value))
  }

  const handleSubmitTime = async () => {
    if (time === null && !isNoTime) {
      setMessage('Time cannot be null. please enter a value')
      handleMessageOpen()

      return
    }
    try {
      const token = localStorage.getItem('token')
      const response = await API.postAPICalling(
        'Team-Times/Add_Time',
        {
          team_id: runRopingData.currentTeam.teamId,
          roping_id: selectedRopingId,
          round_number: round,
          raw_time: isNoTime ? 0 : time,
          broke_barrier: barrierPenalty,
          caught_one_leg: legPenalty,
          is_no_time: isNoTime
        },
        token
      )
      setMessage(response.message)
      handleMessageOpen()
      handleTimeClose()
      setRefreshFlag(prev => !prev)
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Arrange Teams' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='arrange-mode-label'>Running Order</InputLabel>
                <Select
                  label='Running Order'
                  value={arrangeMode}
                  onChange={e => setArrangeMode(e.target.value)}
                  id='arrange-mode'
                  labelId='arrange-mode-label'
                >
                  <MenuItem value='FIRST_IN_FIRST_ROPE'>First In, First Rope</MenuItem>
                  <MenuItem value='FIRST_IN_LAST_ROPE'>First In, Last Rope</MenuItem>
                  <MenuItem value='RANDOM'>Random</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={handleArrangeTeams} type='button' variant='contained' size='medium'>
                Arrange Teams
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
                Only works before the roping has started. Once a time has been recorded, this is locked for the
                rest of this roping.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 5 }}>
        <CardHeader title='Run Roping' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, paddingTop: '15px' }}>
                Round #
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                value={round}
                onChange={handleRoundChange}
                inputProps={{ min: 1, max: roping.num_rounds }}
              />
            </Grid>

            {payoutComplete && (
              <Grid item xs={12}>
                <Typography variant='body2' color='error' sx={{ fontWeight: 600 }}>
                  This roping's payout has been marked complete — time entry is disabled.
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '18px', marginTop: '10px' }}>
                You&apos;re Up
              </Typography>
              {runRopingData && runRopingData.currentTeam ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                  <Typography variant='h6'>
                    Team {runRopingData.currentTeam.teamNumber}: {runRopingData.currentTeam.header} /{' '}
                    {runRopingData.currentTeam.healer}
                  </Typography>
                  <Button onClick={handleAddTimeClick} type='button' variant='contained' size='medium' disabled={payoutComplete}>
                    Add Time
                  </Button>
                </Box>
              ) : (
                <Typography sx={{ mt: 1 }}>
                  {runRopingData ? 'No team currently up for this round.' : 'Select a round to begin.'}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '16px', marginTop: '10px' }}>
                On Deck
              </Typography>
              {runRopingData && runRopingData.nextTeams && runRopingData.nextTeams.length > 0 ? (
                runRopingData.nextTeams.map((team, index) => (
                  <Typography key={index}>
                    Team {team.teamNumber}: {team.header} / {team.healer}
                  </Typography>
                ))
              ) : (
                <Typography>—</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '18px', marginTop: '20px' }}>
                Standings
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table sx={{ minWidth: 500 }} aria-label='standings table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>Header</StyledTableCell>
                      <StyledTableCell align='center'>Heeler</StyledTableCell>
                      <StyledTableCell align='center'>Status</StyledTableCell>
                      <StyledTableCell align='center'>Round</StyledTableCell>
                      <StyledTableCell align='center'>Total Time</StyledTableCell>
                      <StyledTableCell align='center'>Barrier Penalty</StyledTableCell>
                      <StyledTableCell align='center'>Leg Penalty</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {runRopingData &&
                      runRopingData.standings.map((team, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align='center'>{team.header}</StyledTableCell>
                          <StyledTableCell align='center'>{team.healer}</StyledTableCell>
                          <StyledTableCell align='center' sx={{ color: team.status === 'Eliminated' ? 'red' : 'inherit' }}>
                            {team.status}
                          </StyledTableCell>
                          <StyledTableCell align='center'>{team.roundNumber ?? '-'}</StyledTableCell>
                          <StyledTableCell align='center'>{formatTime(team.totalTime)}</StyledTableCell>
                          <StyledTableCell align='center'>{team.barrierPenalty ? 'Yes' : team.barrierPenalty === null ? '-' : 'No'}</StyledTableCell>
                          <StyledTableCell align='center'>{team.legPenalty ? 'Yes' : team.legPenalty === null ? '-' : 'No'}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Modal open={timeOpen} onClose={handleTimeClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Card>
            <CardHeader title='Add Team Time' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={6} sm={4}>
                  <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px' }}>
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
                    value={time && time}
                    onChange={handleTimeChange}
                    inputProps={{ min: 0 }}
                    placeholder='00'
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputProps={{ 'aria-label': 'checkbox' }}
                        checked={barrierPenalty}
                        onChange={e => setBarrierPenalty(e.target.checked)}
                      />
                    }
                    label='Barrier Penalty'
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputProps={{ 'aria-label': 'checkbox' }}
                        checked={legPenalty}
                        onChange={e => setLegPenalty(e.target.checked)}
                      />
                    }
                    label='Leg Penalty'
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputProps={{ 'aria-label': 'checkbox' }}
                        checked={isNoTime}
                        onChange={e => setIsNoTime(e.target.checked)}
                      />
                    }
                    label='No Time (NT)'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleSubmitTime} type='button' variant='contained' size='medium'>
                    Save &amp; Advance
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      <Modal open={messageOpen} onClose={handleMessageClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
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

export default RunRoping
