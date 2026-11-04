import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import API from 'src/pages/api'

const CopyRoping = ({ handleCheck, check }) => {
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

  const [ropingList, setRopingList] = useState([])
  const [payoffList, setPayoffList] = useState([])
  const [sourceRopingId, setSourceRopingId] = useState('')
  const [sourcePayoffId, setSourcePayoffId] = useState('')
  const [newName, setNewName] = useState('')

  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => setMessageOpen(true)
  const handleMessageClose = () => setMessageOpen(false)

  useEffect(async () => {
    const productionId = localStorage.getItem('productinoId')
    try {
      const response = await API.getAPICalling(`ropings/getnames/${productionId}`)
      setRopingList(response)
    } catch (error) {
      console.log('Some error:  ', error)
    }
    try {
      const response = await API.getAPICalling(`payoffs/get?production_id=${productionId}`)
      setPayoffList(response)
    } catch (error) {
      // no payoffs on this production yet - fine, the payoff picker just stays empty
      setPayoffList([])
    }
  }, [check])

  const handleCopy = async () => {
    if (!sourceRopingId) {
      setMessage('Please pick a roping to copy first')
      handleMessageOpen()

      return
    }
    const data = {
      sourceRopingId
    }
    if (sourcePayoffId) {
      data.sourcePayoffId = sourcePayoffId
    }
    if (newName.trim() !== '') {
      data.newName = newName.trim()
    }
    const token = localStorage.getItem('token')
    try {
      const response = await API.postAPICalling('ropings/copy', data, token)
      setMessage(
        `${response.message}. The copy has no teams or times yet - add teams and arrange them before running it.`
      )
      handleMessageOpen()
      setSourceRopingId('')
      setSourcePayoffId('')
      setNewName('')
      handleCheck()
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Copy a Roping' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='copy-source-roping-label'>Roping to copy</InputLabel>
                <Select
                  label='Roping to copy'
                  value={sourceRopingId}
                  onChange={e => setSourceRopingId(e.target.value)}
                  id='copy-source-roping'
                  labelId='copy-source-roping-label'
                >
                  {ropingList.map(roping => (
                    <MenuItem key={roping.id} value={roping.id}>
                      {roping.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={payoffList.length === 0}>
                <InputLabel id='copy-source-payoff-label'>Payoff to copy (optional)</InputLabel>
                <Select
                  label='Payoff to copy (optional)'
                  value={sourcePayoffId}
                  onChange={e => setSourcePayoffId(e.target.value)}
                  id='copy-source-payoff'
                  labelId='copy-source-payoff-label'
                >
                  <MenuItem value=''>None</MenuItem>
                  {payoffList.map(entry => (
                    <MenuItem key={entry.payoff.id} value={entry.payoff.id}>
                      {entry.payoff.payoff_name}
                    </MenuItem>
                  ))}
                </Select>
                {payoffList.length === 0 && (
                  <FormHelperText>No payoffs on this production yet</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='New roping name (optional)'
                placeholder='Defaults to "<source name> (Copy)"'
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleCopy} type='button' variant='contained' size='large'>
                Copy Roping
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Modal open={messageOpen} onClose={handleMessageClose} aria-labelledby='modal-modal-title'>
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

export default CopyRoping
