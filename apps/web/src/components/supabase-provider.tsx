'use client'

import { createContext, useContext, useState } from 'react'

const SupabaseContext = createContext<any>(null)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => {
    if (typeof window === 'undefined') return null
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    const { createBrowserClient } = require('@supabase/ssr')
    return createBrowserClient(url, key)
  })

  return (
    <SupabaseContext.Provider value={client}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  return useContext(SupabaseContext)
}
