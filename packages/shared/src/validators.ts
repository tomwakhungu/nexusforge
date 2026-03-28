import { PBOMSchema, ScanRequestSchema, PipelineComponentSchema } from './types'

/**
 * Validate a PBOM document
 */
export function validatePBOM(data: unknown) {
  return PBOMSchema.safeParse(data)
}

/**
 * Validate a scan request
 */
export function validateScanRequest(data: unknown) {
  return ScanRequestSchema.safeParse(data)
}

/**
 * Validate a pipeline component
 */
export function validateComponent(data: unknown) {
  return PipelineComponentSchema.safeParse(data)
}

/**
 * Calculate overall risk score from components
 */
export function calculateRiskScore(components: typeof PipelineComponentSchema._type[]): number {
  if (components.length === 0) return 0
  const totalScore = components.reduce((sum, comp) => sum + comp.riskScore, 0)
  return Math.round(totalScore / components.length)
}
