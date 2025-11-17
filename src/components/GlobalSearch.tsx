import { useEffect, useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'

export function GlobalSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (!e.ctrlKey && !e.metaKey && e.key === '/') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections and actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go('home')}>Home</CommandItem>
          <CommandItem onSelect={() => go('properties')}>Properties</CommandItem>
          <CommandItem onSelect={() => go('safaris')}>Safaris</CommandItem>
          <CommandItem onSelect={() => go('about')}>About</CommandItem>
          <CommandItem onSelect={() => go('contact')}>Contact</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => go('properties')}>Schedule Viewing</CommandItem>
          <CommandItem onSelect={() => go('contact')}>Request Itinerary</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
