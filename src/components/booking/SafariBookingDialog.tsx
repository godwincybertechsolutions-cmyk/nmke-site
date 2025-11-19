import { useEffect, useMemo, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { supabase } from '../../lib/supabase'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Calendar, MapPin, Users } from 'lucide-react'
import type { SafariSummary } from './types'

const emptyForm = { name: '', email: '', phone: '', startDate: '', groupSize: '' }

type SafariBookingDialogProps = {
  open: boolean
  safari?: SafariSummary
  mode: 'book' | 'custom'
  onOpenChange: (open: boolean) => void
}

function navigate(path: string) {
  window.history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function SafariBookingDialog({ open, safari, mode, onOpenChange }: SafariBookingDialogProps) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [authRequired, setAuthRequired] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const didPrefill = useRef(false)

  useEffect(() => {
    if (!open) {
      setForm(emptyForm)
      setError(null)
      setSuccess(false)
      setAuthRequired(false)
      setSubmitting(false)
      setLoadingProfile(false)
      didPrefill.current = false
      return
    }

    let active = true
    const hydrateProfile = async () => {
      if (didPrefill.current) return
      didPrefill.current = true
      setLoadingProfile(true)
      try {
        const { data } = await supabase.auth.getSession()
        if (!active) return
        if (!data.session) {
          setAuthRequired(true)
          return
        }
        setAuthRequired(false)
        const uid = data.session.user.id
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', uid)
          .maybeSingle()
        if (!active) return
        setForm((prev) => ({
          ...prev,
          name: `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || prev.name,
          email: data.session?.user.email ?? prev.email,
          phone: profile?.phone ?? prev.phone,
        }))
      } catch (prefillError) {
        console.error('prefill error', prefillError)
      } finally {
        if (active) setLoadingProfile(false)
      }
    }

    hydrateProfile()
    return () => {
      active = false
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    setError(null)
  }, [safari?.id, open, mode])

  const safariImage = useMemo(() => safari?.image, [safari?.image])

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.startDate || !form.groupSize) {
      setError('All fields are required')
      return
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selected = new Date(form.startDate)
    if (selected <= today) {
      setError('Start date must be in the future')
      return
    }
    if (Number(form.groupSize) < 1) {
      setError('Group size must be at least 1')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      if (!token) {
        setAuthRequired(true)
        setSubmitting(false)
        return
      }

      const base = import.meta.env.VITE_SUPABASE_URL?.replace('supabase.co', 'functions.supabase.co')
      if (!base) throw new Error('Missing Supabase URL')

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)
      const res = await fetch(`${base}/request-itinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          safari_id: safari?.id ?? null,
          safari_title: safari?.title ?? null,
          mode,
          name: form.name,
          email: form.email,
          phone: form.phone,
          start_date: form.startDate,
          group_size: Number(form.groupSize),
        }),
        signal: controller.signal,
      })
      clearTimeout(timeout)
      const body = await res.json().catch(() => ({}))
      if (res.ok && body?.ok) {
        setSuccess(true)
      } else {
        setError(body?.error || 'Submission failed')
      }
    } catch (submissionError: any) {
      if (submissionError?.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(submissionError?.message || 'Network error')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const title = mode === 'custom' ? 'Request Custom Itinerary' : 'Book Safari Experience'
  const description =
    mode === 'custom'
      ? 'Share your travel dates and group size. Our safari architects will craft a bespoke adventure.'
      : 'Reserve your seat on this safari. We will confirm availability and logistics shortly.'

  const successCopy =
    mode === 'custom'
      ? 'Custom itinerary request received. Expect a personalized proposal shortly.'
      : 'Safari booking submitted. Our team will confirm your slot via email.'

  const resetAndClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {mode === 'book' && safari ? (
          <div className="flex gap-3 rounded-lg border border-gray-200 p-3">
            {safariImage ? (
              <ImageWithFallback
                src={safariImage}
                alt={safari.title ?? 'Selected safari'}
                className="h-16 w-16 rounded-md object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-md bg-gray-100" />
            )}
            <div className="text-sm">
              <p className="font-medium text-black">{safari.title ?? 'Selected Safari'}</p>
              {safari.duration && (
                <p className="flex items-center gap-1 text-gray-500">
                  <Calendar size={14} className="text-[#DD5536]" /> {safari.duration}
                </p>
              )}
              {safari.price && <p className="text-gray-700">{safari.price}</p>}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-200 p-3 text-sm text-gray-500">
            Tell us your preferred destinations, dates, and group size. We will curate the perfect route.
          </div>
        )}

        {success ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">{successCopy}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="bg-[#DD5536] text-white" onClick={() => navigate('/profile')}>
                View Profile
              </Button>
              <Button variant="outline" onClick={resetAndClose}>
                Close
              </Button>
            </div>
          </div>
        ) : authRequired ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-700">
              Please log in to continue. Your traveler profile unlocks faster bookings and saved preferences.
            </p>
            <Button className="bg-[#DD5536] text-white" onClick={() => navigate('/auth')}>
              Go to Login
            </Button>
            <Button variant="outline" onClick={resetAndClose}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {loadingProfile && <p className="text-xs text-gray-500">Loading your profile…</p>}
            <div>
              <Label htmlFor="safari-name">Full Name</Label>
              <Input
                id="safari-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="safari-email">Email</Label>
              <Input
                id="safari-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="safari-phone">Phone</Label>
              <Input
                id="safari-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="safari-start">Start Date</Label>
                <Input
                  id="safari-start"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="safari-group">Group Size</Label>
                <Input
                  id="safari-group"
                  type="number"
                  min={1}
                  value={form.groupSize}
                  onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
                />
              </div>
            </div>
            {safari?.title && (
              <p className="text-xs text-gray-500">
                Booking for: <span className="font-medium text-gray-700">{safari.title}</span>
              </p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              className="bg-[#DD5536] text-white hover:bg-[#c44a2e]"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? 'Submitting…' : 'Submit Request'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
