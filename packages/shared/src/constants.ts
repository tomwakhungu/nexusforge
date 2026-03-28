/**
 * Supported CI/CD platforms
 */
export const SUPPORTED_CI_CD_PLATFORMS = [
  'github-actions',
  'gitlab-ci',
  'jenkins',
  'circleci',
  'github-actions',
  'travis-ci',
  'drone',
  'argocd',
]

/**
 * Dashboard feature flags
 */
export const FEATURE_FLAGS = {
  aiCopilot: 'ai-copilot',
  threatIntel: 'threat-intel',
  complianceReports: 'compliance-reports',
  attackGraphs: 'attack-graphs',
  slackIntegration: 'slack-integration',
  teamsIntegration: 'teams-integration',
  discordIntegration: 'discord-integration',
} as const

/**
 * Risk score thresholds
 */
export const RISK_THRESHOLDS = {
  critical: 80,
  high: 60,
  medium: 40,
  low: 20,
  info: 0,
} as const

/**
 * Scanner tool names
 */
export const KNOWN_TOOLS = {
  buildTools: ['docker', 'gradle', 'maven', 'npm', 'yarn', 'pnpm', 'go', 'rust', 'python'],
  versionControl: ['git', 'github', 'gitlab', 'bitbucket'],
  cicdPlatforms: [
    'github-actions',
    'gitlab-ci',
    'jenkins',
    'circleci',
    'travis',
    'github-actions',
  ],
  iacTools: ['terraform', 'cloudformation', 'pulumi', 'cdk', 'helm'],
  containerTools: ['docker', 'podman', 'kubernetes', 'helm'],
  aiServices: [
    'openai',
    'anthropic',
    'google-ai',
    'huggingface',
    'cohere',
    'mistral',
    'llama',
  ],
} as const

/**
 * API version
 */
export const API_VERSION = 'v1'

/**
 * Default pagination limit
 */
export const DEFAULT_LIMIT = 50
export const MAX_LIMIT = 500
