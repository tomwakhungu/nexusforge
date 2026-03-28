import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      <div className="text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 backdrop-blur">
          <Zap className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm text-neon-cyan font-medium">Now in Public Beta</span>
        </div>

        {/* Main headline */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">The PBOM + AIBOM</span>
            <br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">Guardian Your Pipeline</span>
            <br />
            <span className="text-white">Needs to Sleep Better</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Auto-discover every tool, dependency, and AI component in your CI/CD pipeline. Sign with Sigstore,
            validate continuously, identify attack paths, and ship confidence—not chaos.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/signup">
            <Button className="btn-neon text-black px-8 py-3 text-base h-auto" size="lg">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/docs/quickstart">
            <Button variant="outline" className="px-8 py-3 text-base h-auto border-dark-border hover:bg-dark-card">
              View Quickstart
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
          <div className="space-y-2">
            <p className="text-3xl font-bold text-neon-cyan">200+</p>
            <p className="text-sm text-gray-500">Tool Types Recognized</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-neon-cyan">&lt;2s</p>
            <p className="text-sm text-gray-500">Pipeline Scan Time</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-neon-cyan">99.9%</p>
            <p className="text-sm text-gray-500">Uptime SLA</p>
          </div>
        </div>
      </div>

      {/* Hero image placeholder - will be replaced with interactive graph */}
      <div className="mt-20 rounded-2xl border border-dark-border bg-black/20 backdrop-blur p-8 aspect-video flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-sm mb-2">Interactive Pipeline Visualization</p>
          <p className="text-xs">(Coming Soon - Real-time attack graph demo)</p>
        </div>
      </div>
    </section>
  )
}
