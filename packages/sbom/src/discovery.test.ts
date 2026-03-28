import { discoverGitHubActions, discoverTerraform, discoverAIComponents } from './discovery'
import { writeFileSync, mkdirSync, rmSync } from 'fs'
import { join } from 'path'

const tmpDir = join(__dirname, '__tmp_test')

beforeAll(() => {
  rmSync(tmpDir, { recursive: true, force: true })
  mkdirSync(tmpDir, { recursive: true })
})

afterAll(() => {
  rmSync(tmpDir, { recursive: true, force: true })
})

test('discoverGitHubActions returns component from dummy workflow', () => {
  const workflowDir = join(tmpDir, '.github', 'workflows')
  mkdirSync(workflowDir, { recursive: true })
  writeFileSync(join(workflowDir, 'ci.yml'), 'name: CI\non:\n  push:\n  jobs:\n    build:\n      runs-on: ubuntu-latest\n      steps:\n      - uses: actions/checkout@v4\n', 'utf8')

  const results = discoverGitHubActions(tmpDir)
  expect(results.length).toBeGreaterThanOrEqual(2)
  expect(results.some((item) => item.name.includes('GitHub Actions'))).toBe(true)
})

test('discoverAIComponents picks up model manifest file', () => {
  writeFileSync(join(tmpDir, 'model.json'), JSON.stringify({ model: 'gpt-4.1', version: '2026' }))
  const results = discoverAIComponents(tmpDir)
  expect(results.length).toBe(1)
  expect(results[0].type).toBe('ai-model')
})

// Terraform detection is optional to avoid heavy file boilerplate

test('discoverTerraform scans for tf provider declarations', () => {
  const terraformDir = join(tmpDir, 'terraform')
  mkdirSync(terraformDir, { recursive: true })
  writeFileSync(join(terraformDir, 'main.tf'), 'provider "aws" {}', 'utf8')
  const results = discoverTerraform(tmpDir)
  expect(results.length).toBeGreaterThan(0)
  expect(results[0].name).toContain('Terraform provider')
})
