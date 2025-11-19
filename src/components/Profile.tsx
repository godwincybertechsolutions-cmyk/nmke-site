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
import { Settings, MapPin, Phone, User, Mail, LogOut, Save } from 'lucide-react'

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
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32" />
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 -mt-16 mb-6">
              <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-blue-600">
                {getInitials(form.first_name, form.last_name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-gray-900 truncate">
                    {form.first_name || 'Unknown'} {form.last_name || 'User'}
                  </h2>
                  <Badge className={`${getPreferenceColor(form.preference)} capitalize font-medium px-3 py-1`}>
                    {form.preference}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-stretch sm:self-auto">
                <Button onClick={() => { setEditing(true); setEditOpen(true) }} className="bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); window.history.pushState(null, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="text-gray-600 hover:text-gray-700 border-gray-300">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm bg-white/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
                      <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="text-gray-900">{form.phone || '-'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="text-gray-900">{form.location || '-'}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">About</h3>
                  <div className="text-gray-900 whitespace-pre-wrap">{form.about || '-'}</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
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
                className="bg-blue-600 text-white hover:bg-blue-700"
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
                <Save className="w-4 h-4 mr-2" />
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
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U'
  }

  const getPreferenceColor = (preference: string) => {
    const colors: Record<string, string> = {
      buy: 'bg-green-100 text-green-800 border-green-200',
      rent: 'bg-blue-100 text-blue-800 border-blue-200',
      safari: 'bg-amber-100 text-amber-800 border-amber-200'
    }
    return colors[preference] || 'bg-gray-100 text-gray-800 border-gray-200'
  }
