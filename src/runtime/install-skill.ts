import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync, unlinkSync, rmdirSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HOME = os.homedir()

export type Platform = 'claude-code' | 'openclaw' | 'cursor' | 'windsurf' | 'codex'

const PLATFORM_DIRS: Record<Platform, { name: string; dir: string }> = {
  'claude-code': { name: 'Claude Code', dir: path.join(HOME, '.claude/skills') },
  'openclaw':    { name: 'OpenClaw',    dir: path.join(HOME, '.openclaw/skills') },
  'cursor':      { name: 'Cursor',      dir: path.join(HOME, '.cursor/skills') },
  'windsurf':    { name: 'Windsurf',    dir: path.join(HOME, '.windsurf/skills') },
  'codex':       { name: 'Codex',       dir: path.join(HOME, '.codex/skills') },
}

function findSkillSource(): string {
  // Bundled next to the CLI package. Handles both dev (src/) and dist/ paths.
  const candidates = [
    path.join(__dirname, '..', '..', 'skill', 'SKILL.md'),
    path.join(__dirname, '..', 'skill', 'SKILL.md'),
  ]
  for (const p of candidates) if (existsSync(p)) return p
  throw new Error('SKILL.md not found in package')
}

function copyAtomicWithChecksum(src: string, dst: string): void {
  const content = readFileSync(src, 'utf-8')
  const sha = createHash('sha256').update(content).digest('hex')
  const dir = path.dirname(dst)
  mkdirSync(dir, { recursive: true })
  const tmp = dst + '.tmp'
  writeFileSync(tmp, content)
  const verify = createHash('sha256').update(readFileSync(tmp, 'utf-8')).digest('hex')
  if (verify !== sha) throw new Error(`checksum mismatch after write`)
  renameSync(tmp, dst)
}

export type InstallResult = {
  platform: Platform
  dst: string
  ok: boolean
  err?: string
}

export function installSkill(opts: {
  platform?: Platform  // if not provided, install to all detected
  dryRun?: boolean
}): InstallResult[] {
  const src = findSkillSource()
  const targets: Platform[] = opts.platform
    ? [opts.platform]
    : (Object.keys(PLATFORM_DIRS) as Platform[]).filter((p) => existsSync(PLATFORM_DIRS[p].dir))

  if (targets.length === 0) {
    process.stderr.write(
      `No known agent platform detected. Skill file location:\n` +
      `  ${src}\n` +
      `To force-install to a specific platform:\n` +
      `  bybit-cli install-skill --platform <claude-code|openclaw|cursor|windsurf|codex>\n`
    )
    return []
  }

  const results: InstallResult[] = []
  for (const platform of targets) {
    const { dir } = PLATFORM_DIRS[platform]
    const dst = path.join(dir, 'bybit-trading-cli', 'SKILL.md')
    if (opts.dryRun) {
      results.push({ platform, dst, ok: true })
      continue
    }
    try {
      copyAtomicWithChecksum(src, dst)
      results.push({ platform, dst, ok: true })
    } catch (err) {
      results.push({ platform, dst, ok: false, err: (err as Error).message })
    }
  }
  return results
}

export function uninstallSkill(): void {
  for (const [key, { name, dir }] of Object.entries(PLATFORM_DIRS)) {
    const dst = path.join(dir, 'bybit-trading-cli', 'SKILL.md')
    if (existsSync(dst)) {
      try {
        unlinkSync(dst)
        try { rmdirSync(path.dirname(dst)) } catch { /* dir has other files, ok */ }
        process.stderr.write(`  ✓ removed ${name} skill: ${dst}\n`)
      } catch (err) {
        process.stderr.write(`  ⚠  ${name}: ${(err as Error).message}\n`)
      }
    }
  }
}

export function listPlatforms(): void {
  process.stdout.write(JSON.stringify(
    Object.entries(PLATFORM_DIRS).map(([key, { name, dir }]) => ({
      platform: key,
      name,
      dir,
      installed: existsSync(path.join(dir, 'bybit-trading-cli', 'SKILL.md')),
    })), null, 2
  ) + '\n')
}
