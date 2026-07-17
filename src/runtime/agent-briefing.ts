import { briefingMetadata } from '../generated/briefing-metadata.js'

export function generateBriefing(): string {
  const topDomains = briefingMetadata.domains
    .slice(0, 8)
    .map(d => `${d.domain} (${d.count})`)
    .join(', ')

  return `# bybit-cli · Agent Briefing

## What
CLI for Bybit V5 API, designed for AI agents. JSON I/O by default.
${briefingMetadata.commandCount} commands across ${briefingMetadata.domainCount} domains.
Top domains: ${topDomains}${briefingMetadata.domains.length > 8 ? ', …' : ''}

## Auth (env vars)
HMAC:
  BYBIT_API_KEY=<key>
  BYBIT_API_SECRET=<secret>

RSA (self-generated key uploaded to Bybit):
  BYBIT_API_KEY=<key>
  BYBIT_API_PRIVATE_KEY_PATH=/path/to/private.pem

Testnet: also set BYBIT_ENV=testnet

## Safety (mainnet writes)
- Every write op REQUIRES --yes flag; else exits 1 with hint.
- Withdraw / transfer / fiat / p2p endpoints blocked by default;
  need --enable-advanced-money-ops to unlock.
- Caps: --cap-usd (per-order), --cap-usd-total-hour (rolling 1h).
- Kill-switch: 'bybit-cli kill-switch' from any shell to halt all writes.
- SIGINT prints the orderLinkId of in-flight request for verify.

## How to explore
  bybit-cli catalog                        — list all ${briefingMetadata.commandCount} commands
  bybit-cli <domain> <cmd> --json-schema   — schema for one command
  bybit-cli <domain> <cmd> --help          — human-readable help

## Output shape
{"retCode":N, "retMsg":"...", "result":{...}, "cli":{"env":"..."}}
- retCode=0 = success. Non-zero = error, retMsg + cli.hint tell why.
- cli.env indicates 'mainnet' or 'testnet'.
- cli.retry=true means safe to auto-retry.
- cli.nextSteps has specific commands to run to unblock.

## Update
  bybit-cli self-update                    — install latest
  BYBIT_CLI_NO_UPDATE_CHECK=1              — silence update prompts

Version-specific behaviors may change. Re-run this briefing after 'self-update'.
`
}
