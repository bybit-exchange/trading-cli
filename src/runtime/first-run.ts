import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { createInterface } from 'node:readline/promises'
import { installSkill } from './install-skill.js'

const MARKER_FILE = path.join(os.homedir(), '.bybit-cli/first-run-done')

// Detect installed agent platforms without writing anything.
function detectPlatforms(): string[] {
  const HOME = os.homedir()
  const candidates: Array<[string, string]> = [
    ['Claude Code', path.join(HOME, '.claude/skills')],
    ['OpenClaw', path.join(HOME, '.openclaw/skills')],
    ['Cursor', path.join(HOME, '.cursor/skills')],
    ['Windsurf', path.join(HOME, '.windsurf/skills')],
    ['Codex', path.join(HOME, '.codex/skills')],
  ]
  return candidates.filter(([, dir]) => existsSync(dir)).map(([name]) => name)
}

function markerExists(): boolean {
  return existsSync(MARKER_FILE)
}

function writeMarker(decision: 'installed' | 'declined' | 'skipped'): void {
  try {
    mkdirSync(path.dirname(MARKER_FILE), { recursive: true })
    writeFileSync(MARKER_FILE, JSON.stringify({ decision, ts: new Date().toISOString() }))
  } catch {
    // ignore — marker file is a nice-to-have, not critical
  }
}

/**
 * Run once on first CLI invocation to offer skill registration.
 *
 * SECURITY: Registration is opt-in and interactive. Never silently writes files.
 *
 * Skips (silently, no prompt) when any of:
 *   - marker file exists (already asked once)
 *   - stdin is not a TTY (CI, Docker, pipes — no way to prompt safely)
 *   - BYBIT_CLI_NO_SKILL_REGISTER=1
 *   - no known agent platform detected on this machine
 *
 * On accept: calls installSkill() which does the atomic + SHA256 copy.
 * On decline: writes marker, never asks again (until user runs `install-skill` manually).
 */
export async function maybeOfferSkillRegistration(): Promise<void> {
  // Only offer on interactive shells — CI/Docker/pipes silently skip
  if (!process.stdin.isTTY || !process.stdout.isTTY) return
  if (process.env.BYBIT_CLI_NO_SKILL_REGISTER === '1') return
  if (markerExists()) return

  const platforms = detectPlatforms()
  if (platforms.length === 0) return

  process.stderr.write(
    '\n' +
    '┌─ First-run setup ────────────────────────────────────────────\n' +
    `│  Detected AI agent platform(s): ${platforms.join(', ')}\n` +
    '│\n' +
    '│  bybit-cli can register a 30-line bootstrap SKILL.md so agents\n' +
    '│  auto-discover this CLI. Content ships with the npm package; you\n' +
    '│  can inspect it any time at:\n' +
    '│    <install-prefix>/lib/node_modules/bybit-official-trading-cli/skill/SKILL.md\n' +
    '│\n' +
    "│  You can also skip this and run 'bybit-cli install-skill' later.\n" +
    '└──────────────────────────────────────────────────────────────\n'
  )

  const rl = createInterface({ input: process.stdin, output: process.stderr })
  try {
    const answer = (await rl.question('Register bybit-cli skill for your AI agent? [Y/n] ')).trim().toLowerCase()
    if (answer === '' || answer === 'y' || answer === 'yes') {
      const results = installSkill({})
      for (const r of results) {
        if (r.ok) process.stderr.write(`  ✓ ${r.platform}: ${r.dst}\n`)
        else process.stderr.write(`  ⚠  ${r.platform}: ${r.err}\n`)
      }
      writeMarker('installed')
      process.stderr.write("  ℹ  To uninstall later: bybit-cli uninstall-skill\n\n")
    } else {
      writeMarker('declined')
      process.stderr.write("  Skipped. Run 'bybit-cli install-skill' when ready.\n\n")
    }
  } catch {
    writeMarker('skipped')
  } finally {
    rl.close()
  }
}
