import { useEffect, useMemo, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { supabase } from '../../lib/supabase'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { MapPin } from 'lucide-react'
import type { PropertySummary } from './types'

const emptyForm = { name: '', email: '', phone: '', date: '', time: '', notes: '' }

type ScheduleViewingDialogProps = {
  open: boolean
  property?: PropertySummary
  onOpenChange: (open: boolean) => void
}

function navigate(path: string) {
  window.history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function ScheduleViewingDialog({ open, property, onOpenChange }: ScheduleViewingDialogProps) {
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
  }, [property?.id, open])

  const propertyImage = useMemo(() => property?.image, [property?.image])

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setError('All fields are required')
      return
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selected = new Date(form.date)
    if (selected <= today) {
      setError('Date must be in the future')
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
      const res = await fetch(`${base}/request-viewing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          property_id: property?.id ?? null,
          property_title: property?.title ?? null,
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          notes: form.notes,
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

  const resetAndClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule a Viewing</DialogTitle>
          <DialogDescription>
            Choose a convenient day and time. Our concierge will confirm within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {property ? (
          <div className="flex gap-3 rounded-lg border border-gray-200 p-3">
            {propertyImage ? (
              <ImageWithFallback
                src={propertyImage}
                alt={property.title ?? 'Selected property'}
                className="h-16 w-16 rounded-md object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-md bg-gray-100" />
            )}
            <div className="text-sm">
              <p className="font-medium text-black">{property.title ?? 'Selected Property'}</p>
              {property.location && (
                <p className="flex items-center gap-1 text-gray-500">
                  <MapPin size={14} className="text-[#DD5536]" /> {property.location}
                </p>
              )}
              {property.price && <p className="text-gray-700">{property.price}</p>}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-200 p-3 text-sm text-gray-500">
            Pick any property to pre-fill its details, or proceed with a general request.
          </div>
        )}

        {success ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Viewing scheduled successfully. We sent a confirmation to {form.email}.
            </p>
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
              Please log in to request a viewing. Your details will auto-fill once you are authenticated.
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
              <Label htmlFor="viewing-name">Full Name</Label>
              <Input
                id="viewing-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="viewing-email">Email</Label>
              <Input
                id="viewing-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="viewing-phone">Phone</Label>
              <Input
                id="viewing-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="viewing-date">Date</Label>
                <Input
                  id="viewing-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="viewing-time">Time</Label>
                <Input
                  id="viewing-time"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="viewing-notes">Notes</Label>
              <Textarea
                id="viewing-notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Share any special requests or preferred viewing style"
              />
            </div>
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
