import Link from 'next/link'
import { BookOpen, Zap } from 'lucide-react'

export default function DocsPage() {
  const docs = [
    {
      title: 'Quickstart',
      description: 'Get up and running with NexusForge in 5 minutes',
      href: '/docs/quickstart',
      icon: Zap,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-cyber flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-neon-cyan" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Documentation</h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl">
            Learn how to use NexusForge to secure your CI/CD pipeline and discover all components in your supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {docs.map((doc) => {
            const IconComponent = doc.icon
            return (
              <Link key={doc.href} href={doc.href}>
                <div className="group bg-dark-card/80 border border-dark-border rounded-lg p-6 hover:border-neon-cyan transition cursor-pointer hover:shadow-lg hover:shadow-neon-cyan/20">
                  <div className="flex items-start justify-between mb-4">
                    <IconComponent className="w-8 h-8 text-neon-cyan group-hover:text-neon-purple transition" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition">
                    {doc.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition">
                    {doc.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 p-8 bg-dark-card/80 border border-dark-border rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-4">
            Can't find what you're looking for? Check out our community or contact support.
          </p>
          <div className="flex gap-4">
            <Link href="https://github.com/nexusforge/nexusforge" target="_blank" className="text-neon-cyan hover:text-neon-cyan/80 transition font-medium">
              GitHub →
            </Link>
            <Link href="mailto:support@nexusforge.dev" className="text-neon-purple hover:text-neon-purple/80 transition font-medium">
              Email →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
