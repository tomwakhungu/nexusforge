import { describe, it, expect } from 'vitest'
import { discoverComponents } from './discovery'

describe('discoverComponents', () => {
  it('returns components', () => {
    const result = discoverComponents()
    expect(result.length).toBeGreaterThan(0)
  })

  it('includes AI components when flag is true', () => {
    const result = discoverComponents(true)
    const hasAI = result.some(c => c.type === 'ai-model')
    expect(hasAI).toBe(true)
  })

  it('excludes AI components when flag is false', () => {
    const result = discoverComponents(false)
    const hasAI = result.some(c => c.type === 'ai-model')
    expect(hasAI).toBe(false)
  })
})
