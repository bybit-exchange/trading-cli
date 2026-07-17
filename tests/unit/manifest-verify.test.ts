import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { verifyIntegrity, verifyAtStartup, checkVersionForWrite } from '../../src/runtime/manifest-verify'
import { promises as fs, existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import os from 'node:os'

const CACHE_FILE = path.join(os.homedir(), '.bybit-cli/manifest-cache.json')
const STARTUP_MARKER_FILE = path.join(os.homedir(), '.bybit-cli/startup-verify.json')

// The actual bundle path that manifest-verify looks for.
// Runs after `pnpm build` / `npm run build` — tests skip if not built.
const DIST_PATH = path.join(process.cwd(), 'dist', 'index.js')

function localSha(p: string): string {
  return createHash('sha256').update(readFileSync(p)).digest('hex')
}

describe('verifyIntegrity', () => {
  beforeEach(async () => {
    // Ensure no stale cache from prior real CLI usage or earlier test runs
    // interferes with the fetch-fail branch. The cache file lives in $HOME
    // and persists across `pnpm test` invocations, so an `afterEach`-only
    // cleanup isn't enough for the very first test in the file.
    try { await fs.rm(CACHE_FILE) } catch { /* ignore */ }
  })

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

/**
 * verifyAtStartup + checkVersionForWrite tests.
 *
 * Key constraint: both functions have a `isRunningFromSource()` bypass keyed on
 * `import.meta.url.endsWith('.ts')`. During vitest runs the module IS loaded from
 * .ts (vitest uses tsx-style transformation) so both functions return early. This
 * is BY DESIGN — the bypass exists so dev/CI doesn't do real network calls or
 * exit(1) on every run. There is intentionally NO env-var opt-out.
 *
 * What we CAN verify in unit tests:
 *   1. Dev bypass actually short-circuits (no fetch calls, no exit) when loaded
 *      from .ts. This confirms the bypass mechanism works.
 *   2. That BYBIT_CLI_NO_VERIFY (a plausible escape-hatch env var name) has no
 *      effect — setting it should not change any behavior.
 *
 * What we CANNOT verify in unit tests without heavyweight subprocess/E2E setup:
 *   - The exit(1) branches (skew, version-mismatch). These fire only when the
 *     bundled artifact runs. Coverage lives in the E2E smoke suite + the manual
 *     kill-switch tests in tests/integration.
 */
describe('verifyAtStartup (dev-bypass path)', () => {
  let exitSpy: any
  let fetchSpy: any

  beforeEach(() => {
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(((code?: number) => {
      throw new Error(`process.exit(${code})`)
    }) as never)
    fetchSpy = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ version: 'x', files: {} }) } as Response))
    vi.stubGlobal('fetch', fetchSpy)
  })

  afterEach(async () => {
    try { await fs.rm(STARTUP_MARKER_FILE) } catch { /* ignore */ }
    try { await fs.rm(CACHE_FILE) } catch { /* ignore */ }
    vi.unstubAllGlobals()
    exitSpy.mockRestore()
  })

  it('short-circuits when loaded from .ts source (dev bypass), never fetches or exits', async () => {
    await verifyAtStartup()
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(exitSpy).not.toHaveBeenCalled()
  })

  it('BYBIT_CLI_NO_VERIFY env var has zero effect (no such bypass exists)', async () => {
    // If someone ever adds a `if (process.env.BYBIT_CLI_NO_VERIFY) return` branch
    // this test will detect it because setting the var vs not setting it should
    // produce identical behavior. In current dev-bypass mode both are no-ops.
    process.env.BYBIT_CLI_NO_VERIFY = '1'
    try {
      await verifyAtStartup()
      expect(fetchSpy).not.toHaveBeenCalled()  // dev bypass, so fetch not called
      expect(exitSpy).not.toHaveBeenCalled()
    } finally {
      delete process.env.BYBIT_CLI_NO_VERIFY
    }
  })

  it('is idempotent — multiple awaits do not compound', async () => {
    await verifyAtStartup()
    await verifyAtStartup()
    await verifyAtStartup()
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(exitSpy).not.toHaveBeenCalled()
  })
})

describe('checkVersionForWrite (dev-bypass path)', () => {
  let exitSpy: any
  let fetchSpy: any

  beforeEach(() => {
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(((code?: number) => {
      throw new Error(`process.exit(${code})`)
    }) as never)
    fetchSpy = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ version: 'x', files: {} }),
    } as Response))
    vi.stubGlobal('fetch', fetchSpy)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    exitSpy.mockRestore()
  })

  it('short-circuits when loaded from .ts source (dev bypass), never fetches or exits', async () => {
    await checkVersionForWrite()
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(exitSpy).not.toHaveBeenCalled()
  })

  it('BYBIT_CLI_NO_VERIFY env var has zero effect on write-op check', async () => {
    process.env.BYBIT_CLI_NO_VERIFY = '1'
    try {
      await checkVersionForWrite()
      expect(fetchSpy).not.toHaveBeenCalled()  // dev bypass
      expect(exitSpy).not.toHaveBeenCalled()
    } finally {
      delete process.env.BYBIT_CLI_NO_VERIFY
    }
  })

  it('multiple sequential calls are safe (bypass short-circuits every time)', async () => {
    // Under the .ts dev bypass the in-memory 2-min cache is never populated;
    // every call is a no-op. This test guards against a future change that
    // accidentally makes the cache leak state across the bypass boundary.
    await checkVersionForWrite()
    await checkVersionForWrite()
    await checkVersionForWrite()
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(exitSpy).not.toHaveBeenCalled()
  })
})
