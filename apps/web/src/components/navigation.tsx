import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border/50 backdrop-blur-xl bg-dark-bg/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center font-bold">
            NF
          </div>
          <span className="font-bold text-xl hidden sm:inline">NexusForge</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm hover:text-neon-cyan transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm hover:text-neon-cyan transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm hover:text-neon-cyan transition-colors">
            Docs
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="btn-neon text-black" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
