import { Calendar, Users, Clock, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '../lib/supabase';

const safaris = [
  {
    id: 1,
    title: 'Masai Mara Wildlife Safari',
    description: 'Experience the Great Migration and witness the Big Five in their natural habitat. Includes game drives, luxury accommodation, and expert guides.',
    duration: '5 Days / 4 Nights',
    groupSize: 'Up to 8 people',
    price: 'From KSH 120,000',
    perPerson: true,
    seasonality: 'Best Jun–Oct; Dec–Feb',
    highlights: ['Game Drives', 'Luxury Lodge', 'All Meals', 'Park Fees'],
    notIncluded: ['International Flights', 'Personal Insurance', 'Tips'],
    image: 'https://images.unsplash.com/photo-1703538354069-2d5693331330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZW55YSUyME1hc2FpJTIwTWFyYXxlbnwxfHx8fDE3NjMxMDkyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Amboseli Elephant Safari',
    description: 'Get up close with majestic elephants with Mount Kilimanjaro as your backdrop. Perfect for photography and wildlife enthusiasts.',
    duration: '3 Days / 2 Nights',
    groupSize: 'Up to 10 people',
    price: 'From KSH 75,000',
    perPerson: true,
    seasonality: 'Best Jun–Oct; Jan–Feb',
    highlights: ['Elephant Viewing', 'Kilimanjaro Views', 'Photography', 'Transport'],
    notIncluded: ['International Flights', 'Personal Insurance', 'Tips'],
    image: 'https://images.unsplash.com/photo-1653293144611-1ff36f8c7c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzYzMTA5Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Safaris() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', startDate: '', groupSize: '' })
  const [targetSafari, setTargetSafari] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const prefillFromProfile = async (): Promise<boolean> => {
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) {
      window.history.pushState(null, '', '/auth')
      window.dispatchEvent(new PopStateEvent('popstate'))
      return false
    }
    const uid = sessionData.session.user.id
    const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', uid).maybeSingle()
    setForm((f) => ({
      ...f,
      name: `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim(),
      email: sessionData.session.user.email ?? '',
      phone: profile?.phone ?? f.phone
    }))
    return true
  }
  useEffect(() => {
    const section = document.getElementById('safaris')
    if (!section) return
    const items = Array.from(section.querySelectorAll('[data-reveal="true"]')) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-[textUp_0.6s_ease-out_both]')
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <section id="safaris" className="py-24 px-4 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4 animate-[fadeLong_0.6s_ease-out]">
            <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">
              Safari Adventures
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl text-black mb-4 animate-[textUp_0.6s_ease-out]">
            Unforgettable <span className="text-[#DD5536]">Safari Adventures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-[fadeLong_0.8s_ease-out]">
            Discover the beauty of Kenya's wildlife and landscapes with our expertly curated safari experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          {safaris.map((safari) => (
            <Card
              key={safari.id}
              className="group overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col"
              data-reveal="true"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={safari.image}
                  alt={safari.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl text-white mb-2">{safari.title}</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin size={16} className="mr-2" />
                    <span>Kenya</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <p className="text-gray-600 mb-6 leading-relaxed">{safari.description}</p>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="outline" className="text-[#DD5536] border-[#DD5536]">{safari.price}{safari.perPerson ? ' per person' : ''}</Badge>
                  <Badge variant="outline" className="text-gray-700 border-gray-200">{safari.seasonality}</Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <Clock size={20} className="mr-2 text-[#DD5536] flex-shrink-0" />
                    <span className="text-sm">{safari.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users size={20} className="mr-2 text-[#DD5536] flex-shrink-0" />
                    <span className="text-sm">{safari.groupSize}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar size={20} className="mr-2 text-[#DD5536] flex-shrink-0" />
                    <span className="text-sm">Year-round</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm text-black mb-2">Included</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {safari.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle2 size={16} className="mr-2 text-[#DD5536] flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-black mb-2">Not included</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {safari.notIncluded?.map((ni, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <span className="inline-block w-2 h-2 rounded-full bg-gray-300 mr-2" />
                          <span>{ni}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="text-xl text-[#DD5536]">{safari.price}{safari.perPerson ? ' per person' : ''}</div>
                  <Button className="bg-[#DD5536] text-white hover:bg-[#c44a2e] group/btn" onClick={async () => { setTargetSafari(safari); const ok = await prefillFromProfile(); if (!ok) return; setSuccess(false); setError(null); setOpen(true) }}>
                    Book Now
                    <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-[#DD5536] to-[#c44a2e] border-none text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          <CardContent className="p-8 md:p-12 text-center relative z-10">
            <h3 className="text-3xl md:text-4xl mb-4">Custom Safari Packages</h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let us create a personalized safari experience tailored to your preferences, budget, and schedule
            </p>
            <Button size="lg" className="bg-white text-[#DD5536] hover:bg-gray-100 px-8" onClick={async () => { setTargetSafari(null); const ok = await prefillFromProfile(); if (!ok) return; setSuccess(false); setError(null); setOpen(true) }}>
              Request Custom Itinerary
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request Itinerary</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {success ? (
                <div className="space-y-4">
                  <div className="text-black">Itinerary requested. Status: pending</div>
                  <div className="flex gap-3">
                    <Button className="bg-white text-[#DD5536] hover:bg-gray-100" onClick={() => { setOpen(false); window.history.pushState(null, '', '/profile'); window.dispatchEvent(new PopStateEvent('popstate')) }}>Go to Profile</Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="groupSize">Group Size</Label>
                      <Input id="groupSize" type="number" value={form.groupSize} onChange={(e) => setForm({ ...form, groupSize: e.target.value })} />
                    </div>
                  </div>
                  {error && <div className="text-sm text-red-600">{error}</div>}
                  <Button
                    className="bg-white text-[#DD5536] hover:bg-gray-100"
                    disabled={submitting}
                    onClick={async () => {
                      setError(null)
                      if (!form.name || !form.email || !form.phone || !form.startDate || !form.groupSize) { setError('All fields are required'); return }
                      const today = new Date(); const selected = new Date(form.startDate)
                      if (selected <= new Date(today.getFullYear(), today.getMonth(), today.getDate())) { setError('Start date must be in the future'); return }
                      if (Number(form.groupSize) < 1) { setError('Group size must be at least 1'); return }
                      setSubmitting(true)
                      const { data: sessionData } = await supabase.auth.getSession()
                      const uid = sessionData.session?.user?.id ?? null
                      const { error } = await supabase.from('itineraries').insert({
                        safari_id: targetSafari?.id ?? null,
                        safari_title: targetSafari?.title ?? null,
                        name: form.name,
                        email: form.email,
                        phone: form.phone,
                        start_date: form.startDate,
                        group_size: Number(form.groupSize),
                        user_id: uid,
                        status: 'pending',
                        custom: targetSafari ? false : true
                      })
                      setSubmitting(false)
                      if (!error) {
                        setSuccess(true)
                      } else {
                        setError(error.message)
                      }
                    }}
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
