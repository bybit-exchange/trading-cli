import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { checkClockSkew, ensureClockSynced, ClockSkewError } from '../../src/runtime/time-sync'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const CACHE_FILE = path.join(os.homedir(), '.bybit-cli/clock-check')

describe('time-sync', () => {
  beforeEach(async () => {
    try { await fs.rm(CACHE_FILE) } catch { /* ignore */ }
  })
  afterEach(() => { vi.unstubAllGlobals() })

  it('checkClockSkew returns |local - server| in ms', async () => {
    const nowSec = Math.floor(Date.now() / 1000)
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true, status: 200,
      json: () => Promise.resolve({ result: { timeSecond: String(nowSec) } }),
    } as Response))
    const skew = await checkClockSkew('testnet')
    expect(skew).toBeLessThan(2000)
  })

  it('ensureClockSynced throws when skew > 5s', async () => {
    const staleSec = Math.floor(Date.now() / 1000) - 60
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true, status: 200,
      json: () => Promise.resolve({ result: { timeSecond: String(staleSec) } }),
    } as Response))
    await expect(ensureClockSynced('testnet')).rejects.toThrow(ClockSkewError)
  })

  it('ensureClockSynced caches result and skips within 24h', async () => {
    const nowSec = Math.floor(Date.now() / 1000)
    const fetchSpy = vi.fn(() => Promise.resolve({
      ok: true, status: 200,
      json: () => Promise.resolve({ result: { timeSecond: String(nowSec) } }),
    } as Response))
    vi.stubGlobal('fetch', fetchSpy)

    await ensureClockSynced('testnet')
    await ensureClockSynced('testnet')  // 2nd call should hit cache
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })
})
