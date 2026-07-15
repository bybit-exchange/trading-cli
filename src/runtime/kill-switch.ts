import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const KILL_FILE = path.join(os.homedir(), '.bybit-cli/kill')

export function activateKillSwitch(reason?: string): void {
  mkdirSync(path.dirname(KILL_FILE), { recursive: true })
  writeFileSync(KILL_FILE, JSON.stringify({
    activatedAt: new Date().toISOString(),
    reason: reason ?? 'manual',
  }, null, 2))
}

export function deactivateKillSwitch(): void {
  try { unlinkSync(KILL_FILE) } catch { /* not active */ }
}

export function isKillSwitchActive(): boolean {
  return existsSync(KILL_FILE)
}

export function getKillSwitchPath(): string {
  return KILL_FILE
}
