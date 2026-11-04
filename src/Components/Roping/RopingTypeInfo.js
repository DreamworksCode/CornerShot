// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'

const ropingFormats = [
  {
    name: 'Pick Only / Pick Your Partner',
    description: 'Ropers choose their partners and enter as teams.'
  },
  {
    name: 'Draw Pot',
    description: 'Ropers enter individually as headers or heelers; partners are drawn.'
  },
  {
    name: 'Pick & Draw',
    description:
      "Ropers pick some partners and receive additional drawn partners, according to the producer's rules."
  },
  {
    name: 'Pick or Draw',
    description: 'Ropers can enter with a chosen partner or request a drawn partner.'
  },
  {
    name: 'Round Robin',
    description: 'Each header ropes with every heeler in the designated group.'
  }
]

const RopingTypeInfo = () => {
  return (
    <Card>
      <CardHeader title='Roping Type Information' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        {ropingFormats.map(format => (
          <Accordion key={format.name}>
            <AccordionSummary expandIcon={<ChevronDown />}>
              <Typography sx={{ fontWeight: 600 }}>{format.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body2'>{format.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  )
}

export default RopingTypeInfo
