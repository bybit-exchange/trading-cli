# Release Flow — Double-Key Trust Model

The npm package publish and the Bybit-hosted `manifest` MUST be signed by **different accounts**, held by **different teams**, with **independent rotation policies**.

## Two independent trust chains

| Publisher | What it signs | Repo / URL | Who holds credentials |
|---|---|---|---|
| **npm account** (`bybit_api_official_account`) | `bybit-official-trading-cli` package on npm | `github.com/bybit-exchange/trading-cli` → npm | Team A (release engineering) |
| **Bybit manifest publisher** | Manifest file listing SHA256 for each release artifact | `code.bydev.io/bbu/open-api/ai-skill-manifest` → `api.bybit.com/ai-manifest/cli/manifest` | Team B (Bybit backend) |

An attacker who compromises **only one** cannot successfully deliver malicious code:

- Compromised npm → CLI runs → `bybit-cli verify` → SHA256 mismatch → refuses to run
- Compromised Bybit endpoint → manifest updated to fake SHA → but users still install authentic npm → SHA of installed bundle ≠ tampered manifest → skew detected

## Concrete release steps (per version)

Both repos sit as siblings on disk:

```
GolandProjects/
├── trading-cli/            ← this repo
└── ai-skill-manifest/      ← manifest repo (internal GitLab)
```

### Step 1. Build the artifact

Inside `trading-cli/`:

```bash
git checkout main
git pull
pnpm install               # or npm ci in the public repo
pnpm build                 # or npm run build — outputs dist/index.js
```

### Step 2. Generate the manifest

```bash
pnpm build:manifest        # or node scripts/build-manifest.mjs
```

Writes `ai-skill-manifest/ai-manifest/cli/manifest` with SHA256 of `dist/index.js` + `skill/SKILL.md`. Schema matches sibling `mcp/manifest` and `skill/manifest` in the same repo:

```json
{
  "version": "0.0.1",
  "generated": "2026-07-16",
  "files": {
    "dist/index.js": "sha256:...",
    "skill/SKILL.md": "sha256:..."
  }
}
```

Preview without writing:

```bash
node scripts/build-manifest.mjs --dry-run
```

### Step 3. Publish the manifest (Team B lane)

```bash
cd ../ai-skill-manifest
git diff ai-manifest/cli/manifest    # sanity check the SHA changes
git add ai-manifest/cli/manifest
git commit -m "cli: manifest <version>"
git push                              # to internal GitLab
```

Bybit backend serves it at `https://api.bybit.com/ai-manifest/cli/manifest`.

**⚠️ ORDER MATTERS**: publish the manifest **before** npm. If npm ships first while manifest is stale, `bybit-cli verify` at user side hits false `skew` and refuses to run.

### Step 4. Publish to npm (Team A lane)

Inside `trading-cli/`:

```bash
git tag <version>          # e.g. 0.0.1, matching package.json version
git push origin <version>  # triggers GitHub Action → npm publish
```

`.github/workflows/publish.yml` validates:
- tag is reachable from `origin/main`
- tag matches `package.json` version
- then runs `npm publish` with `NPM_PUBLISH` secret

### Step 5. Post-release smoke

```bash
npx bybit-official-trading-cli@<version> verify
```

Expected:

```json
{"retCode":0,"retMsg":"ok","result":{"status":"ok","source":"network","version":"0.0.1","filesChecked":2}}
```

## `bybit-cli verify` result semantics

| status | meaning | user action |
|---|---|---|
| `ok` | SHA256 matches manifest | continue |
| `skew` | 🔴 mismatch — CLI refuses to run | reinstall from official npm; report to `security@bybit.com` |
| `network-error` (no cache) | can't reach manifest URL on first run | retry with network; or set `BYBIT_CLI_MANIFEST_URL` to staging |
| `network-error` (with cache <7d) | can't reach, using cached manifest | non-fatal — continues with cached verdict |
| `read-only` | >7 days without fresh manifest fetch | reconnect network + retry |
| `no-files-locatable` | manifest lists files not found on disk | install corrupted — reinstall |

## Emergency response

If SHA divergence is detected in the wild:

1. Team B: revert manifest to prior version — 5 min
2. Team A: `npm deprecate bybit-official-trading-cli@<bad>` with warning
3. Root cause: which chain was compromised (npm token / manifest deploy key / build machine)
4. Patch: bump version, both teams re-sign
5. Post-mortem

## Local development

During dev, if you need to test `verify` without going through api.bybit.com:

```bash
export BYBIT_CLI_MANIFEST_URL=http://localhost:8080/cli/manifest
python3 -m http.server -d ../ai-skill-manifest/ai-manifest 8080 &
npm run build
node dist/index.js verify
```

## Rotation policies

- npm token: 90 days, alert if >120 days
- Bybit internal deploy key: 90 days
- Rotations staggered — never coincident (avoids single-window vulnerability)
