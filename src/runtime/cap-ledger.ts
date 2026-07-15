import { existsSync, mkdirSync, appendFileSync, readFileSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const LEDGER_FILE = path.join(os.homedir(), '.bybit-cli/spend-ledger.jsonl')
const WINDOW_MS = 60 * 60 * 1000  // 1 hour rolling

export type LedgerEntry = {
  ts: number
  operation: string
  estimatedUsd: number | null  // null when CLI can't estimate
}

export function recordOrder(entry: Omit<LedgerEntry, 'ts'>): void {
  mkdirSync(path.dirname(LEDGER_FILE), { recursive: true })
  const record: LedgerEntry = { ts: Date.now(), ...entry }
  appendFileSync(LEDGER_FILE, JSON.stringify(record) + '\n')
}

function readEntries(): LedgerEntry[] {
  if (!existsSync(LEDGER_FILE)) return []
  const raw = readFileSync(LEDGER_FILE, 'utf-8')
  const cutoff = Date.now() - WINDOW_MS
  return raw
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line) as LedgerEntry)
    .filter(e => e.ts >= cutoff)
}

export function getHourlyStats(): { totalUsd: number; orderCount: number; hasUnknownEstimates: boolean } {
  const entries = readEntries()
  let totalUsd = 0
  let hasUnknownEstimates = false
  for (const e of entries) {
    if (e.estimatedUsd == null) hasUnknownEstimates = true
    else totalUsd += e.estimatedUsd
  }
  return {
    totalUsd,
    orderCount: entries.length,
    hasUnknownEstimates,
  }
}

/** Estimate USD value from write-op argv. Returns null if unknowable. */
export function estimateUsd(argv: any): number | null {
  const qty = Number(argv.qty)
  const price = Number(argv.price)
  if (Number.isFinite(qty) && Number.isFinite(price) && qty > 0 && price > 0) {
    return qty * price
  }
  // spot with marketUnit=quoteCoin means qty is already USDT
  if (argv['market-unit'] === 'quoteCoin' && Number.isFinite(qty) && qty > 0) {
    return qty
  }
  return null
}
