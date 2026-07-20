import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Package version, read once at module load. Used in User-Agent.
 * Same discovery pattern as manifest-verify's readPackageJsonVersion — try both
 * layouts (dev tree vs bundled npm install).
 */
function readVersion(): string {
  const candidates = [
    path.join(__dirname, '..', '..', 'package.json'),
    path.join(__dirname, '..', 'package.json'),
  ]
  for (const p of candidates) {
    try {
      return JSON.parse(readFileSync(p, 'utf-8')).version as string
    } catch { /* try next */ }
  }
  return 'unknown'
}

const VERSION = readVersion()

/**
 * Shared outbound headers for every fetch that hits Bybit infrastructure
 * (api.bybit.com V5, manifest, market/time). Enables server-side traffic
 * analytics separating CLI users from other clients.
 *
 * - X-Referer: matches convention used by bybit-trading skill ('bybit-skill').
 *   Values are agreed with Bybit backend team — do not change without
 *   coordinating, otherwise metrics dashboards break.
 * - User-Agent: version-tagged so a broken release can be diffed in logs.
 */
export function commonHeaders(): Record<string, string> {
  return {
    'X-Referer': 'bybit-ai-cli',
    'User-Agent': `bybit-official-trading-cli/${VERSION}`,
  }
}
