import { z } from 'zod'

/**
 * Risk level classification
 */
export const RiskLevelSchema = z.enum(['critical', 'high', 'medium', 'low', 'info'])
export type RiskLevel = z.infer<typeof RiskLevelSchema>

/**
 * Component type in a pipeline
 */
export const ComponentTypeSchema = z.enum([
  'build-tool',
  'version-control',
  'ci-cd-platform',
  'container-registry',
  'dependency-manager',
  'iac-tool',
  'ai-model',
  'llm-service',
  'rag-pipeline',
  'embedding-service',
  'webhook',
  'plugin',
  'custom',
])
export type ComponentType = z.infer<typeof ComponentTypeSchema>

/**
 * Single component in a pipeline
 */
export const PipelineComponentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: ComponentTypeSchema,
  version: z.string(),
  source: z.string(),
  sourceHash: z.string().optional(),
  sigstoreSignature: z.string().optional(),
  riskScore: z.number().min(0).max(100),
  riskLevel: RiskLevelSchema,
  lastValidated: z.string().datetime().optional(),
  metadata: z.record(z.any()).optional(),
})
export type PipelineComponent = z.infer<typeof PipelineComponentSchema>

/**
 * Vulnerability finding
 */
export const VulnerabilitySchema = z.object({
  id: z.string(),
  cveId: z.string().optional(),
  severity: RiskLevelSchema,
  description: z.string(),
  affectedComponent: z.string(),
  remediationAdvice: z.string().optional(),
  discoveredAt: z.string().datetime(),
})
export type Vulnerability = z.infer<typeof VulnerabilitySchema>

/**
 * Attack path edge
 */
export const AttackPathEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  riskScore: z.number().min(0).max(100),
  vulnerability: z.string().optional(),
})
export type AttackPathEdge = z.infer<typeof AttackPathEdgeSchema>

/**
 * Complete PBOM document
 */
export const PBOMSchema = z.object({
  version: z.string(),
  metadata: z.object({
    id: z.string().uuid(),
    name: z.string(),
    generatedAt: z.string().datetime(),
    tool: z.string(),
    toolVersion: z.string(),
  }),
  components: z.array(PipelineComponentSchema),
  vulnerabilities: z.array(VulnerabilitySchema),
  attackPaths: z.array(AttackPathEdgeSchema),
  riskSummary: z.object({
    overallScore: z.number().min(0).max(100),
    criticalFindings: z.number(),
    highFindings: z.number(),
    mediumFindings: z.number(),
  }),
})
export type PBOM = z.infer<typeof PBOMSchema>

/**
 * Scan request
 */
export const ScanRequestSchema = z.object({
  pipelineId: z.string().uuid(),
  orgId: z.string().uuid(),
  path: z.string().optional(),
  depth: z.number().min(1).max(10).default(5),
  includeAI: z.boolean().default(true),
  signatureValidation: z.boolean().default(true),
})
export type ScanRequest = z.infer<typeof ScanRequestSchema>

/**
 * Scan result
 */
export const ScanResultSchema = z.object({
  scanId: z.string().uuid(),
  status: z.enum(['completed', 'in-progress', 'failed']),
  pbom: PBOMSchema.optional(),
  error: z.string().optional(),
  scanDuration: z.number(), // milliseconds
  componentsFound: z.number(),
})
export type ScanResult = z.infer<typeof ScanResultSchema>
