import { randomUUID } from 'crypto'
import type { ScanRequest, ScanResult, PipelineComponent } from '../../../packages/shared/src/types'

/**
 * Mock PBOM generator — replace with real discovery logic
 */
export function generatePBOM(request: ScanRequest): ScanResult {
  const start = Date.now()

  const mockComponents: PipelineComponent[] = [
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
      type: 'build-tool',
      version: '24.0.7',
      source: 'docker.com',
      riskScore: 20,
      riskLevel: 'low',
      lastValidated: new Date().toISOString(),
    },
  ]

  if (request.includeAI) {
    mockComponents.push({
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

  const scanDuration = Date.now() - start

  return {
    scanId: randomUUID(),
    status: 'completed',
    scanDuration,
    componentsFound: mockComponents.length,
    pbom: {
      version: '1.0.0',
      metadata: {
        id: randomUUID(),
        name: `Pipeline Scan — ${new Date().toISOString()}`,
        generatedAt: new Date().toISOString(),
        tool: 'nexusforge-scanner',
        toolVersion: '0.1.0',
      },
      components: mockComponents,
      vulnerabilities: [],
      attackPaths: [],
      riskSummary: {
        overallScore: 37,
        criticalFindings: 0,
        highFindings: 0,
        mediumFindings: 2,
      },
    },
  }
}

/**
 * Estimate credit cost based on number of components
 */
export function estimateCreditCost(components: PipelineComponent[]): number {
  const base = 10
  const perComponent = 5
  return base + components.length * perComponent
}
