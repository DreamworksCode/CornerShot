// ** MUI Imports
import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Modal, Typography } from '@mui/material'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { FormControl, FormHelperText, InputLabel, MenuItem } from '@mui/material'
import Select from '@mui/material/Select'

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

const createData = (name, heeler, header) => {
  return { name, heeler, header }
}

const rows = [
  createData('Steve Smith', 3, 7),
  createData('David Warner', 4, 4),
  createData('Pat Cummins', 3, 4),
  createData('Jake Fraser McGurk', 2, 6),
  createData('Aaron Finch', 6, 13),
  createData('Travis Head', 5, 5)
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY:"auto",
  maxHeight:600
}

const BaseTable = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [DeleteOpen, setDeleteOpen] = React.useState(false)
  const handleDeleteOpen = () => setDeleteOpen(true)
  const handleDeleteClose = () => setDeleteOpen(false)
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align='center'>Heeler Rating</StyledTableCell>
              <StyledTableCell align='center'>Header Rating</StyledTableCell>
              <StyledTableCell align='center'>Update</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component='th' scope='row'>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align='center'>{row.heeler}</StyledTableCell>
                <StyledTableCell align='center'>{row.header}</StyledTableCell>
                <StyledTableCell sx={{ cursor: 'pointer' }} onClick={handleOpen} align='center'>
                  <EditIcon />
                </StyledTableCell>
                <StyledTableCell onClick={handleDeleteOpen} align='center' sx={{ color: 'red', cursor: 'pointer' }}>
                  <DeleteIcon />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Card>
              <CardHeader title='Update Contestant Information' titleTypographyProps={{ variant: 'h6' }} />
              <CardContent>
                <form onSubmit={e => e.preventDefault()}>
                  <Grid container spacing={5}>
                    <Grid item xs={2} sm={2}>
                      <Typography
                        variant='body2'
                        sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px' }}
                      >
                        Name
                      </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9}>
                      <TextField fullWidth type='text' label='Name' placeholder='Name' />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <Typography
                        variant='body2'
                        sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px' }}
                      >
                        Address
                      </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9}>
                      <TextField fullWidth type='text' label='Address' placeholder='North of the kingdom, winterfell' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        City:
                      </Typography>
                      <TextField fullWidth type='text' label='City' placeholder='City Name' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        State:
                      </Typography>
                      <TextField fullWidth type='text' label='State' placeholder='State Name' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Zip
                      </Typography>
                      <TextField fullWidth type='text' label='Zip' placeholder='Zip Code' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Phone:
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        // label='City'
                        placeholder='123-456-7890'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Cell:
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        // label='State'
                        placeholder='123-456-7890'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Email:
                      </Typography>
                      <TextField
                        fullWidth
                        type='email'
                        // label='Email'
                        placeholder='123@example.com'
                      />
                    </Grid>

                    {/* <Grid item xs={6} sm={4}>
                      <Button onClick={handleClose} type='submit' variant='contained' size='medium'>
                        Update
                      </Button>
                    </Grid> */}
                  </Grid>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title='Card/Rating Information' titleTypographyProps={{ variant: 'h6' }} />
              <CardContent>
                <form onSubmit={e => e.preventDefault()}>
                  <Grid container spacing={5}>
                    <Grid item xs={3} sm={2}>
                      <Typography
                        variant='body2'
                        sx={{ fontWeight: 600, fontSize: '16px', textAlign: 'center', paddingTop: '15px' }}
                      >
                        Card Number
                      </Typography>
                    </Grid>
                    <Grid item xs={9} sm={10}>
                      <TextField fullWidth type='number' label='Number' placeholder='Card Number' />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center', paddingTop: '15px' }}>
                        Header rating:
                      </Typography>
                    </Grid>
                    <Grid item xs={9} sm={4}>
                      <TextField
                        fullWidth
                        type='number'
                        // label='City'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center', paddingTop: '15px' }}>
                        Heeler rating:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        fullWidth
                        type='number'
                        // label='City'
                        placeholder='00'
                      />
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <Button onClick={handleClose} type='submit' variant='contained' size='medium'>
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Modal>

        <Modal
          open={DeleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Are you sure?
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2, mb:3 }}>
              Do you really want to delete this contestant
            </Typography>
            <Button onClick={handleDeleteClose} type='button' variant='contained' size='medium'>
              Delete
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default BaseTable
