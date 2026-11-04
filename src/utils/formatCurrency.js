// Formats a numeric value as USD for display only (e.g. 1250 -> "$1,250.00").
// Does not touch the underlying numeric value used for calculations.
const formatCurrency = value => {
  const num = value === null || value === undefined || value === '' || isNaN(value) ? 0 : Number(value)

  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export default formatCurrency
