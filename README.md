# bybit-official-trading-cli

Official Bybit V5 CLI for AI agents.

Bring Bybit trading to Claude Code, OpenClaw, Cursor, Windsurf, and Codex — every V5 endpoint, safety-first defaults, JSON I/O.

## Install

```bash
npm i -g bybit-official-trading-cli@latest
```

Post-install auto-registers a 30-line bootstrap SKILL.md to any detected AI agent platform (`~/.claude/skills/`, `~/.openclaw/skills/`, `~/.cursor/skills/`, `~/.windsurf/skills/`, `~/.codex/skills/`).

Opt-out with `BYBIT_CLI_NO_SKILL_REGISTER=1`. Manually manage with `bybit-cli install-skill` / `uninstall-skill`.

## First run (for AI agents)

```bash
bybit-cli agent-briefing
```

Prints ~300 words on auth setup, safety, and how to explore commands. That's the single entry point — read it and you're ready.

## Auth

```bash
export BYBIT_API_KEY=<your key>
export BYBIT_API_SECRET=<your secret>
export BYBIT_ENV=testnet   # or leave unset for mainnet
```

For RSA (uploaded public key on Bybit):

```bash
export BYBIT_API_KEY=<your key>
export BYBIT_API_PRIVATE_KEY_PATH=/path/to/private.pem
```

## Discovery

```bash
bybit-cli catalog                         # JSON list of ~435 commands across ~30 domains
bybit-cli <domain> <cmd> --json-schema    # JSON Schema for one command
bybit-cli <domain> <cmd> --help           # human-readable help
```

## Safety (mainnet writes)

| Guard | Flag / command |
|---|---|
| Confirmation gate | `--yes` (required on mainnet) |
| Per-order cap | `--cap-usd 500` |
| Rolling 1h total cap | `--cap-usd-total-hour 2000` |
| Rolling 1h order count | `--max-orders-per-hour 20` |
| Kill-switch | `bybit-cli kill-switch` / `enable-switch` |
| Restricted endpoints | Withdraw/transfer/fiat/p2p need `--enable-advanced-money-ops` |
| Idempotency | `orderLinkId` auto-injected (deterministic across retries) |
| Supply-chain check | `bybit-cli verify` (SHA256 vs Bybit's manifest) |

## Update

```bash
bybit-cli self-update              # install latest from npm
bybit-cli self-update --dry-run    # test network + permissions
```

Silence update-available prompts with `BYBIT_CLI_NO_UPDATE_CHECK=1`.

## Output shape

All commands return JSON to stdout:

```json
{"retCode":0,"retMsg":"OK","result":{...},"cli":{"env":"testnet"}}
```

- `retCode=0` = success; non-zero = error
- `cli.env` — `mainnet` or `testnet`
- `cli.hint` — plain-English cause on error
- `cli.retry` — `true` if safe to auto-retry
- `cli.nextSteps` — specific commands to unblock

Add `--pretty` for indented output.

## macOS TLS caveat

If you see `fetch failed: unable to get local issuer certificate`:

```bash
export NODE_EXTRA_CA_CERTS=/etc/ssl/cert.pem
```

Node's fetch doesn't read the macOS keychain by default.

## Platform support

- **v1 targets macOS + Linux.** Windows deferred to v2.
- Requires **Node 20.6+**.

## Architecture

- Commands auto-generated from Bybit's OpenAPI 3.1 spec (`operationId` → CLI subcommand). Generator lives in the internal repo; only `src/generated/` is included in this repo.
- Runtime modules under `src/runtime/`: `credentials`, `signer` (HMAC), `rsa-signer`, `client`, `handler`, plus safety layer (`confirm`, `cap-check`, `kill-switch`, `whitelist`, `order-link`, `fingerprint`).
- Distribution: single `dist/index.js` bundle (~1.3 MB) + `skill/SKILL.md` + `scripts/postinstall.js`.

## Supply chain

`bybit-cli verify` fetches Bybit's official manifest at **`https://api.bybit.com/ai-manifest/cli/manifest`** and checks SHA256 of the local bundle against it. The manifest is signed by Bybit's internal release pipeline — separate credentials from npm publish (see [docs/release-flow.md](docs/release-flow.md) for the double-key trust model).

Third-party auditors can independently verify install integrity without trusting the CLI:

```bash
# 1) Fetch the official manifest
curl -sS https://api.bybit.com/ai-manifest/cli/manifest

# 2) Fetch the exact npm tarball users install
curl -sSL "$(npm view bybit-official-trading-cli@latest dist.tarball)" -o /tmp/x.tgz

# 3) Compute SHA256 of dist/index.js and compare against manifest
tar xzOf /tmp/x.tgz package/dist/index.js | shasum -a 256
tar xzOf /tmp/x.tgz package/skill/SKILL.md | shasum -a 256
```

## License

MIT
