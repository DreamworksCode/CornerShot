// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box, Checkbox, FormControlLabel, InputLabel, MenuItem, Modal, Typography, useMediaQuery } from '@mui/material'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import React, { useEffect, useState } from 'react'
import API from 'src/pages/api'
import { useTheme } from '@mui/material/styles';



const Roping_information = ({check}) => {
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
  const [isChecked, setIsChecked] = useState(false)
  const [ropingList, setRopingList] = useState([])
  const [ropingInformation, setRopingInformation] = useState(null)
  const [selectedRopingId, setSelectedRopingId]=useState(null);
  const [roping, setRoping] = React.useState({
    type: "",
    draw_count: null,
    max_entries_per_roper: null,
    num_rounds: null,
    teams_in_short_round: 20,
    short_round_sort_order: 'SLOW_TO_FAST'
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
    added_money: null,
    payback_percent: null
  })
  const [ropingClassification, setRopingClassification] = React.useState({
    baseline_team_rating: null,
    rating_adjustment_factor: null,
    max_seconds_deducted: null,
    max_seconds_added: null,
    handicap_rating_floor: null,
    slide_rating_ceiling: null
  })
  const [message, setMessage] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)
  const handleMessageOpen = () => {
    setMessageOpen(true)
  }
  const handleMessageClose = () => {
    setMessageOpen(false)
  }

  useEffect(() => {
    if (ropingInformation && ropingInformation.type === 'Pick & Draw') {
      setDraw(true)
    } else {
      setDraw(false)
    }
  }, [ropingInformation])

  const handleChange = async e => {
    // setRopingInformation({ ...ropingInformation, [e.target.name]: e.target.value })
    if (e.target.name === 'name') {
      const ropingId = e.target.value;
      setSelectedRopingId(ropingId);
      console.log(ropingId)
      try {
        const response = await API.getAPICalling(`ropings/getroping/${ropingId}`)
        console.log(response)
        if (response.roping.ropingClassification) {
          setIsChecked(true)
        } else {
          setIsChecked(false)
        }
        setRoping({
          type: response.roping.type,
          draw_count: response.roping.draw_count,
          max_entries_per_roper: response.roping.max_entries_per_roper,
          num_rounds: response.roping.num_rounds,
          teams_in_short_round: response.roping.teams_in_short_round,
          short_round_sort_order: response.roping.short_round_sort_order
        })
        setRopingRules(response.roping.ropingRules)
        setRopingFinancials(response.roping.ropingFinancials)
        setRopingClassification(response.roping.ropingClassification)
        setRopingInformation(response.roping)
      } catch (error) {
        console.log('Some error:  ', error)
      }
    }
    // else if (e.target.name === 'type') {
    //   const selectedValue = e.target.value
    //   if (selectedValue === 'Pick & Draw') {
    //     console.log("Selected item is 'Pick Only'")
    //     setDraw(true)
    //     // Add your logic here for when "Pick Only" is selected
    //   } else {
    //     setDraw(false)
    //   }
    // }
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

  const handleRopingFinancialsChange = e => {
    setRopingFinancials({ ...ropingFinancials, [e.target.name]: e.target.value })
  }

  const handleRopingRulesChange = e => {
    setRopingRules({ ...ropingRules, [e.target.name]: e.target.value })
  }

  const handleRopingClassificationChange = e => {
    setRopingClassification({ ...ropingClassification, [e.target.name]: e.target.value })
  }

  useEffect(async () => {
  const productionId = parseInt(localStorage.getItem('productinoId'), 10)
    console.log('productionId here in get:  ', productionId)
    try {
      const response = await API.getAPICalling(`ropings/getnames/${productionId}`)
      console.log(response)
      setRopingList(response)
    } catch (error) {
      console.log('Some error:  ', error)
    }
  }, [check])

  const handleCheckboxChange = event => {
    const checked = event.target.checked
    setIsChecked(checked)

    // When "HandiCap Roping" is turned on, auto-populate the Baseline Team
    // Rating from the Classification value the user already entered (e.g. 8.5).
    // The field stays editable, so the user can still override it afterwards.
    if (checked && ropingRules.classification !== null && ropingRules.classification !== '') {
      setRopingClassification(prev => ({
        ...(prev || {}),
        baseline_team_rating: ropingRules.classification
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if(ropingRules===ropingInformation.ropingRules && ropingClassification===ropingInformation.ropingClassification && ropingFinancials===ropingInformation.ropingFinancials && roping.type===ropingInformation.type && roping.num_rounds===ropingInformation.num_rounds && roping.max_entries_per_roper===ropingInformation.max_entries_per_roper && roping.draw_count===ropingInformation.draw_count){
      // alert("Update something then do update");
      setMessage("There are no fields to update");
      handleMessageOpen();
    }
    else{
      const withoutClassificationData={
        roping,
        ropingRules,
        ropingFinancials,
      }
      const withClassificationData={
        roping,
        ropingRules,
        ropingFinancials,
        ropingClassification: {
          // legacy fields - backend still requires these as integers even though they're no longer used in any calculation
          round_to_handicap: 0,
          amount_to_handicap: 0,
          handicap_down_amount: 0,
          handicap_up_amount: 0,
          ...ropingClassification
        }
      }
      // setRoping({
      // type: '',
      // draw_count: null,
      // max_entries_per_roper: null,
      // num_rounds: null}
      // )
  
      // setRopingRules({progressive_after_round: null,
      //   barrier_penalty: null,
      //   leg_penalty: null,
      //   classification: null}
      // );
  
      // setRopingFinancials({
      //   entry_fees: null,
      //   stock_charge_percent: null,
      //   association_fees: null,
      //   price_deduction: null,
      //   added_money: null  
      // })
  
      // setRopingClassification({
      //   round_to_handicap: null,
      // amount_to_handicap: null,
      // handicap_down_amount: null,
      // handicap_up_amount: null
      // })
  
      // setRoping
  
      const data=isChecked?withClassificationData:withoutClassificationData;

      try {
        const response = await API.putAPICalling(`ropings/updateroping/${selectedRopingId}`, data)
        console.log(response)
        setMessage("Roping Updated Successfully");
        handleMessageOpen();
        // alert(response);
      } catch (error) {
        console.log('Some error:  ', error)
        setMessage(error);
        handleMessageOpen();
      }
    }
  }

  return (
    <>
    <Card>
      {/* <CardHeader title='Roping Information' titleTypographyProps={{ variant: 'h6' }} /> */}
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Roping Name
              </Typography>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Roping</InputLabel>
                <Select
                  label='Roping'
                  name='name'
                  onChange={handleChange}
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  {ropingList.map(roping => (
                    <MenuItem key={roping.id} value={roping.id}>
                      {roping.name}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value='UK'>ROPING 1</MenuItem>
                  <MenuItem value='USA'>ROPING 2</MenuItem>
                  <MenuItem value='Australia'>ROPING 3</MenuItem>
                  <MenuItem value='Germany'>ROPING 4</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={draw ? 6 : 12}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Roping Type
              </Typography>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Type</InputLabel>
                <Select
                  onChange={handleRopingChange}
                  label='TYPE'
                  name='type'
                  value={roping.type}inputProps={{ min: 0 }}
                  // defaultValue=''
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
                  type='number'inputProps={{ min: 0 }}
                  required
                  name='draw_count'
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
                disabled={disabled}inputProps={{ min: 0 }}
                onChange={handleRopingChange}
                required
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
                onChange={handleRopingChange}
                requiredinputProps={{ min: 0 }}
                name='num_rounds'
                value={roping.num_rounds}
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Teams in Short Round
              </Typography>
              <TextField
                fullWidth
                type='number'
                onChange={handleRopingChange}
                inputProps={{ min: 0 }}
                required
                name='teams_in_short_round'
                value={roping.teams_in_short_round}
                placeholder='20'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Short Round Running Order
              </Typography>
              <FormControl fullWidth>
                <InputLabel id='short-round-sort-order-label'>Order</InputLabel>
                <Select
                  onChange={handleRopingChange}
                  name='short_round_sort_order'
                  value={roping.short_round_sort_order}
                  label='Order'
                  id='short-round-sort-order'
                  labelId='short-round-sort-order-label'
                >
                  <MenuItem value='SLOW_TO_FAST'>Slow to Fast</MenuItem>
                  <MenuItem value='FAST_TO_SLOW'>Fast to Slow</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Entry Fee(Individual)
              </Typography>
              <TextField
                fullWidth
                type='number'
                onChange={handleRopingFinancialsChange}inputProps={{ min: 0 }}
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
                inputProps={{ min: 0, step: 0.1 }}
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
                onChange={handleRopingFinancialsChange}inputProps={{ min: 0 }}
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
                name='price_deduction'
                onChange={handleRopingFinancialsChange}inputProps={{ min: 0 }}
                required
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
                name='added_money'
                onChange={handleRopingFinancialsChange}inputProps={{ min: 0 }}
                required
                value={ropingFinancials.added_money}
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                Payback %
              </Typography>
              <TextField
                fullWidth
                type='number'
                name='payback_percent'
                onChange={handleRopingFinancialsChange}
                inputProps={{ min: 0, step: 0.1 }}
                required
                value={ropingFinancials.payback_percent}
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
                onChange={handleRopingRulesChange}inputProps={{ min: 0 }}
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
                onChange={handleRopingRulesChange}inputProps={{ min: 0 }}
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
                name='leg_penalty'
                onChange={handleRopingRulesChange}inputProps={{ min: 0 }}
                required
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
                name='classification'
                onChange={handleRopingRulesChange}
                required
                value={ropingRules.classification}inputProps={{ min: 0 }}
                // label='Phone No.'
                placeholder='00'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, marginBottom: '10px', marginTop: '20px', textAlign: 'center', fontSize: '18px' }}
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
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                    Baseline Team Rating
                  </Typography>
                  <TextField
                    fullWidth
                    type='number'
                    required={isChecked}
                    inputProps={{ min: 0, step: 0.1 }}
                    name='baseline_team_rating'
                    onChange={handleRopingClassificationChange}
                    value={ropingClassification&&ropingClassification.baseline_team_rating}
                    placeholder='00'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                    Rating Adjustment Factor
                  </Typography>
                  <TextField
                    fullWidth
                    type='number'
                    required={isChecked}
                    inputProps={{ min: 0, step: 0.1 }}
                    name='rating_adjustment_factor'
                    onChange={handleRopingClassificationChange}
                    value={ropingClassification&&ropingClassification.rating_adjustment_factor}
                    placeholder='00'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                    Max Seconds Deducted
                  </Typography>
                  <TextField
                    fullWidth
                    type='number'
                    required={isChecked}
                    inputProps={{ min: 0, step: 0.1 }}
                    name='max_seconds_deducted'
                    onChange={handleRopingClassificationChange}
                    value={ropingClassification&&ropingClassification.max_seconds_deducted}
                    placeholder='00'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                    Max Seconds Added
                  </Typography>
                  <TextField
                    fullWidth
                    type='number'
                    required={isChecked}
                    inputProps={{ min: 0, step: 0.1 }}
                    name='max_seconds_added'
                    onChange={handleRopingClassificationChange}
                    value={ropingClassification&&ropingClassification.max_seconds_added}
                    placeholder='00'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                    Handicap Rating Floor
                  </Typography>
                  <TextField
                    fullWidth
                    type='number'
                    required={isChecked}
                    inputProps={{ min: 0, step: 0.1 }}
                    name='handicap_rating_floor'
                    onChange={handleRopingClassificationChange}
                    value={ropingClassification&&ropingClassification.handicap_rating_floor}
                    placeholder='00'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: '10px' }}>
                    Slide Rating Ceiling
                  </Typography>
                  <TextField
                    fullWidth
                    type='number'
                    required={isChecked}
                    inputProps={{ min: 0, step: 0.1 }}
                    name='slide_rating_ceiling'
                    onChange={handleRopingClassificationChange}
                    value={ropingClassification&&ropingClassification.slide_rating_ceiling}
                    placeholder='00'
                  />
                </Grid>
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
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Update
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
    </>
  )
}

export default Roping_information
