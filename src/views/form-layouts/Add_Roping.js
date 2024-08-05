import * as React from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
// import InputAdornment from '@mui/material/InputAdornment'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  useMediaQuery
} from '@mui/material'
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles';
 
// // ** Icons Imports
// import Phone from 'mdi-material-ui/Phone'
// import EmailOutline from 'mdi-material-ui/EmailOutline'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import MessageOutline from 'mdi-material-ui/MessageOutline'



const Add_Roping = ({handleCheck}) => {
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
  const [draw, setDraw] = React.useState(false)
  const [disabled,setDisabled]=React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)
  // const [values,setValues]=React.useState({name:""})
  const [roping, setRoping] = React.useState({
    name: '',
    type: '',
    draw_count: null,
    max_entries_per_roper: null,
    num_rounds: null
  })
  const [ropingRules, setRopingRules] = React.useState({
    progressive_after_round: null,
    barrier_penalty: null,
    leg_penalty: null,
    classification: null
  })
  const [ropingFinancials, setRopingFinancials] = React.useState({
    entry_fees: null,
    stock_charge_percent: null,
    association_fees: null,
    price_deduction: null,
    added_money: null
  })
  const [ropingClassification, setRopingClassification] = React.useState({
    round_to_handicap: null,
    amount_to_handicap: null,
    handicap_down_amount: null,
    handicap_up_amount: null
  })
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [message, setMessage] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  const handleRopingChange = e => {
    setRoping({ ...roping, [e.target.name]: e.target.value })
    if (e.target.name === 'type') {
      if (e.target.value === 'Pick & Draw') {
        console.log("Selected item is 'Pick Only'")
        setDraw(true)
        setDisabled(false);
        // Add your logic here for when "Pick Only" is selected
      } else if(e.target.value==='Round Robin') {
        setDisabled(true);
        setDraw(false);
      }
      else{
        setDraw(false)
        setDisabled(false);
      }
    }
  }

  const handleRopingFinancialsChange=e=>{
    setRopingFinancials({...ropingFinancials,[e.target.name]:e.target.value})
  }

  const handleRopingRulesChange=e=>{
    setRopingRules({...ropingRules,[e.target.name]:e.target.value})
  }

  const handleRopingClassificationChange=e=>{
    setRopingClassification({...ropingClassification,[e.target.name]:e.target.value})
  }

  const handleAddClick = e => {
    e.preventDefault()
    if (roping.name.trim('') === '') {
      setMessage('Please Enter the Roping Name')
      handleMessageOpen()
    } else {
      handleOpen()
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const productionId=localStorage.getItem('productinoId');
    const withoutClassificationData={
      productionId,
      roping,
      ropingRules,
      ropingFinancials,
    }
    const withClassificationData={
      productionId,
      roping,
      ropingRules,
      ropingFinancials,
      ropingClassification
    }
    setRoping({name: '',
    type: '',
    draw_count: null,
    max_entries_per_roper: null,
    num_rounds: null}
    )

    setRopingRules({progressive_after_round: null,
      barrier_penalty: null,
      leg_penalty: null,
      classification: null}
    );

    setRopingFinancials({
      entry_fees: null,
      stock_charge_percent: null,
      association_fees: null,
      price_deduction: null,
      added_money: null  
    })

    setRopingClassification({
      round_to_handicap: null,
    amount_to_handicap: null,
    handicap_down_amount: null,
    handicap_up_amount: null
    })

    setDisabled(false);

    // setRoping

    const data=isChecked?withClassificationData:withoutClassificationData;
    // setMessage("GHeyyy");
    // handleMessageOpen();
    try {
      const response = await API.postAPICalling('ropings/create', data)
      console.log(response)
      setMessage("Roping Added Successfully");
      handleCheck();
      handleClose();
      handleMessageOpen();
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message);
      handleClose();
      handleMessageOpen();
    }
  }

  const handleDrawChange = event => {
    const selectedValue = event.target.value
    console.log(event.target.name)
    if (selectedValue === 'Pick & Draw') {
      console.log("Selected item is 'Pick Only'")
      setDraw(true)
      // Add your logic here for when "Pick Only" is selected
    } else {
      setDraw(false)
    }
  }

  const handleCheckboxChange = event => {
    setIsChecked(event.target.checked)
    console.log('Checkbox is checked:', event.target.checked)
  }

  return (
    <>
      <Card>
        <CardHeader title='Add New Roping' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form onSubmit={handleAddClick}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='name'
                  label='Roping Name'
                  placeholder='Roping1'
                  value={roping.name}
                  onChange={handleRopingChange}
                  InputProps={
                    {
                      // startAdornment: (
                      //   <InputAdornment position='start'>
                      //     <AccountOutline />
                      //   </InputAdornment>
                      // )
                    }
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' size='large'>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Card>
              {/* <CardHeader title='Roping Information' titleTypographyProps={{ variant: 'h6' }} /> */}
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={draw ? 6 : 12}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Roping Type
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
                        <Select
                          onChange={handleRopingChange}
                          name='type'
                          value={roping.type}
                          label='TYPE'
                          defaultValue=''
                          id='form-layouts-separator-select'
                          labelId='form-layouts-separator-select-label'
                        >
                          <MenuItem value='Draw Pot'>Draw Pot</MenuItem>
                          <MenuItem value='Pick & Draw'>Pick & Draw</MenuItem>
                          <MenuItem value='Pick Only'>Pick Only</MenuItem>
                          <MenuItem value='Pick or Draw'>Pick or Draw</MenuItem>
                          <MenuItem value='Round Robin'>Round Robin</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {draw && (
                      <Grid item xs={6} sm={6}>
                        <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                          Draw Count
                        </Typography>
                        <TextField
                          fullWidth
                          type='number'
                          name='draw_count'
                          required={draw}
                          onChange={handleRopingChange}
                          value={roping.draw_count}
                          // label='Phone No.'
                          placeholder='00'
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Max Entries(Per Roper)
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        disabled={disabled}
                        onChange={handleRopingChange}
                        required={!disabled}
                        name='max_entries_per_roper'
                        value={roping.max_entries_per_roper}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Number of Rounds
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        required
                        onChange={handleRopingChange}
                        name='num_rounds'
                        value={roping.num_rounds}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Entry Fee(Individual)
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingFinancialsChange}
                        required
                        name='entry_fees'
                        value={ropingFinancials.entry_fees}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Stock Charge Percent
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingFinancialsChange}
                        required
                        name='stock_charge_percent'
                        value={ropingFinancials.stock_charge_percent}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Assosiation Fee(Per Team)
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingFinancialsChange}
                        required
                        name='association_fees'
                        value={ropingFinancials.association_fees}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Prize Deduction
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingFinancialsChange}
                        required
                        name='price_deduction'
                        value={ropingFinancials.price_deduction}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Added Money
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingFinancialsChange}
                        required
                        name='added_money'
                        value={ropingFinancials.added_money}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Progressive after round
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingRulesChange}
                        required
                        name='progressive_after_round'
                        value={ropingRules.progressive_after_round}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Barrier Penalty
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingRulesChange}
                        required
                        name='barrier_penalty'
                        value={ropingRules.barrier_penalty}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Leg Penalty
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingRulesChange}
                        required
                        name='leg_penalty'
                        value={ropingRules.leg_penalty}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                        Classification
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        onChange={handleRopingRulesChange}
                        required
                        name='classification'
                        value={ropingRules.classification}
                        // label='Phone No.'
                        placeholder='00'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant='body2'
                        sx={{
                          fontWeight: 600,
                          marginBottom: '10px',
                          marginTop: '20px',
                          textAlign: 'center',
                          fontSize: '18px'
                        }}
                      >
                        HandiCap
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='HandiCap Roping'
                        control={
                          <Checkbox
                            name='form-layouts-alignment-checkbox'
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                        }
                        sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
                      />
                    </Grid>
                    {isChecked && (
                      <>
                        <Grid item xs={6} sm={3}>
                          <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                            Round to Handicap
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            fullWidth
                            type='number'
                            onChange={handleRopingClassificationChange}
                            required={isChecked}
                            name='round_to_handicap'
                            value={ropingClassification.round_to_handicap}
                            // label='Phone No.'
                            placeholder='00'
                          />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                            Amount to Handicap
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            fullWidth
                            type='number'
                            onChange={handleRopingClassificationChange}
                            required={isChecked}
                            name='amount_to_handicap'
                            value={ropingClassification.amount_to_handicap}
                            // label='Phone No.'
                            placeholder='00'
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            Amount to handicap per number in seconds
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                            Handicap down amount
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            fullWidth
                            type='number'
                            onChange={handleRopingClassificationChange}
                            required={isChecked}
                            name='handicap_down_amount'
                            value={ropingClassification.handicap_down_amount}
                            // label='Phone No.'
                            placeholder='00'
                          />
                        </Grid>
                        {/* <Grid item xs={6} sm={3}>
                          <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                            Maximum amount
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            fullWidth
                            type='number'
                            onChange={handleRopingClassificationChange}
                            name='amount_to_handicap'
                            value={ropingClassification.amount_to_handicap}
                            // label='Phone No.'
                            placeholder='00'
                          />
                        </Grid> */}
                        <Grid item xs={6} sm={3}>
                          <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                            Handicap up amount
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            fullWidth
                            type='number'
                            onChange={handleRopingClassificationChange}
                            required={isChecked}
                            name='handicap_up_amount'
                            value={ropingClassification.handicap_up_amount}
                            // label='Phone No.'
                            placeholder='00'
                          />
                        </Grid>
                        {/* <Grid item xs={6} sm={3}>
                          <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'end', paddingTop: '15px' }}>
                            Minimum amount
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            fullWidth
                            type='number'
                            // label='Phone No.'
                            placeholder='00'
                          />
                        </Grid> */}
                      </>
                    )}
                    {/* <Grid item xs={12}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, marginBottom: '10px',marginTop:"20px", textAlign: 'center', fontSize: '18px' }}
              >
                Incentive
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label='Roping for incentive sidepot'
                control={<Checkbox name='form-layouts-alignment-checkbox' />}
                sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600,textAlign:"end",paddingTop:"15px" }}>
                Number of rounds:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant='body2' sx={{ fontWeight: 600,textAlign:"end" ,paddingTop:"15px" }}>
                Classification
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type='number'
                // label='Phone No.'
                placeholder='00'
              />
            </Grid> */}
                    <Grid item xs={6}>
                      <Button type='submit' variant='contained' size='large'>
                        CONFIRM
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button type='button' onClick={handleClose} variant='contained' size='large'>
                        CANCEL
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
      </div>
    </>
  )
}

export default Add_Roping
