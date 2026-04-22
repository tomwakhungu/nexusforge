import { randomUUID } from 'crypto'

export function generatePBOM(request: any) {
  const start = Date.now()

  const components: any[] = [
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

  return {
    scanId: randomUUID(),
    status: 'completed',
    scanDuration: Date.now() - start,
    componentsFound: components.length,
    creditsDeducted: 10 + components.length * 5,
    pbom: {
      metadata: {
        id: randomUUID(),
        name: `Pipeline Scan — ${new Date().toISOString()}`,
        generatedAt: new Date().toISOString(),
      },
      riskSummary: {
        overallScore: 37,
        criticalFindings: 0,
        highFindings: 0,
        mediumFindings: 2,
      },
      components,
    },
  }
}

export function estimateCreditCost(components: any[]): number {
  return 10 + components.length * 5
}
