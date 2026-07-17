import { describe, it, expect, vi, afterEach } from 'vitest'
import { verifyIntegrity } from '../../src/runtime/manifest-verify'
import { promises as fs, existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import os from 'node:os'

const CACHE_FILE = path.join(os.homedir(), '.bybit-cli/manifest-cache.json')

// The actual bundle path that manifest-verify looks for.
// Runs after `pnpm build` / `npm run build` — tests skip if not built.
const DIST_PATH = path.join(process.cwd(), 'dist', 'index.js')

function localSha(p: string): string {
  return createHash('sha256').update(readFileSync(p)).digest('hex')
}

describe('verifyIntegrity', () => {
  afterEach(async () => {
    try { await fs.rm(CACHE_FILE) } catch { /* ignore */ }
    vi.unstubAllGlobals()
  })

  it('returns "network-error" when fetch fails and no cache', async () => {
    vi.stubGlobal('fetch', () => Promise.reject(new Error('fetch failed')))
    const result = await verifyIntegrity()
    expect(result.status).toBe('network-error')
  })

  it('rejects manifest without `files` field (schema mismatch)', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ version: '0.0.1', sha256: {} }),  // old schema
    } as Response))
    const result = await verifyIntegrity()
    expect(result.status).toBe('network-error')  // caught as fetch-layer failure
  })

  it('returns "ok" when SHA matches manifest', async () => {
    if (!existsSync(DIST_PATH)) {
      console.warn('SKIP: dist/index.js not built')
      return
    }
    const actualSha = localSha(DIST_PATH)
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        version: '0.0.1',
        generated: '2026-07-16',
        files: { 'dist/index.js': 'sha256:' + actualSha },
      }),
    } as Response))
    const result = await verifyIntegrity()
    expect(result.status).toBe('ok')
    if (result.status === 'ok') {
      expect(result.filesChecked).toBeGreaterThan(0)
    }
  })

  it('returns "skew" when SHA does not match', async () => {
    if (!existsSync(DIST_PATH)) {
      console.warn('SKIP: dist/index.js not built')
      return
    }
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        version: '0.0.1',
        files: { 'dist/index.js': 'sha256:' + '0'.repeat(64) },
      }),
    } as Response))
    const result = await verifyIntegrity()
    expect(result.status).toBe('skew')
  })

  it('returns "no-files-locatable" when manifest lists only files that do not exist locally', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        version: '0.0.1',
        files: { 'nonexistent/file.js': 'sha256:deadbeef' },
      }),
    } as Response))
    const result = await verifyIntegrity()
    expect(result.status).toBe('no-files-locatable')
  })
})
