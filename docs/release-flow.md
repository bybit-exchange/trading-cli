# Release Flow — Double-Key Trust Model

The npm package publish and the Bybit-hosted `manifest.json` MUST be signed by **different accounts**, held by **different teams**, with **independent rotation policies**.

## Two independent trust chains

| Publisher | What it signs | Who holds credentials |
|---|---|---|
| **npm account** (`bybit_api_official_account`) | `bybit-official-trading-cli` package on npm | Team A (release engineering) |
| **Bybit internal manifest publisher** | `https://api.bybit.com/cli/manifest` JSON | Team B (Bybit backend / infra) |

An attacker who compromises **only one** cannot successfully deliver malicious code:

- Compromised npm → CLI runs → `bybit-cli verify` → SHA256 mismatch → refuses to run
- Compromised Bybit endpoint → manifest updated to fake SHA → but user still installs authentic npm → no divergence yet, and Team A's independent audit catches the manifest divergence

To ship malicious code, an attacker would need to compromise **both** chains simultaneously — equivalent to a Bybit-wide security incident.

## CI Pipeline Steps

Every release must run these steps in order (typically GitLab pipeline):

1. **CI (GitLab Runner)** builds `dist/index.mjs` from source
2. **CI** computes `sha256sum dist/index.mjs skill/SKILL.md`
3. **CI** generates `manifest.json` with the computed SHAs
4. **Manifest publish** → push `manifest.json` to `api.bybit.com/cli/manifest` backend
   - Uses **Team B's credentials** (Bybit internal deploy key)
   - Never uses npm token
5. **npm publish** → `npm publish` with `--provenance` (once we opt into sigstore)
   - Uses **Team A's credentials** (npm token in CI secret)
   - Never uses Bybit internal deploy key
6. **Post-release verify**: fetch manifest AND npm tarball, diff SHA256s, alert on mismatch

## Rotation policies

- npm token rotated every 90 days, alerts if >120 days
- Bybit internal deploy key rotated every 90 days
- Never coincident rotation (avoid single-window vulnerabilities)

## Emergency response

If SHA divergence is detected:

1. Immediately `npm deprecate` the affected version with clear warning
2. Update manifest to remove the compromised version
3. Publish patched version with new SHAs from both teams
4. Notify users via update-notifier stderr message
5. Post-mortem: which chain was compromised, by whom, mitigation

## Local development

During dev, `manifest.json` contains `PLACEHOLDER_*` in SHA slots. `bybit-cli verify` recognizes this and reports `{status: 'placeholder'}` without failing. The release pipeline replaces placeholders with actual SHA256 values.

## Verification for end users

```
bybit-cli verify
```

Fetches the current manifest, compares to local files, reports one of:

- `ok` — install matches Bybit's official manifest
- `placeholder` — dev build (or the manifest hasn't been published yet)
- `network-error` — couldn't reach Bybit; uses cached manifest for 7 days
- `read-only` — no fresh verify for >7 days; CLI refuses writes as precaution
- `skew` — 🔴 SHA mismatch; CLI refuses to run
