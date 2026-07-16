import { emitError } from './output.js'
import { isKillSwitchActive } from './kill-switch.js'
import { checkCaps } from './cap-check.js'
import { checkWhitelist } from './whitelist.js'

export type ConfirmSummary = {
  operation: string
  method: string
  path: string
  params: Record<string, unknown>
}

/**
 * Gate for mainnet write operations.
 * - testnet: pass through
 * - kill-switch active: reject
 * - --yes flag missing: reject with hint
 * Prints structured error and exits(1) on rejection.
 * Returns nothing on pass; caller continues.
 */
export function checkConfirm(argv: any, summary: ConfirmSummary): void {
  const env = (process.env.BYBIT_ENV ?? 'mainnet') as 'mainnet' | 'testnet'
  if (env === 'testnet') return

  if (isKillSwitchActive()) {
    emitError({
      retCode: -1,
      retMsg: 'kill-switch active — all mainnet writes blocked',
      hint: 'clear: bybit-cli enable-switch',
    })
    return process.exit(1) as never
  }

  if (!argv.yes) {
    // SECURITY: Do NOT serialize summary.params here.
    // Trading params (coin/qty/price) written to stdout leak into AI agent
    // conversation context and provider logs — strategy exposure + front-running risk.
    // Users can inspect what they typed via their shell history / --help.
    emitError({
      retCode: -1,
      retMsg: `mainnet write "${summary.operation}" requires --yes`,
      hint: 'append --yes to confirm this operation',
      nextSteps: [
        `will call: ${summary.method} ${summary.path}`,
        `review params: bybit-cli ${summary.operation} --help`,
      ],
    })
    return process.exit(1) as never
  }

  // Whitelist: restricted money-moving endpoints require explicit opt-in
  checkWhitelist(summary.path, argv)

  // Enforce cap limits (--cap-usd / --cap-usd-total-hour / --max-orders-per-hour)
  // and record this order to rolling ledger.
  checkCaps(argv, summary)
}
