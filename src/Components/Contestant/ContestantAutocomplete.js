// Reusable searchable contestant picker used across Enter Roping screens.
// Replaces plain <Select> dropdowns with a type-to-search autocomplete (GET /contestant?search=)
// and a "quick add" option (POST /contestant with just a name) when no match is found.
import { useEffect, useRef, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import API from 'src/pages/api'

const formatRating = value => (value === null || value === undefined ? '—' : value)

const ContestantAutocomplete = ({ label, onSelect, disabled, value }) => {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    setInputValue(value ? value.name : '')
  }, [value])

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const token = localStorage.getItem('token')
      try {
        const endpoint = inputValue.trim()
          ? `contestant?search=${encodeURIComponent(inputValue.trim())}`
          : 'contestant'
        const response = await API.getAPICalling(endpoint, token)
        setOptions(response.data || [])
      } catch (error) {
        console.log('Some error:  ', error)
        setOptions([])
      }
      setLoading(false)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [inputValue])

  const handleQuickAdd = async name => {
    const token = localStorage.getItem('token')
    setLoading(true)
    try {
      await API.postAPICalling('contestant', { name }, token)
      const response = await API.getAPICalling(`contestant?search=${encodeURIComponent(name)}`, token)
      const created = (response.data || []).find(c => c.name === name)
      if (created) {
        onSelect(created)
      }
      setOptions([])
    } catch (error) {
      console.log('Some error creating contestant:  ', error)
    }
    setLoading(false)
  }

  return (
    <Autocomplete
      disabled={disabled}
      options={options}
      loading={loading}
      inputValue={inputValue}
      value={value || null}
      onInputChange={(e, newValue) => setInputValue(newValue)}
      getOptionLabel={option => (typeof option === 'string' ? option : option.name || '')}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      onChange={(e, selectedValue) => {
        if (!selectedValue) {
          return
        }
        if (selectedValue.__quickAdd) {
          handleQuickAdd(selectedValue.name)
        } else {
          onSelect(selectedValue)
        }
      }}
      filterOptions={(opts, params) => {
        const filtered = [...opts]
        const trimmed = params.inputValue.trim()
        const exists = opts.some(o => o.name.toLowerCase() === trimmed.toLowerCase())
        if (trimmed !== '' && !exists) {
          filtered.push({ __quickAdd: true, id: '__quickAdd__', name: trimmed })
        }

        return filtered
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.__quickAdd ? (
            <Typography color='primary'>+ Quick add &quot;{option.name}&quot;</Typography>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>{option.name}</span>
              <Typography variant='caption' color='text.secondary' sx={{ ml: 2 }}>
                H:{formatRating(option.header_rating)} / He:{formatRating(option.healer_rating)}
              </Typography>
            </Box>
          )}
        </li>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color='inherit' size={16} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}

export default ContestantAutocomplete
