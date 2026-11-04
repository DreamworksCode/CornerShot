// Formats a raw run time for display only (e.g. 6.5 -> "6.50 seconds").
// Does not touch the underlying numeric value used for calculations/sorting.
const formatTime = value => {
  if (value === null || value === undefined || value === '' || isNaN(value)) {
    return '-'
  }

  return `${Number(value).toFixed(2)} seconds`
}

export default formatTime
