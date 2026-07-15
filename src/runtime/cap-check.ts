import { emitError } from './output.js'
import { estimateUsd, getHourlyStats, recordOrder } from './cap-ledger.js'
import type { ConfirmSummary } from './confirm.js'

/**
 * Cap checks for mainnet writes. All limits are user-provided via CLI flags.
 * - --cap-usd N            single-order cap (skipped if estimate unavailable)
 * - --cap-usd-total-hour N rolling 1h aggregate cap (only counts estimable orders)
 * - --max-orders-per-hour N rolling 1h count cap (all writes)
 *
 * Prints structured error and exits(1) on rejection.
 * On pass, records this order to ledger for future rolling checks.
 */
export function checkCaps(argv: any, summary: ConfirmSummary): void {
  const singleCap = Number(argv['cap-usd'])
  const totalCap = Number(argv['cap-usd-total-hour'])
  const orderCap = Number(argv['max-orders-per-hour'])
  const estimated = estimateUsd(argv)

  // 1) Single-order cap
  if (Number.isFinite(singleCap) && singleCap > 0 && estimated != null) {
    if (estimated > singleCap) {
      emitError({
        retCode: -1,
        retMsg: `estimated $${estimated.toFixed(2)} exceeds --cap-usd $${singleCap}`,
        hint: 'reduce qty/price, or raise --cap-usd',
      })
      return process.exit(1) as never
    }
  }

  // 2) Rolling 1h aggregate cap
  const stats = getHourlyStats()
  if (Number.isFinite(totalCap) && totalCap > 0 && estimated != null) {
    if (stats.totalUsd + estimated > totalCap) {
      emitError({
        retCode: -1,
        retMsg: `hourly total ${stats.totalUsd.toFixed(2)} + this order ${estimated.toFixed(2)} exceeds --cap-usd-total-hour $${totalCap}`,
        hint: 'wait for older orders to age out (1h rolling), or raise cap',
      })
      return process.exit(1) as never
    }
  }

  // 3) Rolling 1h count cap (counts all writes, incl. unestimatable)
  if (Number.isFinite(orderCap) && orderCap > 0) {
    if (stats.orderCount + 1 > orderCap) {
      emitError({
        retCode: -1,
        retMsg: `hourly count ${stats.orderCount} + 1 exceeds --max-orders-per-hour ${orderCap}`,
        hint: 'wait for older orders to age out (1h rolling)',
      })
      return process.exit(1) as never
    }
  }

  // All caps passed → record this order
  recordOrder({ operation: summary.operation, estimatedUsd: estimated })
}
