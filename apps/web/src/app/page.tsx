import { HeroSection } from '@/components/hero-section'
import { FeatureShowcase } from '@/components/feature-showcase'
import { Navigation } from '@/components/navigation'
import { CTASection } from '@/components/cta-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-cyber overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <Navigation />

      <section className="relative z-10">
        <HeroSection />
      </section>

      <section className="relative z-10 py-20">
        <FeatureShowcase />
      </section>

      <section className="relative z-10 py-20">
        <CTASection />
      </section>
    </main>
  )
}
