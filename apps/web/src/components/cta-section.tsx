import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-card p-12 text-center space-y-8 border-neon-cyan/20">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Ready to Sleep Better?</h2>
          <p className="text-gray-400 text-lg">
            Join teams shipping secure pipelines. Start free, upgrade as you scale.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button className="btn-neon text-black px-8 py-3 text-base h-auto">
              Get Started for Free
            </Button>
          </Link>
          <Link href="https://calendly.com/nexusforge" target="_blank">
            <Button variant="outline" className="px-8 py-3 text-base h-auto border-dark-border">
              Book a Demo
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-500">
          No credit card required. Set up in minutes. Free tier includes up to 5 pipelines.
        </p>
      </div>
    </section>
  )
}
