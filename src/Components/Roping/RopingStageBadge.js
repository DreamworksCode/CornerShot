import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import API from 'src/pages/api'

const stageConfig = {
  SETUP: { label: 'Setup', color: 'default' },
  NOT_STARTED: { label: 'Not Started', color: 'info' },
  IN_PROGRESS: { label: 'In Progress', color: 'warning' },
  COMPLETE: { label: 'Complete', color: 'success' }
}

// Shows a status chip for a roping (Setup / Not Started / In Progress / Complete)
// using GET /Reports/stage/:ropingId, instead of inferring the stage client-side.
const RopingStageBadge = ({ ropingId }) => {
  const [stage, setStage] = useState(null)

  useEffect(() => {
    if (!ropingId) {
      setStage(null)

      return
    }
    const token = localStorage.getItem('token')
    API.getAPICalling(`Reports/stage/${ropingId}`, token)
      .then(response => setStage(response.stage))
      .catch(error => {
        console.log('Some error:  ', error)
        setStage(null)
      })
  }, [ropingId])

  if (!stage || !stageConfig[stage]) {
    return null
  }

  const { label, color } = stageConfig[stage]

  return <Chip label={label} color={color} size='small' sx={{ ml: 2, fontWeight: 600 }} />
}

export default RopingStageBadge
