import {
  Network,
  Shield,
  Zap,
  BarChart3,
  GitGraphIcon,
  CheckCircle2
} from 'lucide-react'

const features = [
  {
    icon: Network,
    title: 'Auto-Discovery',
    description:
      'Instantly discover all tools, dependencies, webhooks, and AI components across your pipeline—no manual inventory lists.',
  },
  {
    icon: Shield,
    title: 'Sigstore Signing',
    description:
      'Cryptographically sign every artifact with Sigstore. Prove provenance. Prevent supply chain attacks before they happen.',
  },
  {
    icon: GitGraphIcon,
    title: 'Attack Path Graphs',
    description:
      'Visualize how vulnerabilities chain through your supply chain. See the blast radius before the blast.',
  },
  {
    icon: Zap,
    title: 'Drift Detection',
    description:
      'Continuous validation catches unauthorized changes, untracked tools, and compromised dependencies in real-time.',
  },
  {
    icon: BarChart3,
    title: 'Risk Scoring',
    description:
      'Contextual risk scores guide your team. Focus on what matters. Ignore the noise.',
  },
  {
    icon: CheckCircle2,
    title: 'Compliance Reports',
    description:
      'Generate beautiful, executive-ready compliance evidence for SOC 2, ISO 27001, NIS2, and CRA—in seconds.',
  },
]

export function FeatureShowcase() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          The Features That Keep Teams Sane
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Every capability purpose-built to eliminate blind spots in modern CI/CD and AI/LLM pipelines.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="group glass-card p-8 hover:border-neon-cyan/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-accent/20 flex items-center justify-center mb-4 group-hover:bg-gradient-accent/40 transition-all">
                <Icon className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
