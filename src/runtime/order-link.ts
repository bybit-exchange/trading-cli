import { createHash } from 'node:crypto'

/**
 * Generate a deterministic orderLinkId from argv + current second.
 * Idempotent: same argv in the same second → same id (so agent retries dedup).
 * Distinct: different argv or different second → different id.
 *
 * Bybit enforces orderLinkId uniqueness per user, so this guards against
 * accidental duplicate order creation from network retries or agent loops.
 */
export function makeOrderLinkId(argv: any): string {
  const keys = Object.keys(argv).sort().filter(k => k !== '_' && k !== '$0' && k !== 'yes' && k !== 'json-schema')
  const canonical = keys.map(k => `${k}=${String(argv[k])}`).join('|')
  const secondBucket = Math.floor(Date.now() / 1000)
  const hash = createHash('sha256').update(`${canonical}|${secondBucket}`).digest('hex')
  return `cli-${hash.slice(0, 16)}`  // 16 hex chars = 64 bits, fits Bybit's orderLinkId limit
}
