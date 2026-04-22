import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { randomUUID } from 'crypto'
import { parse as parseYAML } from 'yaml'
import { PipelineComponent, ComponentType, RiskLevel } from '@nexusforge/shared'

const isWorkflowFile = (name: string) => name.endsWith('.yml') || name.endsWith('.yaml')

function inferRiskScore(type: ComponentType) {
  switch (type) {
    case 'ci-cd-platform':
      return 24
    case 'dependency-manager':
      return 30
    case 'iac-tool':
      return 45
    case 'ai-model':
      return 60
    case 'llm-service':
      return 55
    case 'rag-pipeline':
      return 65
    default:
      return 25
  }
}

function inferRiskLevel(score: number): RiskLevel {
  if (score >= 90) return 'critical'
  if (score >= 70) return 'high'
  if (score >= 45) return 'medium'
  if (score >= 20) return 'low'
  return 'info'
}

function componentFromDiscovery(name: string, type: ComponentType, version: string, source: string): PipelineComponent {
  const riskScore = inferRiskScore(type)
  return {
    id: randomUUID(),
    name,
    type,
    version,
    source,
    riskScore,
    riskLevel: inferRiskLevel(riskScore),
    metadata: {
      discoveredAt: new Date().toISOString(),
      tool: 'nexusforge-discovery',
    },
  }
}

export function discoverGitHubActions(rootPath: string): PipelineComponent[] {
  const candidateDir = join(rootPath, '.github', 'workflows')
  const components: PipelineComponent[] = []

  try {
    const files = readdirSync(candidateDir)
    for (const file of files) {
      if (!isWorkflowFile(file)) continue
      const content = readFileSync(join(candidateDir, file), 'utf8')
      const parsed = parseYAML(content) as any
      const workflowName = parsed?.name ?? file

      components.push(componentFromDiscovery(`GitHub Actions: ${workflowName}`, 'ci-cd-platform', parsed?.on ? 'detected' : 'unknown', `file://${join(candidateDir, file)}`))

      const jobs = parsed?.jobs ?? {}
      for (const [, job] of Object.entries(jobs)) {
        const steps = (job as any)?.steps;
        if (Array.isArray(steps)) {
          const uses = steps.filter((s: any) => typeof s === 'object' && s.uses).map((s: any) => s.uses) ?? [];
          for (const useRef of uses) {
            components.push(componentFromDiscovery(`Action step: ${String(useRef)}`, 'plugin', 'latest', `github.com/${String(useRef)}`));
          }
        }
      }
    }
  } catch {
    // no workflows -> ignore
  }

  return components
}

export function discoverTerraform(rootPath: string): PipelineComponent[] {
  const components: PipelineComponent[] = []

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (entry.endsWith('.tf')) {
        const text = readFileSync(fullPath, 'utf8')
        if (/provider\s+"([^"]+)"/g.test(text)) {
          const m = /provider\s+"([^"]+)"/.exec(text)
          const provider = m ? m[1] : 'unknown'
          components.push(componentFromDiscovery(`Terraform provider ${provider}`, 'iac-tool', 'unknown', `file://${fullPath}`))
        }
      }
    }
  }

  try {
    walk(join(rootPath, 'terraform'))
  } catch {
    // optional
  }

  return components
}

export function discoverAIComponents(rootPath: string): PipelineComponent[] {
  const components: PipelineComponent[] = []

  try {
    const files = readdirSync(rootPath)
    for (const file of files) {
      if (extname(file).toLowerCase() === '.json') {
        const text = readFileSync(join(rootPath, file), 'utf8')
        if (text.includes('llm') || text.includes('model')) {
          try {
            const parsed = JSON.parse(text) as any
            if (parsed?.model || parsed?.llm) {
              components.push(componentFromDiscovery(`Model manifest ${file}`, 'ai-model', parsed?.version ?? 'unknown', `file://${join(rootPath, file)}`))
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    }
  } catch {
    // ignore
  }

  return components
}

export function aggregateDiscovery(rootPath: string) {
  const gh = discoverGitHubActions(rootPath)
  const tf = discoverTerraform(rootPath)
  const ai = discoverAIComponents(rootPath)
  const all = [...gh, ...tf, ...ai]
  return all
}
