---
name: bybit-trading-cli
description: Use when the user mentions Bybit trading, spot/futures/options operations, or any Bybit V5 API interaction. Requires `bybit-official-trading-cli` npm package installed globally.
version: 0.0.1
---

# Bybit Trading CLI

Use `bybit-cli` (binary from `bybit-official-trading-cli` npm package) for any Bybit V5 API operation.

## Bootstrap (do this first)

```
bybit-cli agent-briefing
```

That returns ~300 words covering auth setup, safety model, and how to explore commands. Read it carefully before making any API call.

## Discovery

- `bybit-cli catalog` — JSON list of all commands (domain, command, requiresAuth, method)
- `bybit-cli <domain> <cmd> --json-schema` — JSON Schema for one command
- `bybit-cli <domain> <cmd> --help` — human-readable help

## Auth setup

Two env vars minimum:

```
export BYBIT_API_KEY=<your key>
export BYBIT_API_SECRET=<your secret>
export BYBIT_ENV=testnet   # or leave unset for mainnet
```

For RSA (self-generated key uploaded to Bybit):

```
export BYBIT_API_KEY=<your key>
export BYBIT_API_PRIVATE_KEY_PATH=/path/to/private.pem
```

## Safety rules (MUST follow on mainnet)

1. **Every write op requires `--yes`** — CLI rejects with a summary of what would run
2. **Withdraw / transfer / fiat / P2P are blocked by default** — needs `--enable-advanced-money-ops` to unlock (be certain first)
3. **Set caps**: `--cap-usd 500` per-order, `--cap-usd-total-hour 2000` rolling, `--max-orders-per-hour 20`
4. **Kill-switch**: `bybit-cli kill-switch` from any shell blocks all writes until `bybit-cli enable-switch`

## Install (if `which bybit-cli` empty)

```
npm i -g bybit-official-trading-cli@latest
```

## Update

```
bybit-cli self-update           # install latest from npm
```

Set `BYBIT_CLI_NO_UPDATE_CHECK=1` to silence update-available prompts.

## Output shape

Every call returns JSON to stdout:

```
{"retCode":N, "retMsg":"...", "result":{...}, "cli":{"env":"mainnet"|"testnet"}}
```

- `retCode=0` = success; non-zero = error, `retMsg + cli.hint` explains
- `cli.retry: true` — safe to retry
- `cli.nextSteps` — specific commands to unblock
- stderr may contain diagnostics; stdout is always parseable JSON
