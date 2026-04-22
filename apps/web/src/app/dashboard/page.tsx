'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, BarChart3, AlertTriangle, CheckCircle2, Clock, CreditCard, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ScanState = 'idle' | 'scanning' | 'complete' | 'failed'

type ScanResult = {
  scanId: string
  status: string
  scanDuration: number
  componentsFound: number
  creditsDeducted?: number
  pbom?: {
    metadata: { name: string; generatedAt: string }
    riskSummary: { overallScore: number; highFindings: number; criticalFindings: number; mediumFindings: number }
    components: { id: string; name: string; type: string; riskLevel: string; riskScore: number }[]
  }
}

export default function DashboardPage() {
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [credits] = useState(100)

  async function runScan() {
    setScanState('scanning')
    setScanResult(null)
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pipelineId: crypto.randomUUID(),
          orgId: crypto.randomUUID(),
          path: '.',
          depth: 5,
          includeAI: true,
          signatureValidation: true,
          userId: 'demo-user',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Scan failed')
      setScanResult(data)
      setScanState('complete')
    } catch {
      setScanState('failed')
    }
  }

  const riskColor = (level: string) => ({
    critical: 'text-red-400',
    high: 'text-orange-400',
    medium: 'text-yellow-400',
    low: 'text-green-400',
    info: 'text-blue-400',
  }[level] ?? 'text-gray-400')

  const riskBg = (level: string) => ({
    critical: 'bg-red-400/10 border-red-400/30',
    high: 'bg-orange-400/10 border-orange-400/30',
    medium: 'bg-yellow-400/10 border-yellow-400/30',
    low: 'bg-green-400/10 border-green-400/30',
    info: 'bg-blue-400/10 border-blue-400/30',
  }[level] ?? 'bg-gray-400/10 border-gray-400/30')

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Pipeline Dashboard</h1>
            <p className="text-gray-400 mt-1">Scan, sign, and validate your CI/CD components</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300"><span className="text-cyan-400 font-bold">{credits}</span> credits</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Shield, label: 'Components Scanned', value: scanResult?.componentsFound ?? '—', color: 'text-cyan-400' },
            { icon: AlertTriangle, label: 'Risk Score', value: scanResult?.pbom?.riskSummary.overallScore ?? '—', color: 'text-yellow-400' },
            { icon: BarChart3, label: 'High Findings', value: scanResult?.pbom?.riskSummary.highFindings ?? '—', color: 'text-orange-400' },
            { icon: Clock, label: 'Scan Duration', value: scanResult ? `${scanResult.scanDuration}ms` : '—', color: 'text-purple-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-5">
              <Icon className={`w-5 h-5 ${color} mb-3`} />
              <p className={`text-2xl font-bold ${color}`}>{String(value)}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Scan Panel */}
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Run Pipeline Scan</h2>
              <p className="text-sm text-gray-400 mt-1">Discover all tools, dependencies, and AI components</p>
            </div>
            <Button
              onClick={runScan}
              disabled={scanState === 'scanning'}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-semibold px-6 hover:opacity-90 disabled:opacity-50"
            >
              {scanState === 'scanning' ? (
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 animate-spin" /> Scanning...</span>
              ) : (
                <span className="flex items-center gap-2"><Play className="w-4 h-4" /> Start Scan</span>
              )}
            </Button>
          </div>

          {/* Scanning animation */}
          {scanState === 'scanning' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {['Discovering CI/CD components...', 'Analyzing AI integrations...', 'Calculating risk scores...'].map((step, i) => (
                <motion.div key={step} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.4 }}
                  className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  {step}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Failed */}
          {scanState === 'failed' && (
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4" />
              Scan failed. Check that your API is running and credits are available.
            </div>
          )}

          {/* Complete */}
          {scanState === 'complete' && scanResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-green-400 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Scan complete — {scanResult.componentsFound} components found in {scanResult.scanDuration}ms
              {scanResult.creditsDeducted && <span className="text-gray-500 ml-2">({scanResult.creditsDeducted} credits used)</span>}
            </motion.div>
          )}
        </div>

        {/* Components Table */}
        {scanResult?.pbom?.components && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#2a2a2a]">
              <h2 className="text-lg font-semibold">Discovered Components</h2>
            </div>
            <div className="divide-y divide-[#2a2a2a]">
              {scanResult.pbom.components.map((comp) => (
                <div key={comp.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="font-medium text-white">{comp.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{comp.type}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${riskBg(comp.riskLevel)} ${riskColor(comp.riskLevel)}`}>
                    {comp.riskLevel} · {comp.riskScore}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
