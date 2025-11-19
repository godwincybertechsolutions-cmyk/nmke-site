import { useEffect, useMemo, useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { Input } from './ui/input'
import { Button } from './ui/button'

type Country = { name: string; code: string; flagPng?: string }

export function CountryPicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false)
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
    let cancelled = false
    if (!open) return
    if (!countries.length) setCountries(localSeed)
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
    return () => {
      cancelled = true
    }
  }, [open, countries.length])
  const selected = useMemo(() => countries.find((c) => c.name === value), [countries, value])
  const mapQuery = useMemo(() => encodeURIComponent(value || ''), [value])
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input readOnly value={value || ''} placeholder="Select your country" />
        <Button variant="outline" onClick={() => setOpen(true)}>Change</Button>
      </div>
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
      <CommandDialog open={open} onOpenChange={setOpen} title="Select Country" description="Search and choose your country">
        <CommandInput placeholder="Search country" />
        <CommandList>
          <CommandEmpty>Type to search countries</CommandEmpty>
          <CommandGroup heading="All Countries">
            {countries.map((c) => (
              <CommandItem
                key={c.code}
                onSelect={() => {
                  onChange(c.name)
                  setOpen(false)
                }}
              >
                {c.flagPng && <img src={c.flagPng} alt={c.name} className="w-6 h-4 mr-2 rounded-sm object-cover" />}
                <span>{c.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default CountryPicker
}

export default CountryPicker
