import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import CountryPicker from './CountryPicker'
import { supabase } from '../lib/supabase'

export function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const submit = async () => {
    setLoading(true)
    setMessage(null)
    try {
      if (mode === 'signup') {
        if (!firstName || !lastName || !country) throw new Error('Please fill all fields')
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth`, data: { first_name: firstName, last_name: lastName, country } } })
        if (error) throw error
        setMessage('Check your email to confirm your account')
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setMessage('Logged in')
        try {
          const token = data.session?.access_token
          if (token) {
            const md = data.session.user.user_metadata || {}
            const base = import.meta.env.VITE_SUPABASE_URL.replace('supabase.co', 'functions.supabase.co')
            if (md.first_name || md.last_name || md.country) {
              await fetch(`${base}/upsert-profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ first_name: md.first_name || null, last_name: md.last_name || null, location: null, preference: null, about: null })
              })
            }
          }
        } catch {}
        window.history.pushState(null, '', '/profile')
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    } catch (e: any) {
      setMessage(e.message || 'Authentication error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        try {
          const token = data.session.access_token
          const md = data.session.user.user_metadata || {}
          const base = import.meta.env.VITE_SUPABASE_URL.replace('supabase.co', 'functions.supabase.co')
          if (token && (md.first_name || md.last_name || md.country)) {
            fetch(`${base}/upsert-profile`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify({ first_name: md.first_name || null, last_name: md.last_name || null, location: null, preference: null, about: null })
            })
          }
        } catch {}
        window.history.pushState(null, '', '/profile')
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        try {
          const token = session.access_token
          const md = session.user.user_metadata || {}
          const base = import.meta.env.VITE_SUPABASE_URL.replace('supabase.co', 'functions.supabase.co')
          if (token && (md.first_name || md.last_name || md.country)) {
            fetch(`${base}/upsert-profile`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify({ first_name: md.first_name || null, last_name: md.last_name || null, location: null, preference: null, about: null })
            })
          }
        } catch {}
        window.history.pushState(null, '', '/profile')
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <section id="auth" className="py-24 px-4 bg-gradient-to-br from-[#fff4f1] to-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#DD5536]/10 text-[#DD5536] text-sm mb-3">Welcome to New Manyatta</div>
          <h2 className="text-4xl text-black mb-2">{mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}</h2>
          <p className="text-gray-600">{mode === 'signup' ? 'Start your journey with us' : 'Login to continue'}</p>
        </div>
        <Card className="border-[#f3c5b9]">
          <CardContent className="p-6 space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Label>Country</Label>
                  <CountryPicker value={country} onChange={setCountry} />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {message && <div className="text-sm text-gray-700">{message}</div>}
            <div className="flex items-center gap-3">
              <Button onClick={submit} disabled={loading} className="bg-[#DD5536] text-white hover:bg-[#c44a2e]">
                {loading ? 'Please wait...' : mode === 'signup' ? 'Sign Up' : 'Login'}
              </Button>
              <Button variant="outline" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>Switch to {mode === 'signup' ? 'Login' : 'Sign Up'}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Auth
