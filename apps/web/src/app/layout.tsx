import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { SupabaseProvider } from '@/components/supabase-provider'
import { QueryProvider } from '@/components/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NexusForge - AI-native PBOM & AIBOM Guardian',
  description: 'Discover, sign, and validate every element of your CI/CD pipeline',
  keywords: ['PBOM', 'AIBOM', 'DevSecOps', 'Supply Chain Security', 'CI/CD'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-dark-bg text-white antialiased`}>
        <SupabaseProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
