import { useEffect, useMemo, useState } from 'react'
import { Input } from './ui/input'

type Country = { name: string; code: string }

function CountryPicker({ 
  value, 
  onChange,
  required = false,
  disabled = false 
}: { 
  value: string; 
  onChange: (val: string) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState<Country[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const localSeed: Country[] = [
    { name: 'Kenya', code: 'KE' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' }
  ]

  useEffect(() => {
    setCountries(localSeed)
    // Your API call logic here...
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return countries.slice(0, 8)
    return countries.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 10)
  }, [countries, query])

  const handleSelect = (countryName: string) => {
    onChange(countryName)
    setQuery(countryName)
    setShowSuggestions(false)
  }

  const selected = useMemo(() => countries.find((c) => c.name === value), [countries, value])

  return (
    <div className="space-y-2 relative">
      {/* REMOVED THE LABEL FROM HERE */}
      
      <div className="relative">
        <Input
          placeholder="Start typing your country..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
            if (e.target.value === '') {
              onChange('')
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          disabled={disabled}
          className="w-full pr-10"
        />
        
        {value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img 
              src={`https://flagcdn.com/w20/${selected?.code.toLowerCase()}.png`} 
              alt={value}
              className="w-5 h-3.5 rounded-sm object-cover"
            />
          </div>
        )}
      </div>

      {showSuggestions && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {filtered.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleSelect(country.name)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3"
            >
              <img 
                src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} 
                alt={country.name}
                className="w-5 h-3.5 rounded-sm object-cover flex-shrink-0"
              />
              <span className="flex-1">{country.name}</span>
            </button>
          ))}
        </div>
      )}

      {value && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
          <img 
            src={`https://flagcdn.com/w20/${selected?.code.toLowerCase()}.png`} 
            alt={value}
            className="w-4 h-3 rounded-sm object-cover"
          />
          <span>Selected: {value}</span>
        </div>
      )}
    </div>
  )
}

export default CountryPicker


