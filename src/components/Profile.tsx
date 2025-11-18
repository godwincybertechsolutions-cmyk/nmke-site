import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { supabase } from '../lib/supabase'

export function Profile() {
  const [email, setEmail] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [editing, setEditing] = useState(true)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    location: '',
    preference: 'buy',
    about: ''
  })

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user
      setEmail(u?.email || '')
      if (u?.id) {
        setUserId(u.id)
        const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', u.id).maybeSingle()
        if (profile) {
          setForm({
            first_name: profile.first_name || '',
            last_name: profile.last_name || '',
            phone: profile.phone || '',
            location: profile.location || '',
            preference: profile.preference || 'buy',
            about: profile.about || ''
          })
          setEditing(false)
        }
      }
    })
  }, [])

  return (
    <section id="profile" className="py-24 px-4 bg-white">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-black mb-2">{editing ? 'Complete Your Profile' : 'Your Profile'}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            {editing ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input id="first_name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input id="last_name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Preference</Label>
                  <Select value={form.preference} onValueChange={(v) => setForm({ ...form, preference: v })}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="safari">Safari</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="about">About</Label>
                  <Textarea id="about" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
                </div>
                {message && <div className="text-sm text-gray-700">{message}</div>}
                <div className="flex items-center gap-3">
                  <Button
                    className="bg-[#DD5536] text-white hover:bg-[#c44a2e]"
                    disabled={loading || !userId}
                    onClick={async () => {
                      setLoading(true)
                      setMessage(null)
                      const payload = { ...form, user_id: userId }
                      const { error } = await supabase.from('profiles').upsert(payload, { onConflict: 'user_id' })
                      setLoading(false)
                      if (!error) {
                        setMessage('Profile saved')
                        setEditing(false)
                      } else setMessage(error.message)
                    }}
                  >
                    {loading ? 'Saving...' : 'Save Profile'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await supabase.auth.signOut()
                      window.history.pushState(null, '', '/')
                      window.dispatchEvent(new PopStateEvent('popstate'))
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <div className="text-black">{form.first_name || '-'}</div>
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <div className="text-black">{form.last_name || '-'}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Phone</Label>
                    <div className="text-black">{form.phone || '-'}</div>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <div className="text-black">{form.location || '-'}</div>
                  </div>
                </div>
                <div>
                  <Label>Preference</Label>
                  <div className="text-black capitalize">{form.preference || '-'}</div>
                </div>
                <div>
                  <Label>About</Label>
                  <div className="text-black whitespace-pre-wrap">{form.about || '-'}</div>
                </div>
                {message && <div className="text-sm text-gray-700">{message}</div>}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await supabase.auth.signOut()
                      window.history.pushState(null, '', '/')
                      window.dispatchEvent(new PopStateEvent('popstate'))
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Profile
