import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { commonHeaders } from './http-headers.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE_FILE = path.join(os.homedir(), '.bybit-cli/manifest-cache.json')
const STARTUP_MARKER_FILE = path.join(os.homedir(), '.bybit-cli/startup-verify.json')
const READ_ONLY_AFTER_MS = 7 * 24 * 60 * 60 * 1000  // downgrade to read-only after 7d of network fail
const STARTUP_MARKER_TTL_MS = 24 * 60 * 60 * 1000   // 24h fast-path for startup verify
const WRITE_CHECK_TTL_MS = 2 * 60 * 1000            // 2min in-memory cache for write ops
const WRITE_CHECK_TIMEOUT_MS = 3000

// Bybit-hosted manifest URL. The manifest file is published from
// bbu/open-api/ai-skill-manifest repo (path: ai-manifest/cli/manifest) by
// Bybit backend — separate credentials from npm publisher (double-key model).
// Override via env var when testing against a staging endpoint.
const MANIFEST_URL = process.env.BYBIT_CLI_MANIFEST_URL
  ?? 'https://api.bybit.com/ai-manifest/cli/manifest'

// ANSI red for the hard-fail banner (matches MCP tone).
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

/**
 * Manifest schema. Must match sibling manifests in the ai-skill-manifest repo
 * (mcp/manifest, skill/manifest). Do not diverge — CI cross-checks.
 */
export type Manifest = {
  version: string
  generated?: string             // YYYY-MM-DD
  files: Record<string, string>  // key: relative path (e.g. "dist/index.js"), value: "sha256:<hex>"
}

export type VerifyResult =
  | { status: 'ok'; source: 'network' | 'cache'; version: string; filesChecked: number }
  | { status: 'skew'; expected: string; actual: string; file: string }
  | { status: 'network-error'; error: string }
  | { status: 'read-only'; ageDays: number }
  | { status: 'no-files-locatable'; reason: string }

type StartupMarker = {
  ts: number
  resultStatus: VerifyResult['status']
  version: string
}

function readCache(): { manifest: Manifest; ts: number } | null {
  if (!existsSync(CACHE_FILE)) return null
  try { return JSON.parse(readFileSync(CACHE_FILE, 'utf-8')) } catch { return null }
}

function writeCache(manifest: Manifest): void {
  mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
  writeFileSync(CACHE_FILE, JSON.stringify({ manifest, ts: Date.now() }, null, 2))
}

function readStartupMarker(): StartupMarker | null {
  if (!existsSync(STARTUP_MARKER_FILE)) return null
  try { return JSON.parse(readFileSync(STARTUP_MARKER_FILE, 'utf-8')) as StartupMarker } catch { return null }
}

function writeStartupMarker(marker: StartupMarker): void {
  mkdirSync(path.dirname(STARTUP_MARKER_FILE), { recursive: true })
  writeFileSync(STARTUP_MARKER_FILE, JSON.stringify(marker, null, 2))
}

async function fetchManifest(signal?: AbortSignal): Promise<Manifest> {
  const res = await fetch(MANIFEST_URL, {
    headers: commonHeaders(),
    signal,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${MANIFEST_URL}`)
  const body = (await res.json()) as Manifest
  if (!body.files || typeof body.files !== 'object') {
    throw new Error('manifest missing `files` object — schema mismatch')
  }
  return body
}

function sha256File(filePath: string): string {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex')
}

/**
 * Locate a manifest-referenced file on disk. Works from both:
 *   - dev (running via `tsx src/index.ts`, cwd = repo root)
 *   - installed (running as bundled dist/index.js in npm's global tree)
 * Returns null if not locatable — caller decides whether to skip or fail.
 */
function locateFile(relPath: string): string | null {
  const candidates = [
    // Bundled npm layout: <prefix>/lib/node_modules/bybit-official-trading-cli/<rel>
    // and dev layout: <repo>/<rel>. runtime is at <root>/dist/ (bundled) or <root>/src/runtime/ (dev).
    path.join(__dirname, '..', '..', relPath),
    path.join(__dirname, '..', relPath),
    path.join(process.cwd(), relPath),
  ]
  for (const c of candidates) if (existsSync(c)) return c
  return null
}

/**
 * Locate package.json for the installed/dev copy of the CLI.
 *
 * Handles both:
 *   - dev  : this file at <repo>/src/runtime/manifest-verify.ts → <repo>/package.json
 *   - bundled: this file at <root>/dist/index.js (or .mjs) → <root>/package.json
 *
 * We avoid `import ... assert { type: 'json' }` because assertion syntax
 * varies across Node versions we support.
 */
function readPackageJsonVersion(): string {
  const candidates = [
    path.join(__dirname, '..', '..', 'package.json'), // dev: src/runtime/../../
    path.join(__dirname, '..', 'package.json'),       // bundled: dist/../
    path.join(process.cwd(), 'package.json'),
  ]
  for (const c of candidates) {
    if (existsSync(c)) {
      try {
        const pkg = JSON.parse(readFileSync(c, 'utf-8')) as { name?: string; version?: string }
        if (pkg.version && typeof pkg.version === 'string') return pkg.version
      } catch { /* try next */ }
    }
  }
  throw new Error('unable to locate package.json for bybit-cli — install may be corrupted')
}

/**
 * True when we're running the source .ts directly (via tsx). This is the ONLY
 * bypass path for startup verification — bundled installs (.js/.mjs) always
 * run the full check. There is intentionally NO env-var opt-out.
 */
function isRunningFromSource(): boolean {
  return import.meta.url.endsWith('.ts')
}

function printSkewBanner(stream: NodeJS.WriteStream, detail: { file: string; expected: string; actual: string }): void {
  stream.write(`\n${RED}${BOLD}╔══════════════════════════════════════════════════════════════════╗${RESET}\n`)
  stream.write(`${RED}${BOLD}║  bybit-cli: INTEGRITY CHECK FAILED                               ║${RESET}\n`)
  stream.write(`${RED}${BOLD}╚══════════════════════════════════════════════════════════════════╝${RESET}\n`)
  stream.write(`${RED}Local file does not match Bybit's official manifest.${RESET}\n`)
  stream.write(`  file:     ${detail.file}\n`)
  stream.write(`  expected: sha256:${detail.expected}\n`)
  stream.write(`  actual:   sha256:${detail.actual}\n`)
  stream.write(`\n${RED}${BOLD}Refusing to run to protect your API credentials.${RESET}\n`)
  stream.write(`Reinstall via: npm i -g bybit-official-trading-cli@latest\n\n`)
}

function printVersionSkewBanner(stream: NodeJS.WriteStream, expected: string, actual: string): void {
  stream.write(`\n${RED}${BOLD}╔══════════════════════════════════════════════════════════════════╗${RESET}\n`)
  stream.write(`${RED}${BOLD}║  bybit-cli: VERSION MISMATCH                                     ║${RESET}\n`)
  stream.write(`${RED}${BOLD}╚══════════════════════════════════════════════════════════════════╝${RESET}\n`)
  stream.write(`${RED}Local CLI version does not match Bybit's official manifest.${RESET}\n`)
  stream.write(`  installed: ${actual}\n`)
  stream.write(`  manifest:  ${expected}\n`)
  stream.write(`\n${RED}${BOLD}Refusing to run to protect your API credentials.${RESET}\n`)
  stream.write(`Reinstall via: npm i -g bybit-official-trading-cli@latest\n\n`)
}

function printWarning(msg: string): void {
  process.stderr.write(`${YELLOW}bybit-cli: WARNING — ${msg}${RESET}\n`)
}

/**
 * Verify local install against Bybit's official manifest.
 *
 * Flow:
 *  1. GET the manifest from api.bybit.com. Cache on success.
 *  2. For each entry in manifest.files, locate the file locally + compare SHA256.
 *  3. Any mismatch → status: 'skew' (CLI must refuse to run).
 *  4. Network fail → use cached manifest if <7 days old, else read-only mode.
 *  5. If no files could be located, we can't verify anything — report loudly.
 */
export async function verifyIntegrity(): Promise<VerifyResult> {
  let manifest: Manifest
  let source: 'network' | 'cache' = 'network'

  try {
    manifest = await fetchManifest()
    writeCache(manifest)
  } catch (err) {
    const cached = readCache()
    if (!cached) {
      return { status: 'network-error', error: (err as Error).message }
    }
    const ageMs = Date.now() - cached.ts
    if (ageMs > READ_ONLY_AFTER_MS) {
      return { status: 'read-only', ageDays: ageMs / (24 * 60 * 60 * 1000) }
    }
    manifest = cached.manifest
    source = 'cache'
  }

  let filesChecked = 0
  const missing: string[] = []

  for (const [rel, expected] of Object.entries(manifest.files)) {
    const local = locateFile(rel)
    if (!local) {
      missing.push(rel)
      continue
    }
    const actual = sha256File(local)
    const expectedHex = expected.replace(/^sha256:/, '')
    if (actual !== expectedHex) {
      return { status: 'skew', file: rel, expected: expectedHex, actual }
    }
    filesChecked++
  }

  if (filesChecked === 0) {
    return {
      status: 'no-files-locatable',
      reason: `none of ${Object.keys(manifest.files).join(', ')} found on disk — install may be corrupted`,
    }
  }

  return { status: 'ok', source, version: manifest.version, filesChecked }
}

/**
 * Startup gate. Called from CLI bootstrap on EVERY invocation.
 *
 * Fast path: if a marker written within the last 24h recorded status 'ok' for
 * the currently-installed version, we skip the network call entirely.
 *
 * Slow path: run verifyIntegrity() and act on the result. Only 'skew' is
 * fatal — network/read-only/no-files-locatable degrade to a stderr WARNING so
 * users on flaky networks or unusual install layouts aren't locked out.
 *
 * Idempotent: awaiting multiple times per process is safe (fast path short-
 * circuits once the marker is fresh; on failure we exit the process anyway).
 */
export async function verifyAtStartup(): Promise<void> {
  // Dev bypass: running directly from source via tsx. Bundled installs (which
  // resolve to .js/.mjs) always run the full check. No env var opt-out exists
  // by design.
  if (isRunningFromSource()) return

  let localVersion: string
  try {
    localVersion = readPackageJsonVersion()
  } catch (err) {
    printWarning(`could not read package.json — skipping startup verify (${(err as Error).message})`)
    return
  }

  const marker = readStartupMarker()
  const now = Date.now()
  if (
    marker
    && marker.resultStatus === 'ok'
    && marker.version === localVersion
    && now - marker.ts < STARTUP_MARKER_TTL_MS
  ) {
    return
  }

  const result = await verifyIntegrity()

  switch (result.status) {
    case 'ok':
      writeStartupMarker({ ts: now, resultStatus: 'ok', version: localVersion })
      return

    case 'skew':
      printSkewBanner(process.stderr, {
        file: result.file,
        expected: result.expected,
        actual: result.actual,
      })
      process.exit(1)
      // eslint-disable-next-line no-fallthrough
      return

    case 'network-error':
      printWarning(`unable to reach manifest endpoint (${result.error}) — proceeding without verification`)
      return

    case 'read-only':
      printWarning(`manifest cache is ${result.ageDays.toFixed(1)} days old and network is unreachable — proceeding without verification`)
      return

    case 'no-files-locatable':
      printWarning(`could not locate any manifest-listed files on disk (${result.reason}) — proceeding without verification`)
      return
  }
}

// Module-level in-memory cache for checkVersionForWrite. Empty on process
// start (per spec: "empty cache on first call"). Keyed by MANIFEST_URL so
// staging overrides don't collide with production.
type WriteCheckCacheEntry = { ts: number; version: string }
const writeCheckCache = new Map<string, WriteCheckCacheEntry>()

/**
 * Version-only preflight for write operations (POST / mutating handlers).
 *
 * Called from handler.ts before any isWriteOp === true handler executes. This
 * is deliberately narrower than verifyAtStartup — no file hashing, just a
 * version comparison — because write ops fire frequently and we want minimal
 * latency. A 2-minute in-memory TTL keeps the network cost bounded.
 *
 * On version mismatch we exit hard (same tone as startup skew). On any other
 * failure we downgrade to a stderr WARNING so a flaky network doesn't brick
 * a trading session.
 */
export async function checkVersionForWrite(): Promise<void> {
  // Dev bypass mirrors verifyAtStartup — the .ts entrypoint is never a
  // published artifact, so pinning it against the manifest is meaningless.
  if (isRunningFromSource()) return

  let localVersion: string
  try {
    localVersion = readPackageJsonVersion()
  } catch (err) {
    printWarning(`could not read package.json for write-op version check (${(err as Error).message})`)
    return
  }

  const now = Date.now()
  const cached = writeCheckCache.get(MANIFEST_URL)
  if (cached && now - cached.ts < WRITE_CHECK_TTL_MS) {
    if (cached.version !== localVersion) {
      printVersionSkewBanner(process.stderr, cached.version, localVersion)
      process.exit(1)
    }
    return
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), WRITE_CHECK_TIMEOUT_MS)

  let manifest: Manifest
  try {
    manifest = await fetchManifest(controller.signal)
  } catch (err) {
    printWarning(`write-op version check failed (${(err as Error).message}) — proceeding without verification`)
    return
  } finally {
    clearTimeout(timer)
  }

  writeCheckCache.set(MANIFEST_URL, { ts: now, version: manifest.version })

  if (manifest.version !== localVersion) {
    printVersionSkewBanner(process.stderr, manifest.version, localVersion)
    process.exit(1)
  }
}
