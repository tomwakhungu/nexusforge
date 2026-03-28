'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from '@supabase/auth-helpers-react'

type ScanViewState = 'idle' | 'scanning' | 'complete' | 'failed'

type ScanResponse = {
  scanId: string
  status: string
  scanDuration: number
  componentsFound: number
  creditsDeducted?: number
  pbom?: { metadata: { name: string; generatedAt: string }; riskSummary: { overallScore: number; highFindings: number } }
  error?: string
}

export default function DashboardPage() {
  const session = useSession()
  const queryClient = useQueryClient()
  const [trace, setTrace] = useState<ScanViewState>('idle')
  const [scanInfo, setScanInfo] = useState<ScanResponse | null>(null)

  const { data: credits } = useQuery({
    queryKey: ['credits'],
    queryFn: async () => {
      const res = await fetch(`/api/credits?userId=${session?.user?.id}`)
      return res.json()
    },
    enabled: !!session,
  })

  const scanMutation = useMutation(
    async () => {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pipelineId: crypto.randomUUID(),
          orgId: crypto.randomUUID(),
          path: '.',
          depth: 5,
          includeAI: true,
          signatureValidation: true,
          userId: session?.user?.id,
        }),
      })
      if (!response.ok) {
        throw new Error('Scan failed')
      }
      return response.json() as Promise<ScanResponse>
    },
    {
      onMutate: () => {
        setTrace('scanning')
      },
      onSuccess: (data) => {
        setScanInfo(data)
        setTrace('complete')
        queryClient.invalidateQueries(['credits'])
      },
      onError: () => {
        setTrace('failed')
      },
    }
  )

  if (!session) {
    return <div>Please sign in</div>
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10 md:px-16">
      <section className="mb-8 flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-cyan-300 leading-tight">NexusForge Dashboard</h1>
        <p className="text-slate-300 max-w-2xl">Phase 1: PBOM discovery + GitHub PR feedback path. Credits: {credits?.credits || 0}</p>
      </section>

      <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-500/10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-violet-300">Ephemeral QuickScan (zero-config demo)</h2>
          <button
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 font-semibold text-slate-950 hover:opacity-90 active:scale-95 transition"
            onClick={() => scanMutation.mutate()}
            disabled={trace === 'scanning'}
          >
            {trace === 'scanning' ? 'Scanning…' : 'Start Scan'}
          </button>
        </div>

        <div className="space-y-3">
          <p>State: <span className="font-semibold text-cyan-200">{trace}</span></p>
          {scanInfo && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-cyan-400/30 bg-slate-950 p-4"
            >
              <p className="text-cyan-200">Scan ID: {scanInfo.scanId}</p>
              <p>Found {scanInfo.componentsFound} components in {scanInfo.scanDuration}ms</p>
              <p>Credits deducted: {scanInfo.creditsDeducted}</p>
              <p>Overall risk: {scanInfo.pbom?.riskSummary.overallScore}</p>
              <p>High findings: {scanInfo.pbom?.riskSummary.highFindings}</p>
              <p className="text-orange-300 mt-2">{scanInfo.error || 'No issues flagged yet (demo data)'}</p>
            </motion.div>
          )}
        </div>
      </section>

      {scanInfo && scanInfo.status === 'completed' && (
        <section className="mt-8 rounded-2xl border border-violet-500/30 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-cyan-200">GitHub PR Safety Feedback</h3>
          <p className="text-sm text-slate-300 mb-4">Simulated PR comment content for secure pipeline approval workflows.</p>
          <button
            className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 font-semibold text-slate-950 hover:opacity-90 active:scale-95 transition"
            onClick={async () => {
              const response = await fetch('/api/github-pr-comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  owner: 'nexusforge-demo',
                  repo: 'repository',
                  pullNumber: 42,
                  comment: `PBOM scan completed with overall risk ${scanInfo.pbom?.riskSummary.overallScore}. High findings: ${scanInfo.pbom?.riskSummary.highFindings}. Improve workflow lock-down and dependency pinning.`,
                }),
              })
              const body = await response.json()
              alert(body.message)
            }}
          >
            Post PR Comment (Demo)
          </button>
        </section>
      )}

      <section className="mt-8">
        <p className="text-sm text-slate-400">Next: GitHub PR comment preview, attack graph explorer, and Sigstore proof chain coming in Phase 2.</p>
      </section>
    </main>
  )
}
