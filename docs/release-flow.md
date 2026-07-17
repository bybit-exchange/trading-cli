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

## ⚠️ Order matters: npm publish FIRST, manifest SECOND

**Why**: SHA256 of `dist/index.js` depends on the CI build environment (Node version, tsup version, timestamps). A build on your laptop can differ byte-for-byte from GitHub Actions' output. **The authoritative SHA is the one inside the tarball that npm publishes.** Any manifest computed from a local build risks a mismatch.

Correct sequence:

```
1. PR merged to main (peer-reviewed)
2. Bump package.json version + commit + push main
3. git tag <version> && git push origin <version>
4. GitHub Action publishes to npm registry
5. Wait for npm to serve the tarball (~30–60s)
6. npm pack bybit-official-trading-cli@<version> && shasum -a 256 dist/index.js
7. Update ai-skill-manifest/ai-manifest/cli/manifest with the SHA
8. Team B: git push (ai-skill-manifest repo)
9. Bybit backend mounts at https://api.bybit.com/ai-manifest/cli/manifest
```

There IS a short window (steps 4–8) where npm has a new version but the manifest hasn't caught up. Early adopters running `bybit-cli verify` in that window will see `skew`. Mitigations:
- Keep the window short (script the tarball-pull + manifest-update — see `scripts/build-manifest.mjs --from-npm`, TODO)
- Users can retry `verify` after a few minutes
- Or: publish to npm with `--tag next` first, verify, then move `latest` tag once manifest is updated

## Concrete release steps (per version)

Both repos sit as siblings on disk:

```
GolandProjects/
├── trading-cli/            ← this repo (public GitHub mirror also lives here)
└── ai-skill-manifest/      ← manifest repo (internal GitLab)
```

### Step 1. Version bump + PR

Inside `trading-cli/`:

```bash
git checkout main
git pull github main
# Edit package.json version, e.g. 1.0.1 → 1.0.2
git checkout -b chore/1.0.2-release
git commit -am "chore: bump version to 1.0.2"
git push github chore/1.0.2-release
gh pr create --repo bybit-exchange/trading-cli --base main --head chore/1.0.2-release --title "chore: release 1.0.2"
```

Get review + merge.

### Step 2. Tag → npm publish (Team A lane)

```bash
git checkout main
git pull github main
git tag 1.0.2               # bare semver, no 'v' prefix
git push github 1.0.2
```

GitHub Action `.github/workflows/publish.yml` validates:
- tag matches pattern `[0-9]+.[0-9]+.[0-9]+`
- tag is reachable from `origin/main`
- tag matches `package.json` version

Then runs `npm ci && npm run build && npm publish`.

### Step 3. Wait + extract SHA from npm tarball

```bash
sleep 30
npm view bybit-official-trading-cli@1.0.2 dist.tarball    # confirm published
curl -sSL $(npm view bybit-official-trading-cli@1.0.2 dist.tarball) -o /tmp/bybit-1.0.2.tgz
tar xzOf /tmp/bybit-1.0.2.tgz package/dist/index.js | shasum -a 256
tar xzOf /tmp/bybit-1.0.2.tgz package/skill/SKILL.md | shasum -a 256
```

Compare with `scripts/build-manifest.mjs` output — should match. If not, CI build differs from local (needs reproducibility fix).

### Step 4. Publish the manifest (Team B lane)

```bash
cd ../trading-cli
node scripts/build-manifest.mjs               # writes ../ai-skill-manifest/ai-manifest/cli/manifest
cd ../ai-skill-manifest
git diff ai-manifest/cli/manifest             # eyeball SHA changes
git add ai-manifest/cli/manifest
git commit -m "cli: manifest 1.0.2"
git push                                      # to internal GitLab (Team B token)
```

Bybit backend mounts the file at `https://api.bybit.com/ai-manifest/cli/manifest`.

### Step 5. Post-release smoke

```bash
# Wait for backend to sync
sleep 30
npx bybit-official-trading-cli@1.0.2 verify
```

Expected:

```json
{"retCode":0,"retMsg":"ok","result":{"status":"ok","source":"network","version":"1.0.2","filesChecked":2}}
```

## `bybit-cli verify` result semantics

| status | meaning | user action |
|---|---|---|
| `ok` | SHA256 matches manifest | continue |
| `skew` | 🔴 mismatch — CLI refuses to run | reinstall from official npm; report to `security@bybit.com` |
| `network-error` (no cache) | can't reach manifest URL on first run | retry with network; or set `BYBIT_CLI_MANIFEST_URL` for staging |
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

Test `verify` against a local mock:

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
