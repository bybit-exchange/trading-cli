#!/usr/bin/env node
// build-manifest — compute SHA256 for release artifacts and write manifest.
//
// USAGE (before every release):
//   1. npm run build                                    (produce dist/index.js)
//   2. node scripts/build-manifest.mjs [--out PATH]     (compute + write manifest)
//   3. Review the diff in the manifest repo
//   4. Push manifest repo to internal GitLab
//   5. Bybit backend mounts the file at https://api.bybit.com/ai-manifest/cli/manifest
//   6. `npm publish` (or tag → GitHub Action)
//
// The order matters: manifest published FIRST, then npm. If npm goes first and
// user runs `bybit-cli verify`, it hits an out-of-date manifest → false skew.
//
// Env / flags:
//   --out <path>       target manifest file (default: ../ai-skill-manifest/ai-manifest/cli/manifest)
//   --dry-run          print manifest to stdout, don't write
//   BYBIT_MANIFEST_OUT env var — same as --out
//
// Schema matches sibling manifests in ai-skill-manifest repo (mcp/manifest, skill/manifest):
//   { version, generated (YYYY-MM-DD), files: { <relative-path>: "sha256:<hex>" } }

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

const DEFAULT_OUT = path.resolve(REPO_ROOT, '..', 'ai-skill-manifest', 'ai-manifest', 'cli', 'manifest')

// Files whose integrity we publish. Users' bybit-cli verify checks these.
// Keep the list minimal — every file added expands the attack surface if the
// build pipeline changes hash unexpectedly.
const TRACKED = [
  { rel: 'dist/index.js', abs: path.join(REPO_ROOT, 'dist', 'index.js') },
  { rel: 'skill/SKILL.md', abs: path.join(REPO_ROOT, 'skill', 'SKILL.md') },
]

function sha256(filePath) {
  const buf = readFileSync(filePath)
  return createHash('sha256').update(buf).digest('hex')
}

function todayISODate() {
  // Cannot use new Date() in some sandboxes; expect --date override for those.
  // Falls back to `date` shell command elsewhere.
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function readPackageVersion() {
  const pkg = JSON.parse(readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf-8'))
  return pkg.version
}

function parseArgs(argv) {
  const args = { out: process.env.BYBIT_MANIFEST_OUT ?? DEFAULT_OUT, dryRun: false, date: null }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--out') args.out = argv[++i]
    else if (argv[i] === '--dry-run') args.dryRun = true
    else if (argv[i] === '--date') args.date = argv[++i]
  }
  return args
}

function main() {
  const args = parseArgs(process.argv.slice(2))

  // Verify inputs
  for (const f of TRACKED) {
    if (!existsSync(f.abs)) {
      console.error(`✗ missing tracked file: ${f.abs}`)
      console.error('  Did you forget `npm run build` before build-manifest?')
      process.exit(1)
    }
  }

  const files = {}
  for (const f of TRACKED) {
    files[f.rel] = 'sha256:' + sha256(f.abs)
  }

  const manifest = {
    version: readPackageVersion(),
    generated: args.date ?? todayISODate(),
    files,
  }

  const output = JSON.stringify(manifest, null, 2) + '\n'

  if (args.dryRun) {
    console.log('--- DRY RUN — would write to ' + args.out + ' ---')
    console.log(output)
    return
  }

  const outDir = path.dirname(args.out)
  if (!existsSync(outDir)) {
    console.error(`✗ output directory does not exist: ${outDir}`)
    console.error('  You need the ai-skill-manifest repo cloned as a sibling to trading-cli.')
    process.exit(1)
  }

  writeFileSync(args.out, output)
  console.log(`✓ wrote manifest → ${args.out}`)
  console.log(`  version: ${manifest.version}`)
  console.log(`  generated: ${manifest.generated}`)
  for (const [rel, sha] of Object.entries(files)) {
    console.log(`  ${rel}  ${sha.slice(0, 20)}...`)
  }
  console.log('')
  console.log('Next: cd into the ai-skill-manifest repo, review the diff, and push:')
  console.log('  cd ' + outDir + '/../..')
  console.log('  git diff ai-manifest/cli/manifest')
  console.log('  git add ai-manifest/cli/manifest && git commit -m "cli: manifest ' + manifest.version + '" && git push')
}

main()
