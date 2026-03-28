'use client'

import { useEffect, useState } from 'react'
import ReactFlow, { Node, Edge, Background, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import { motion } from 'framer-motion'

type GraphData = {
  nodes: Node[]
  edges: Edge[]
}

export default function AttackGraphPage() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] })

  useEffect(() => {
    // Mock data for demonstration
    const nodes: Node[] = [
      { id: '1', position: { x: 100, y: 100 }, data: { label: 'GitHub Actions Runner' }, style: { background: '#ff6b6b' } },
      { id: '2', position: { x: 300, y: 100 }, data: { label: 'Terraform Provider' }, style: { background: '#4ecdc4' } },
      { id: '3', position: { x: 500, y: 100 }, data: { label: 'OpenAI GPT-4.1' }, style: { background: '#45b7d1' } },
    ]
    const edges: Edge[] = [
      { id: 'e1-3', source: '1', target: '3', label: 'High Risk Path', style: { stroke: '#ff6b6b' } },
    ]
    setGraphData({ nodes, edges })
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-300 leading-tight">Attack Path Graph</h1>
        <p className="text-slate-300 max-w-2xl">Interactive visualization of pipeline attack paths and risk correlations.</p>
      </section>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-500/10 h-96"
      >
        <ReactFlow nodes={graphData.nodes} edges={graphData.edges}>
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </motion.div>
    </main>
  )
}
