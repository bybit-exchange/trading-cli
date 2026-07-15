import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const FP_FILE = path.join(os.homedir(), '.bybit-cli/key-fingerprint')

/**
 * Lightweight key-change detector: sha256(env + key) stored on disk.
 * If it changes across invocations, we warn the user — this catches:
 * - env-var pollution (a different shell profile changed BYBIT_API_KEY)
 * - accidental mainnet/testnet swap
 * Doesn't require an extra API call. Doesn't stop execution — just stderr warns.
 */
export function checkKeyFingerprint(env: string, key: string): void {
  const currentFp = createHash('sha256').update(`${env}|${key}`).digest('hex').slice(0, 16)
  mkdirSync(path.dirname(FP_FILE), { recursive: true })

  if (!existsSync(FP_FILE)) {
    writeFileSync(FP_FILE, currentFp)
    process.stderr.write(`ℹ️  first use — recorded key fingerprint (${env})\n`)
    return
  }

  const priorFp = readFileSync(FP_FILE, 'utf-8').trim()
  if (priorFp !== currentFp) {
    process.stderr.write(
      `⚠️  API key or env changed since last use.\n` +
      `    prior fingerprint: ${priorFp}\n` +
      `    current: ${currentFp} (${env})\n` +
      `    if intentional, continue; if not, verify $BYBIT_API_KEY and $BYBIT_ENV.\n` +
      `    to reset: rm ${FP_FILE}\n`
    )
    writeFileSync(FP_FILE, currentFp)
  }
}
