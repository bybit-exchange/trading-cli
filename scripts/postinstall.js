#!/usr/bin/env node
// postinstall — auto-register bootstrap skill for AI agent platforms.
// FOUR IRON RULES:
//   1. NEVER fail npm install (all errors caught, exit 0)
//   2. CI/Docker with no known skill dir: print hint, do nothing
//   3. Respect BYBIT_CLI_NO_SKILL_REGISTER=1 opt-out
//   4. Always print what was done + how to undo

import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync, statSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HOME = os.homedir()

// Known agent skill directories, in preference order.
// postinstall installs to ALL matching (not just first).
const KNOWN_DIRS = [
  { name: 'Claude Code', dir: path.join(HOME, '.claude/skills') },
  { name: 'OpenClaw', dir: path.join(HOME, '.openclaw/skills') },
  { name: 'Cursor', dir: path.join(HOME, '.cursor/skills') },
]

function run() {
  if (process.env.BYBIT_CLI_NO_SKILL_REGISTER === '1') {
    console.log('  Skill registration skipped (BYBIT_CLI_NO_SKILL_REGISTER=1)')
    return
  }

  const src = path.join(__dirname, '..', 'skill', 'SKILL.md')
  if (!existsSync(src)) {
    console.log(`  ℹ  skill/SKILL.md not found at ${src}; skipping registration`)
    return
  }
  const content = readFileSync(src, 'utf-8')
  const sha = createHash('sha256').update(content).digest('hex')

  const detected = KNOWN_DIRS.filter(({ dir }) => existsSync(dir))
  if (detected.length === 0) {
    console.log('  ℹ  No AI agent platform detected.')
    console.log('     For AI usage later: bybit-cli install-skill')
    return
  }

  const results = []
  for (const { name, dir } of detected) {
    try {
      const target = path.join(dir, 'bybit-trading-cli')
      mkdirSync(target, { recursive: true })
      // atomic write: tmp file → verify SHA256 → rename
      const tmp = path.join(target, 'SKILL.md.tmp')
      const dst = path.join(target, 'SKILL.md')
      writeFileSync(tmp, content)
      const verify = createHash('sha256').update(readFileSync(tmp, 'utf-8')).digest('hex')
      if (verify !== sha) {
        throw new Error(`checksum mismatch after write (${verify} != ${sha})`)
      }
      renameSync(tmp, dst)  // POSIX rename is atomic
      results.push({ name, dst, ok: true })
    } catch (err) {
      results.push({ name, err: err.message, ok: false })
    }
  }

  for (const r of results) {
    if (r.ok) console.log(`  ✓ Registered skill for ${r.name}: ${r.dst}`)
    else console.log(`  ⚠  ${r.name}: ${r.err}`)
  }
  console.log(`     To disable: BYBIT_CLI_NO_SKILL_REGISTER=1`)
  console.log(`     To uninstall: bybit-cli uninstall-skill`)
}

try {
  run()
} catch (err) {
  // Iron Rule 1: never fail npm install
  console.log(`  ℹ  Skill auto-registration skipped: ${err.message}`)
  console.log(`     For AI usage: bybit-cli install-skill`)
}
process.exit(0)
