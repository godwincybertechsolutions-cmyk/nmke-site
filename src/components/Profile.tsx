import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { supabase } from '../lib/supabase'

export function Profile() {
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email || '')
    })
  }, [])

  return (
    <section id="profile" className="py-24 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-black mb-2">Your Profile</h2>
          <p className="text-gray-600">{email}</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            <Button
              className="bg-[#DD5536] text-white hover:bg-[#c44a2e]"
              onClick={async () => {
                await supabase.auth.signOut()
                window.history.pushState(null, '', '/')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Profile
