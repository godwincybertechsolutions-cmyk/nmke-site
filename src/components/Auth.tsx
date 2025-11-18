import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { supabase } from '../lib/supabase'

export function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const submit = async () => {
    setLoading(true)
    setMessage(null)
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } })
        if (error) throw error
        setMessage('Check your email to confirm your account')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setMessage('Logged in')
      }
    } catch (e: any) {
      setMessage(e.message || 'Authentication error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="auth" className="py-24 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-black mb-2">{mode === 'signup' ? 'Create Account' : 'Login'}</h2>
          <p className="text-gray-600">Use your email and password</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
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
