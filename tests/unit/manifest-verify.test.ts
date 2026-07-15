import { describe, it, expect, vi, afterEach } from 'vitest'
import { verifyIntegrity } from '../../src/runtime/manifest-verify'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const CACHE_FILE = path.join(os.homedir(), '.bybit-cli/manifest-cache.json')

describe('verifyIntegrity', () => {
  afterEach(async () => {
    try { await fs.rm(CACHE_FILE) } catch { /* ignore */ }
    vi.unstubAllGlobals()
  })

  it('returns "placeholder" when manifest has PLACEHOLDER SHAs', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        version: '0.0.1',
        package: 'bybit-official-trading-cli',
        sha256: { 'dist/index.mjs': 'PLACEHOLDER_COMPUTED_AT_RELEASE' },
      }),
    } as Response))
    const result = await verifyIntegrity()
    expect(result.status).toBe('placeholder')
  })

  it('returns "network-error" when fetch fails and no cache', async () => {
    vi.stubGlobal('fetch', () => Promise.reject(new Error('fetch failed')))
    const result = await verifyIntegrity()
    expect(result.status).toBe('network-error')
  })

  it('returns "ok" when SHA matches manifest', async () => {
    // Use dist/index.mjs actual SHA
    const { createHash } = await import('node:crypto')
    const { readFileSync, existsSync } = await import('node:fs')
    const distPath = path.join(process.cwd(), 'dist', 'index.mjs')
    if (!existsSync(distPath)) {
      console.warn('SKIP: dist/index.mjs not built')
      return
    }
    const actualSha = createHash('sha256').update(readFileSync(distPath)).digest('hex')

    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        version: '0.0.1',
        package: 'bybit-official-trading-cli',
        sha256: { 'dist/index.mjs': actualSha },
      }),
    } as Response))
    const result = await verifyIntegrity()
    expect(result.status).toBe('ok')
  })

  it('returns "skew" when SHA does not match', async () => {
    const { existsSync } = await import('node:fs')
    const distPath = path.join(process.cwd(), 'dist', 'index.mjs')
    if (!existsSync(distPath)) {
      console.warn('SKIP: dist/index.mjs not built')
      return
    }
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        version: '0.0.1',
        package: 'bybit-official-trading-cli',
        sha256: { 'dist/index.mjs': 'wrong_sha_' + '0'.repeat(50) },
      }),
    } as Response))
    const result = await verifyIntegrity()
    expect(result.status).toBe('skew')
  })
})
