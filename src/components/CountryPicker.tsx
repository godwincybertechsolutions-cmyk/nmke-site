import { useEffect, useMemo, useState } from 'react'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ScrollArea } from './ui/scroll-area' // If using shadcn/ui

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
  const [isOpen, setIsOpen] = useState(false)

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
    let cancelled = false
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then((r) => r.json())
      .then((list) => {
        if (cancelled) return
        const data: Country[] = (list || [])
          .map((c: any) => ({ name: c?.name?.common || '', code: c?.cca2 || '' }))
          .filter((c: Country) => c.name && c.code)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name))
        setCountries(data)
      })
      .catch(() => {
        // If API fails, ensure we at least have the local seed
        setCountries(localSeed)
      })
    return () => { cancelled = true }
  }, [])

  const selected = useMemo(() => countries.find((c) => c.name === value), [countries, value])
  
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return countries
    return countries.filter((c) => c.name.toLowerCase().includes(q))
  }, [countries, query])

  const handleSelect = (val: string) => {
    onChange(val)
    setIsOpen(false)
    setQuery('') // Reset search when selection is made
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none">
        Country {required && <span className="text-red-500">*</span>}
      </label>
      
      <Select 
        value={value} 
        onValueChange={handleSelect}
        open={isOpen}
        onOpenChange={setIsOpen}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your country">
            {selected && (
              <div className="flex items-center gap-2">
                <img 
                  src={`https://flagcdn.com/w20/${selected.code.toLowerCase()}.png`} 
                  alt={selected.name}
                  className="w-5 h-3.5 rounded-sm object-cover"
                />
                <span>{selected.name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        
        <SelectContent className="p-0">
          {/* Search Header - Sticky */}
          <div className="p-2 sticky top-0 bg-background z-10 border-b">
            <Input
              placeholder="Search countries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation()
                // Close on Escape key
                if (e.key === 'Escape') {
                  setIsOpen(false)
                }
              }}
              className="w-full"
              autoFocus
            />
          </div>

          {/* Countries List with Scroll */}
          <div className="max-h-[250px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No countries found
              </div>
            ) : (
              filtered.map((country) => (
                <SelectItem 
                  key={country.code} 
                  value={country.name}
                  className="flex items-center gap-2 py-2 cursor-pointer"
                >
                  <img 
                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} 
                    alt={country.name}
                    className="w-5 h-3.5 rounded-sm object-cover flex-shrink-0"
                  />
                  <span className="flex-1 truncate">{country.name}</span>
                </SelectItem>
              ))
            )}
          </div>
        </SelectContent>
      </Select>

      {/* Optional: Show selected country flag in the form for confirmation */}
      {value && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
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
