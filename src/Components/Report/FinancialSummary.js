import { useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
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
    width: isMobile ? '90%' : 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: 600
  }

  const [open, setOpen] = useState(false)
  const [summary, setSummary] = useState(null)
  const [message, setMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const handleMessageOpen = () => setMessageOpen(true)
  const handleMessageClose = () => setMessageOpen(false)

  const fetchSummary = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await API.getAPICalling(`Reports/financial-summary/${selectedRopingId}`, token)
      setSummary(response)
      setOpen(true)
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
    }
  }

  const handleMarkPayoutComplete = async () => {
    const token = localStorage.getItem('token')
    setConfirmOpen(false)
    try {
      const response = await API.putAPICalling(`ropings/mark-payout-complete/${selectedRopingId}`, {}, token)
      setMessage(response.message)
      handleMessageOpen()

      // refresh so payoutStatus/payoutCompletedAt reflect the change
      const refreshed = await API.getAPICalling(`Reports/financial-summary/${selectedRopingId}`, token)
      setSummary(refreshed)
    } catch (error) {
      console.log('Some error:  ', error)
      setMessage(error.message)
      handleMessageOpen()
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
                <Row label='Calculated Total Payout' value={formatCurrency(summary.calculatedTotalPayout)} bold />
              </Grid>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={6}>
                  <Button fullWidth onClick={() => setOpen(false)} type='button' variant='contained' size='medium'>
                    Close
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    onClick={() => setConfirmOpen(true)}
                    type='button'
                    variant='contained'
                    color='error'
                    size='medium'
                    disabled={summary.payoutStatus === 'COMPLETE'}
                  >
                    Mark Payout Complete
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
