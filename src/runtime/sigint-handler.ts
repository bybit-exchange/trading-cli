let armedOrderLinkId: string | undefined
let installed = false

/**
 * Register a SIGINT handler that warns the user if a request may have
 * completed on Bybit's side (even though the CLI process is exiting).
 * The orderLinkId lets them verify status after the fact.
 */
export function armSigintHandler(orderLinkId: string | undefined): void {
  armedOrderLinkId = orderLinkId
  if (installed) return
  installed = true
  process.on('SIGINT', () => {
    if (armedOrderLinkId) {
      process.stderr.write(
        `\n⚠️  Interrupted mid-request. The order may have been sent to Bybit.\n` +
        `   Verify status via order-link-id: ${armedOrderLinkId}\n` +
        `   Example: bybit-cli order get-open-orders --category linear --order-link-id ${armedOrderLinkId}\n`
      )
    }
    process.exit(130)  // 128 + SIGINT(2)
  })
}

export function disarmSigintHandler(): void {
  armedOrderLinkId = undefined
}
