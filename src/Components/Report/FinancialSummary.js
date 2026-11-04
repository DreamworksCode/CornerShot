import { useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import API from 'src/pages/api'
import formatCurrency from 'src/utils/formatCurrency'
import CashMultiple from 'mdi-material-ui/CashMultiple'

const Row = ({ label, value, bold }) => (
  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
    <Typography variant='body2' sx={{ fontWeight: bold ? 700 : 400 }}>
      {label}
    </Typography>
    <Typography variant='body2' sx={{ fontWeight: bold ? 700 : 400 }}>
      {value}
    </Typography>
  </Grid>
)

const FinancialSummary = ({ selectedRopingId }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 650,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: 650
  }

  const [open, setOpen] = useState(false)
  const [summary, setSummary] = useState(null)
  const [payoffs, setPayoffs] = useState([])
  const [selectedPayoffId, setSelectedPayoffId] = useState('')
  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const handleMessageOpen = () => setMessageOpen(true)
  const handleMessageClose = () => setMessageOpen(false)

  const loadSummary = async payoffId => {
    const token = localStorage.getItem('token')
    const endpoint = payoffId
      ? `Reports/financial-summary/${selectedRopingId}?payoffId=${payoffId}`
      : `Reports/financial-summary/${selectedRopingId}`
    try {
      const response = await API.getAPICalling(endpoint, token)
      setSummary(response)
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const fetchSummary = async () => {
    const token = localStorage.getItem('token')
    const productionId = localStorage.getItem('productinoId')
    await loadSummary()
    try {
      const response = await API.getAPICalling(`payoffs/get?production_id=${productionId}`, token)
      setPayoffs(response)
    } catch (error) {
      // no payoffs on this production yet - fine, the breakdown picker just stays empty
      setPayoffs([])
    }
    setSelectedPayoffId('')
    setOpen(true)
  }

  const handlePayoffChange = async e => {
    const payoffId = e.target.value
    setSelectedPayoffId(payoffId)
    await loadSummary(payoffId || null)
  }

  const handleMarkPayoutComplete = async () => {
    const token = localStorage.getItem('token')
    setConfirmOpen(false)
    try {
      const response = await API.putAPICalling(`ropings/mark-payout-complete/${selectedRopingId}`, {}, token)
      setMessage(response.message)
      handleMessageOpen()

      // refresh so payoutStatus/payoutCompletedAt reflect the change
      await loadSummary(selectedPayoffId || null)
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const downloadFinancialSummaryPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('financialSummaryContent')
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'FinancialSummary.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
    }
  }

  return (
    <>
      <Button fullWidth type='button' onClick={fetchSummary} variant='outlined' size='medium' startIcon={<CashMultiple />}>
        Financial Summary
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby='modal-modal-title'>
        <Box sx={style}>
          {summary && (
            <>
              <div id='financialSummaryContent'>
                <Grid container spacing={0} sx={{ mb: 2 }}>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6'>{summary.ropingName}</Typography>
                    <Chip
                      label={summary.payoutStatus === 'COMPLETE' ? 'Payout Complete' : 'Payout Pending'}
                      color={summary.payoutStatus === 'COMPLETE' ? 'success' : 'warning'}
                      size='small'
                    />
                  </Grid>
                  {summary.payoutCompletedAt && (
                    <Grid item xs={12}>
                      <Typography variant='caption' color='text.secondary'>
                        Marked complete on {new Date(summary.payoutCompletedAt).toLocaleString()}
                      </Typography>
                    </Grid>
                  )}
                </Grid>

                <Grid container spacing={0}>
                  <Row label='Contestants' value={summary.numContestants} />
                  <Row label='Teams' value={summary.numTeams} />
                  <Divider sx={{ my: 1, width: '100%' }} />
                  <Row label='Entry Fee (per contestant)' value={formatCurrency(summary.entryFeePerContestant)} />
                  <Row label='Total Entry Fees' value={formatCurrency(summary.totalEntryFees)} bold />
                  <Row label='Association Fee (per team)' value={formatCurrency(summary.associationFeePerTeam)} />
                  <Row label='Total Association Fees' value={formatCurrency(summary.totalAssociationFees)} />
                  <Row label='Prize Deduction' value={formatCurrency(summary.priceDeduction)} />
                  <Row label='Balance After Deductions' value={formatCurrency(summary.balanceAfterDeductions)} bold />
                  <Row label={`Stock Charge (${summary.stockChargePercent}%)`} value={formatCurrency(summary.stockChargeValue)} />
                  <Row label='Balance After Stock Charge' value={formatCurrency(summary.balanceAfterStockCharge)} bold />
                  <Row label={`Payback (${summary.paybackPercent}%)`} value={formatCurrency(summary.playersPool)} />
                  <Row label='Added Money' value={formatCurrency(summary.addedMoney)} />
                  <Divider sx={{ my: 1, width: '100%' }} />
                  <Row label='Available Payout Purse' value={formatCurrency(summary.playersPool + summary.addedMoney)} bold />
                  <Row label='Calculated Total Payout' value={formatCurrency(summary.calculatedTotalPayout)} bold />
                </Grid>

                {summary.payoutBreakdown && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='body2' sx={{ fontWeight: 700, mb: 1 }}>
                      Payout Breakdown
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table size='small' aria-label='payout breakdown table'>
                        <TableHead>
                          <TableRow>
                            <TableCell align='center'>Place</TableCell>
                            <TableCell align='center'>Percentage</TableCell>
                            <TableCell align='center'>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {summary.payoutBreakdown.map(row => (
                            <TableRow key={row.placeNumber}>
                              <TableCell align='center'>{row.placeNumber}</TableCell>
                              <TableCell align='center'>{row.percentage}%</TableCell>
                              <TableCell align='center'>{formatCurrency(row.amount)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </div>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <FormControl fullWidth size='small'>
                    <InputLabel id='financial-summary-payoff-label'>View payout breakdown for</InputLabel>
                    <Select
                      label='View payout breakdown for'
                      value={selectedPayoffId}
                      onChange={handlePayoffChange}
                      id='financial-summary-payoff'
                      labelId='financial-summary-payoff-label'
                    >
                      <MenuItem value=''>None</MenuItem>
                      {payoffs.map(entry => (
                        <MenuItem key={entry.payoff.id} value={entry.payoff.id}>
                          {entry.payoff.payoff_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth onClick={() => setOpen(false)} type='button' variant='contained' size='medium'>
                    Close
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth onClick={downloadFinancialSummaryPDF} type='button' variant='contained' size='medium'>
                    Download
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    onClick={() => setConfirmOpen(true)}
                    type='button'
                    variant='contained'
                    color='error'
                    size='medium'
                    disabled={summary.payoutStatus === 'COMPLETE'}
                  >
                    Mark Complete
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Modal>

      {/* Confirmation for the irreversible mark-payout-complete action */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} aria-labelledby='modal-modal-title'>
        <Box sx={style}>
          <Typography id='modal-modal-description' sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
            Mark this roping's payout as complete?
          </Typography>
          <Typography variant='body2' sx={{ mb: 3 }}>
            This locks time entry and corrections for this roping and cannot be undone — there is no way to
            reverse this once confirmed.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button fullWidth onClick={() => setConfirmOpen(false)} type='button' variant='outlined' size='medium'>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={handleMarkPayoutComplete}
                type='button'
                variant='contained'
                color='error'
                size='medium'
              >
                Yes, Mark Complete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

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

export default FinancialSummary
