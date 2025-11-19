import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from './ui/drawer'
import { supabase } from '../lib/supabase'

export function Profile() {
  const [email, setEmail] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [editing, setEditing] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
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
    <section id="profile" className="py-24 px-4 bg-gradient-to-br from-[#fff4f1] to-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="border-[#f3c5b9]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#DD5536]/15 flex items-center justify-center text-[#DD5536] text-xl font-semibold">
                {(form.first_name?.[0] || 'U')}{(form.last_name?.[0] || '')}
              </div>
              <div className="flex-1">
                <div className="text-xl text-black">{form.first_name || '-'} {form.last_name || ''}</div>
                <div className="text-sm text-gray-600">{email}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[#DD5536] border-[#DD5536] capitalize">{form.preference}</Badge>
                <Button className="bg-[#DD5536] text-white hover:bg-[#c44a2e]" onClick={() => { setEditing(true); setEditOpen(true) }}>Edit Profile</Button>
                <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); window.history.pushState(null, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')) }}>Logout</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div>
                <Label>Phone</Label>
                <div className="text-black">{form.phone || '-'}</div>
              </div>
              <div>
                <Label>Location</Label>
                <div className="text-black">{form.location || '-'}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <div>
                <Label>About</Label>
                <div className="text-black whitespace-pre-wrap">{form.about || '-'}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Drawer open={editOpen} onOpenChange={setEditOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
            </DrawerHeader>
            <div className="p-6 space-y-4">
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
            </div>
            <DrawerFooter>
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
                    setEditOpen(false)
                  } else setMessage(error.message)
                }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  )
}

export default Profile
