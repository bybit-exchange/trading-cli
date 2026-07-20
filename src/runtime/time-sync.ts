import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { HOSTS, type BybitEnv } from './hosts.js'
import { commonHeaders } from './http-headers.js'

const CACHE_FILE = path.join(os.homedir(), '.bybit-cli/clock-check')
const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000
const SKEW_TOLERANCE_MS = 5000

export class ClockSkewError extends Error {
  constructor(public skewMs: number) {
    super(`clock skew ${skewMs}ms exceeds recvWindow (${SKEW_TOLERANCE_MS}ms)`)
    this.name = 'ClockSkewError'
  }
}

async function isCheckFresh(): Promise<boolean> {
  try {
    const stat = await fs.stat(CACHE_FILE)
    return Date.now() - stat.mtimeMs < CHECK_INTERVAL_MS
  } catch {
    return false
  }
}

export async function checkClockSkew(env: BybitEnv): Promise<number> {
  const res = await fetch(HOSTS[env] + '/v5/market/time', { headers: commonHeaders() })
  const body = await res.json() as { result?: { timeSecond?: string } }
  const serverSec = Number(body.result?.timeSecond ?? 0)
  if (!serverSec) throw new Error('unable to parse server time')
  const serverMs = serverSec * 1000
  return Math.abs(Date.now() - serverMs)
}

/**
 * Idempotent. Checks clock skew against Bybit and caches result for 24h.
 * Throws ClockSkewError if skew exceeds tolerance.
 */
export async function ensureClockSynced(env: BybitEnv): Promise<void> {
  if (await isCheckFresh()) return

  const skewMs = await checkClockSkew(env)
  if (skewMs > SKEW_TOLERANCE_MS) throw new ClockSkewError(skewMs)

  await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
  await fs.writeFile(CACHE_FILE, String(Date.now()))
}
