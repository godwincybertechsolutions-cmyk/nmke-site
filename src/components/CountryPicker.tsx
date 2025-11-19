import { useEffect, useMemo, useState } from 'react'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Country = { name: string; code: string; flagPng?: string }

function CountryPicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState<Country[]>([])
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
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
      .then((r) => r.json())
      .then((list) => {
        if (cancelled) return
        const data: Country[] = (list || [])
          .map((c: any) => ({ name: c?.name?.common || '', code: c?.cca2 || '', flagPng: c?.flags?.png || '' }))
          .filter((c: Country) => c.name && c.code)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name))
        setCountries(data)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])
  const selected = useMemo(() => countries.find((c) => c.name === value), [countries, value])
  const mapQuery = useMemo(() => encodeURIComponent(value || ''), [value])
  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return countries.filter((c) => c.name.toLowerCase().includes(q))
  }, [countries, query])
  return (
    <div className="space-y-3">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full"><SelectValue placeholder="Select your country" /></SelectTrigger>
        <SelectContent className="max-h-80">
          <div className="p-2">
            <Input placeholder="Search country" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          {filtered.map((c) => (
            <SelectItem key={c.code} value={c.name}>
              {c.flagPng && <img src={c.flagPng} alt={c.name} className="w-6 h-4 mr-2 inline-block rounded-sm object-cover" />}
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            {selected?.flagPng && (
              <img src={selected.flagPng} alt={value} className="w-10 h-7 rounded-sm object-cover" />
            )}
            <div className="text-sm">{value}</div>
          </div>
          <div className="rounded-md overflow-hidden border">
            <iframe
              title="map"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="w-full h-40"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CountryPicker

