// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery
} from '@mui/material'
import { useEffect, useState } from 'react'
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles';
import ContestantAutocomplete from 'src/Components/Contestant/ContestantAutocomplete';

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

const Add_contestant = ({ selectedRopingId,flag, setFlag }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
  const [drawEntries,setDrawEntries]=useState([]);
  const [selectedContestant, setSelectedContestant] = useState(null)
  const [ratingsSaved, setRatingsSaved] = useState(false)
  const [entry, setEntry] = useState({ header: 1, healer: 0 })
  const [message, setMessage] =useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(()=>{
    console.log("This useEffect is in addContestant page and the roping id which we are getting is : ", selectedRopingId);
  },[selectedRopingId]);

  useEffect(async ()=>{
    try {
      const response = await API.getAPICalling(`draw-entries/getDraw/${selectedRopingId}`,)
      console.log(response)
      setDrawEntries(response)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  },[flag,selectedRopingId])

  const handleChange = e => {
    // console.log(e.target.name)
    if(e.target.name==="checkbox"){
      const item = e.target.value
    if (item === 'heading') {
      setEntry({
        header: 1,
        healer: 0
      })
    } else {
      setEntry({
        header: 0,
        healer: 1
      })
    }
    }else {
      const { name, value } = e.target;
    setSelectedContestant({
      ...selectedContestant,
      [name]: value === '' ? null : Number(value),
    });
    setRatingsSaved(false)
    }
  }



  const handleAddButtonClick=async ()=>{
    if(!selectedContestant || selectedContestant.header_rating===null || selectedContestant.healer_rating===null){
      setMessage("please fill out the required fields first");
      handleMessageOpen();
    }
    else{
      const data={
        header_rating:selectedContestant.header_rating,
        healer_rating:selectedContestant.healer_rating,
        header_entries:entry.header,
        healer_entries:entry.healer,
        roping_id:selectedRopingId,
        contestant_id:selectedContestant.id
      }
      console.log(data);
      try {
        const response = await API.postAPICalling('draw-entries/AddDrawEntry', data)
        console.log(response)
        // if(response.message==="Error creating Draw"){
          // }
          // else{
            //   setMessage("Added Successfully");
            // }
          setMessage(response.message)
        handleMessageOpen();
        setFlag(prev=>!prev);
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message);
        handleMessageOpen();
      }

    }
  }

  const handleDeleteButtonClick=async()=>{
    if(!selectedContestant || selectedContestant.header_rating===null || selectedContestant.healer_rating===null){
      setMessage("Please select a contestant first");
      handleMessageOpen();
    }
    else{
      const data={
        roping_id:selectedRopingId
        // roping_id:34
      }
      console.log("id: ", selectedContestant.id, " roping_id: ", selectedRopingId);
      const id=selectedContestant.id;
      try {
        const response = await API.deleteAPIWithoutToken(`draw-entries/deleteDraw/${id}`, data)
        console.log(response)
        // if(response.message==="Draw entry can not be deleted")
        // {
        //   setMessage("Cannot Delete This item");;
        // }
        // else{
        //   setMessage("Deleted Successfully");
        // }
          setMessage(response.message)
        setFlag(prev=>!prev);
        handleMessageOpen();
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message);
        handleMessageOpen();
      }
    }
  }


  const handleUpdateButtonClick=async (e)=>{
    if(!selectedContestant || selectedContestant.header_rating===null || selectedContestant.healer_rating===null){
      setMessage("Please select a contestant first");
      handleMessageOpen();
    }
    else{
      const data={
        roping_id:selectedRopingId,
        header_rating:selectedContestant.header_rating,
        healer_rating:selectedContestant.healer_rating,
        header_entries: entry.header,
        healer_entries: entry.healer
      }
      // console.log("id: ", selectedContestant.id, " roping_id: ", selectedRopingId);
      const id=selectedContestant.id;
      try {
        const response = await API.putAPICalling(`draw-entries/updateDraw/${id}`, data)
        console.log(response)
        // setMessage("Contestant Updated Successfully");
        // if(response.message==="Error updating draw entries and contestant")
        // {
        //   setMessage("Error Updating Draw");;
        // }
        // else{
        //   setMessage("Contestant Updated Successfully");
        // }
        setMessage(response.message)
        setFlag(prev=>!prev);
        handleMessageOpen();
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error.message);
        handleMessageOpen();
      }
    }
  }


  // useEffect(()=>{
  //   console.log(entry);
  // },[entry]);

  return (
    <>
    <Card>
      <CardHeader title='Enter Draw' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault()
            handleAddButtonClick()
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={6} sm={3}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'end', paddingTop: '15px' }}
              >
                Contestant Name
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <ContestantAutocomplete
                label='Contestant'
                value={selectedContestant}
                onSelect={contestant => {
                  setSelectedContestant(contestant)
                  setRatingsSaved(false)
                }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                Header Rating
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                onChange={handleChange}inputProps={{ min: 0 }}
                name='header_rating'
                required
                disabled={!selectedContestant}
                value={selectedContestant && selectedContestant.header_rating !== null ? selectedContestant.header_rating : ''}
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='heading'
                  value={entry.header === 1 ? 'heading' : 'heeling'}
                  onChange={handleChange}
                  name='checkbox'
                >
                  <FormControlLabel value='heading' control={<Radio />} label='Heading' />
                  <FormControlLabel value='heeling' control={<Radio />} label='Heeling' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                Heeler Rating
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                onChange={handleChange}inputProps={{ min: 0 }}
                type='number'
                required
                disabled={!selectedContestant}
                value={selectedContestant && selectedContestant.healer_rating !== null ? selectedContestant.healer_rating : ''}
                name='healer_rating'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>

            <Grid item xs={12}>
              <FormHelperText id='form-layouts-basic-password-helper'>
                * Add aditional draw entries to existing entry count
              </FormHelperText>
            </Grid>
            {selectedContestant && selectedContestant.header_rating !== null && selectedContestant.healer_rating !== null && !ratingsSaved && (
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
                  onClick={() =>
                    API.putAPICalling(`contestant/${selectedContestant.id}`, {
                      header_rating: selectedContestant.header_rating,
                      healer_rating: selectedContestant.healer_rating
                    })
                      .then(() => {
                        setRatingsSaved(true)
                        setMessage('Ratings saved to profile')
                        handleMessageOpen()
                      })
                      .catch(error => {
                        setMessage(error.message)
                        handleMessageOpen()
                      })
                  }
                  type='button'
                  variant='outlined'
                  size='small'
                >
                  Save ratings to profile
                </Button>
              </Grid>
            )}
            <Grid item xs={12} sm={3}>
              <Button type='submit' variant='contained' size='medium'>
                Add To Draw
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button onClick={handleUpdateButtonClick} type='button' variant='contained' size='medium'>
                Update Draw
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button onClick={handleDeleteButtonClick} type='button' variant='contained' size='medium'>
                Remove from Draw
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button onClick={handleOpen} type='button' variant='contained' size='medium'>
                List Draw Entries
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
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
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='center'>Header Rating</StyledTableCell>
              <StyledTableCell align='center'>Heeler Rating </StyledTableCell>
              <StyledTableCell align='center'>Header Entries </StyledTableCell>
              <StyledTableCell align='center'>Heeler Entries </StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {drawEntries.map((draw, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component='th' scope='row' align='center'>
                  {draw.contestant.name}
                </StyledTableCell>
                <StyledTableCell align='center'>{draw.header_rating === null || draw.header_rating === undefined ? 'Not set' : draw.header_rating}</StyledTableCell>
                <StyledTableCell align='center'>{draw.healer_rating === null || draw.healer_rating === undefined ? 'Not set' : draw.healer_rating}</StyledTableCell>
                <StyledTableCell align='center'>{draw.header_entries}</StyledTableCell>
                <StyledTableCell align='center'>{draw.healer_entries}</StyledTableCell>
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

export default Add_contestant
