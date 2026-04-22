import { randomUUID } from 'crypto'

type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'info'

type ComponentType =
  | 'ci-cd-platform'
  | 'build-tool'
  | 'package-manager'
  | 'container-runtime'
  | 'ai-model'
  | 'deployment-tool'
  | 'secret-manager'
  | 'artifact-registry'
  | 'unknown'

type PipelineComponent = {
  id: string
  name: string
  type: ComponentType
  version: string
  source: string
  riskScore: number
  riskLevel: RiskLevel
  lastValidated: string
}

export function discoverComponents(includeAI = true): PipelineComponent[] {
  const components: PipelineComponent[] = [
    {
      id: randomUUID(),
      name: 'GitHub Actions Runner',
      type: 'ci-cd-platform',
      version: '2.311.0',
      source: 'github.com/actions/runner',
      riskScore: 35,
      riskLevel: 'medium',
      lastValidated: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      name: 'Docker',
      type: 'container-runtime',
      version: '24.0.7',
      source: 'docker.com',
      riskScore: 20,
      riskLevel: 'low',
      lastValidated: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      name: 'npm',
      type: 'package-manager',
      version: '10.2.4',
      source: 'npmjs.com',
      riskScore: 15,
      riskLevel: 'low',
      lastValidated: new Date().toISOString(),
    },
  ]

  if (includeAI) {
    components.push({
      id: randomUUID(),
      name: 'OpenAI GPT-4',
      type: 'ai-model',
      version: 'gpt-4-0125-preview',
      source: 'api.openai.com',
      riskScore: 55,
      riskLevel: 'medium',
      lastValidated: new Date().toISOString(),
    })
  }

  return components
}
