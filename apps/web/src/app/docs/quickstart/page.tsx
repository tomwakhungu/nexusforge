import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function QuickstartPage() {
  const steps = [
    {
      number: 1,
      title: 'Sign Up',
      description: 'Create a NexusForge account to get started.',
      action: 'Go to Sign Up',
      href: '/signup',
    },
    {
      number: 2,
      title: 'Connect Your Repository',
      description: 'Link your GitHub repository to scan your CI/CD pipeline.',
      action: 'View Docs',
    },
    {
      number: 3,
      title: 'Scan Your Pipeline',
      description: 'Run the discovery to identify all tools, dependencies, and AI components.',
      action: 'View Docs',
    },
    {
      number: 4,
      title: 'Review Results',
      description: 'Analyze your PBOM and AIBOM to understand your supply chain.',
      action: 'View Dashboard',
      href: '/dashboard',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-cyber flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/docs" className="flex items-center gap-2 text-neon-cyan hover:text-neon-cyan/80 transition mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Docs
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Quickstart Guide</h1>
          <p className="text-xl text-gray-400">
            In 5 minutes, you'll have NexusForge protecting your supply chain.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-dark-card/80 border border-dark-border rounded-lg p-8 hover:border-neon-cyan transition"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-neon-cyan/20">
                    <span className="text-neon-cyan font-bold text-lg">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  {step.href && (
                    <Link
                      href={step.href}
                      className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-cyan/80 transition font-medium"
                    >
                      {step.action}
                      <span>→</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-accent/10 border border-neon-cyan/30 rounded-lg">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-neon-cyan flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">You're Ready!</h3>
              <p className="text-gray-300">
                Once you've completed these steps, you'll have full visibility into your supply chain security.
                Start with a free trial to explore all features.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/signup"
            className="inline-block bg-gradient-accent text-black font-bold px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </main>
  )
}
