"use client"

import { useEffect } from 'react'
import { useSupabase } from '@/components/supabase-provider'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutPage() {
  const supabase = useSupabase()
  const router = useRouter()
  useEffect(() => {
    supabase.auth.signOut().then(() => router.push('/'))
  }, [supabase, router])
  return (
    <main className="min-h-screen bg-gradient-cyber flex flex-col items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="flex items-center gap-3">
          <LogOut className="w-10 h-10 text-neon-cyan animate-pulse" />
          <h1 className="text-3xl font-bold text-white">Signing out...</h1>
        </div>
        <p className="text-gray-400 text-lg">Redirecting you to the home page</p>
        <div className="flex gap-2 mt-8">
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </main>
  )
}
