import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box, InputAdornment, InputLabel, MenuItem, Modal, TextField, Typography, useMediaQuery } from '@mui/material'
import API from 'src/pages/api'
import { AccountOutline, EmailOutline } from 'mdi-material-ui'
import router from 'next/router'
import { useTheme } from '@mui/material/styles';



const Production_Select_Form = ({ productions, setProductions }) => {
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
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [selectedId, setSelectedId] = useState(0)
  const [message, setMessage] = useState('')
  const [shoudlReload,setShouldReload]=useState(true);
  const [editableContent, setEditableContent] = useState({
    name: '',
    date: ''
  })
  useEffect(async () => {
    console.log(productions)
    const token = localStorage.getItem('token')
    // console.log(token);
    try {
      const response = await API.getAPICalling('production', token)
      console.log("Direct: ",response.data);
      // setProductions(response.data)
      setProductions(response.data)
      // console.log(productions);
    } catch (error) {
      console.log(' ', error)
    }
  }, [shoudlReload])

  const handleChange = event => {
    setSelected(event.target.value)
    productions.map(production => {
      // console.log(event.target.value);
      if (production.name === event.target.value) {
        setSelectedId(production.id)
        // console.log(production.id);
      }
    })
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    handleEditClose();
  }
  const handleEditOpen = () => {
    setEditOpen(true)
  }
  const handleEditClose = () => {
    setEditOpen(false)
  }

  const handleSubmit = e => {
    if (selected.trim('') === '') {
      e.preventDefault();
      setMessage('First Select a Production ')
      console.log("First select a production");
      handleOpen()
    } else {
      e.preventDefault();
      localStorage.setItem('production', selected)
      console.log("Selected id is: ",selectedId);;
      localStorage.setItem('productinoId',selectedId);
      setMessage('Production is selected successfully')
      handleOpen()
      setTimeout(() => {
        router.reload(window.location.pathname);
      }, 500);
    }
  }

  const handleEdit = async() => {
    if (selectedId === 0) {
      setMessage('Please pick an event first then edit it')
      handleOpen()
    } else {
      const token = localStorage.getItem('token')
      try {
        const response = await API.getAPICalling(`production/${selectedId}`, token);
        const formattedDate=await formatDate(response.data.date);
        setEditableContent({
          name:response.data.name,
          date:formattedDate
        })
        handleEditOpen();
      } catch (error) {
        setMessage(error.message);
        handleOpen();
      }
    }
    console.log(editableContent)


  }

  const formatDate = inputDate => {
    const date = new Date(inputDate)
    const day = date.getDate()
    const month = date.getMonth() + 1 // Months are zero-based
    const year = date.getFullYear()

    // Add leading zeros if needed
    const formattedDay = day < 10 ? '0' + day : day
    const formattedMonth = month < 10 ? '0' + month : month

    // return `${formattedDay}-${formattedMonth}-${year}`
    return `${year}-${formattedMonth}-${formattedDay}`

  }
  const handleEditChange = (e) => {
    setEditableContent({ ...editableContent, [e.target.name]: e.target.value })
  }


  const handleEditSubmit=async(e)=>{
    e.preventDefault();
    if(editableContent.name.trim('')===""){
      setMessage("Name shouldn't be empty");
      handleOpen();
    }
    else{
      const token=localStorage.getItem('token');
      try {
        const response=await API.putAPICalling(`production/${selectedId}`,editableContent,token);;
        setMessage("Updated Successfully");
        handleOpen();
        setShouldReload(prev=>!prev);
        console.log(response);
      } catch (error) {
        console.log(error);
        // router.push("/pages/login");
        setMessage(error.message);
        handleOpen();
        
      }
    }
  }

  // console.log(productions)
  return (
    <>
      <Card>
        <CardHeader title=' Select From Existing Production' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Production Name</InputLabel>
                  <Select
                    label='Production Name'
                    value={selected}
                    onChange={handleChange}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    {productions.map((production, index) => (
                      <MenuItem value={production.name} key={index}>
                        {production.name}
                      </MenuItem>
                    ))}
                    {/* <MenuItem value='UK'>DreamWorks Event</MenuItem>
                  <MenuItem value='USA'>Citronics Event</MenuItem>
                  <MenuItem value='Australia'>Aarambh Event</MenuItem>
                  <MenuItem value='Germany'>Manthan Event</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button type='submit' variant='contained' size='large'>
                  select
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button type='button' onClick={handleEdit} variant='contained' size='large'>
                  Edit
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
          <Typography id='modal-modal-description' sx={{ mt: 2, mb: 3, fontSize: '20px' }}>
            {message}
          </Typography>
          <Button onClick={handleClose} type='button' variant='contained' size='medium'>
            OK
          </Button>
        </Box>
      </Modal>

      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card>
            <CardHeader title='Add New Production' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={handleEditSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Production Name'
                      value={editableContent.name}
                      name='name'
                      onChange={handleEditChange}
                      placeholder='Production 1'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type='date'
                      value={editableContent.date}
                      name="date"
                      onChange={handleEditChange}
                      label='Event Date'
                      onfocus="(this.type='date')"
                      placeholder={editableContent.date}
                      // helperText='You can use letters, numbers & periods'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <EmailOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' size='large'>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  )
}

export default Production_Select_Form
