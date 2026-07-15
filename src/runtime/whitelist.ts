import { emitError } from './output.js'

// Endpoints that move money outside your control (or between accounts) — off by default.
// Users must explicitly opt in with --enable-advanced-money-ops to unlock any of these.
const RESTRICTED_PATTERNS = [
  /^\/v5\/asset\/withdraw/,
  /^\/v5\/asset\/transfer/,
  /^\/v5\/asset\/universal-transfer/,
  /^\/v5\/asset\/exchange/,          // Flash Convert (asset moves at spot rate, off-market)
  /^\/v5\/fiat/,
  /^\/v5\/p2p/,
  /^\/v5\/user\/create-sub-api/,     // creating sub API keys is a permission escalation
]

export function isRestrictedEndpoint(pathname: string): boolean {
  return RESTRICTED_PATTERNS.some(re => re.test(pathname))
}

export function checkWhitelist(pathname: string, argv: any): void {
  if (!isRestrictedEndpoint(pathname)) return
  if (argv['enable-advanced-money-ops']) return

  emitError({
    retCode: -1,
    retMsg: `endpoint ${pathname} is a restricted money-moving operation`,
    hint: 'add --enable-advanced-money-ops to unlock (be certain — this covers withdraw/transfer/fiat/p2p)',
    nextSteps: [
      'read docs/safety.md before enabling',
      'consider using a sub-account with limited balance for these ops',
    ],
  })
  return process.exit(1) as never
}
