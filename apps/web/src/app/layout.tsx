import type { Metadata } from 'next'
import { GeistSans, GeistMono } from 'geist/font'
import '@/styles/globals.css'
import { SupabaseProvider } from '@/components/supabase-provider'

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
      <head>
        <script
          dangerously={true}
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} bg-dark-bg text-white antialiased`}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
