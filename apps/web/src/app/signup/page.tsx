"use client"

import { useState } from 'react'
import { useSupabase } from '@/components/supabase-provider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'

export default function SignupPage() {
  const supabase = useSupabase()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else {
      setSuccess('Check your email for a confirmation link.')
      setTimeout(() => router.push('/login'), 3000)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-cyber flex flex-col items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-6">
            <UserPlus className="w-8 h-8 text-neon-purple" />
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
          </div>
          <p className="text-gray-400 text-center">Join NexusForge and secure your pipeline</p>
        </div>

        <div className="bg-dark-card/80 border border-dark-border rounded-lg backdrop-blur-sm p-8 space-y-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                {success}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-accent text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-neon-purple/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="border-t border-dark-border pt-6">
            <p className="text-gray-400 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-neon-purple hover:text-neon-purple/80 font-medium transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
