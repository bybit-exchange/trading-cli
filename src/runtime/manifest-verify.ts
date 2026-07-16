import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE_FILE = path.join(os.homedir(), '.bybit-cli/manifest-cache.json')
const READ_ONLY_AFTER_MS = 7 * 24 * 60 * 60 * 1000  // downgrade to read-only after 7d of network fail

// Bybit-hosted manifest URL. The manifest file is published from
// bbu/open-api/ai-skill-manifest repo (path: ai-manifest/cli/manifest) by
// Bybit backend — separate credentials from npm publisher (double-key model).
// Override via env var when testing against a staging endpoint.
const MANIFEST_URL = process.env.BYBIT_CLI_MANIFEST_URL
  ?? 'https://api.bybit.com/ai-manifest/cli/manifest'

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

function readCache(): { manifest: Manifest; ts: number } | null {
  if (!existsSync(CACHE_FILE)) return null
  try { return JSON.parse(readFileSync(CACHE_FILE, 'utf-8')) } catch { return null }
}

function writeCache(manifest: Manifest): void {
  mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
  writeFileSync(CACHE_FILE, JSON.stringify({ manifest, ts: Date.now() }, null, 2))
}

async function fetchManifest(): Promise<Manifest> {
  const res = await fetch(MANIFEST_URL, { headers: { 'User-Agent': 'bybit-cli/verify' } })
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
