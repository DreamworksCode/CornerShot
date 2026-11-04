import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CheckCircle from 'mdi-material-ui/CheckCircle'
import CircleOutline from 'mdi-material-ui/CircleOutline'
import API from 'src/pages/api'

const stageColor = (stages, currentStage) => {
  if (stages.every(s => s.complete)) {
    return 'success'
  }
  if (currentStage === 'Run' || currentStage === 'Payoff') {
    return 'warning'
  }
  if (currentStage === 'Entries' || currentStage === 'Arrange Teams') {
    return 'info'
  }

  return 'default'
}

// Shows the 5-stage workflow status for a roping (Setup -> Entries -> Arrange Teams -> Run -> Payoff)
// using GET /Reports/stage/:ropingId. Click the chip to see what's missing for each stage.
const RopingStageBadge = ({ ropingId }) => {
  const [data, setData] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    if (!ropingId) {
      setData(null)

      return
    }
    const token = localStorage.getItem('token')
    API.getAPICalling(`Reports/stage/${ropingId}`, token)
      .then(response => setData(response))
      .catch(error => {
        console.log('Some error:  ', error)
        setData(null)
      })
  }, [ropingId])

  if (!data || !data.stages) {
    return null
  }

  const allComplete = data.stages.every(s => s.complete)
  const label = allComplete ? 'Complete' : data.currentStage

  return (
    <>
      <Chip
        label={label}
        color={stageColor(data.stages, data.currentStage)}
        size='small'
        onClick={e => setAnchorEl(e.currentTarget)}
        sx={{ ml: 2, fontWeight: 600, cursor: 'pointer' }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: 360 }}>
          <Typography variant='body2' sx={{ fontWeight: 700, mb: 1 }}>
            {data.nextAction}
          </Typography>
          <List dense disablePadding>
            {data.stages.map(stage => (
              <ListItem key={stage.name} alignItems='flex-start' disableGutters>
                <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                  {stage.complete ? (
                    <CheckCircle color='success' fontSize='small' />
                  ) : (
                    <CircleOutline color='disabled' fontSize='small' />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={stage.name}
                  secondary={
                    stage.missing && stage.missing.length > 0 ? stage.missing.join('; ') : null
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  )
}

export default RopingStageBadge
