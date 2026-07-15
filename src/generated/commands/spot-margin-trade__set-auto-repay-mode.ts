// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'set-auto-repay-mode'
export const describe = "Set Auto Repay Mode"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'currency': {
      type: 'string',
      description: "Coin name, uppercase only (e.g. `USDT`, `ETH`).\nIf omitted, auto-repay is enabled/disabled for **all** currencies.\n",
      
    },
    'auto-repay-mode': {
      type: 'string',
      description: "Auto repay mode switch:\n- `1`: Enable auto repay — Enable auto repay\n- `0`: Disable auto repay — Disable auto repay\n",
      enum: ['1', '0'],
    }
  },
  required: ['auto-repay-mode'],
} as const

export const builder = (yargs: any) => yargs
  .option('currency', { type: 'string', describe: "Coin name, uppercase only (e.g. `USDT`, `ETH`).\nIf omitted, auto-repay is enabled/disabled for **all** currencies.\n" })
  .option('auto-repay-mode', { type: 'string', choices: ['1', '0'], demandOption: true, describe: "Auto repay mode switch:\n- `1`: Enable auto repay — Enable auto repay\n- `0`: Disable auto repay — Disable auto repay\n" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  .option('yes', { type: 'boolean', describe: 'Confirm mainnet write op (required on mainnet)' })
  .option('cap-usd', { type: 'number', describe: 'Reject if estimated USD value exceeds this' })
  .option('cap-usd-total-hour', { type: 'number', describe: 'Reject if rolling 1h total exceeds this' })
  .option('max-orders-per-hour', { type: 'number', describe: 'Reject if 1h order count would exceed this' })
  .option('enable-advanced-money-ops', { type: 'boolean', describe: 'Unlock withdraw/transfer/fiat/p2p endpoints' })

function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'POST',
  path: '/v5/spot-margin-trade/set-auto-repay-mode',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/spot-margin-trade/set-auto-repay-mode',
    
    body: { currency: argv['currency'], autoRepayMode: argv['auto-repay-mode'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  // Auto-inject orderLinkId for idempotency across retries.
  // User can override with --order-link-id.
  if (argv['order-link-id'] === undefined && argv.orderLinkId === undefined) {
    argv['order-link-id'] = makeOrderLinkId(argv)
    argv.orderLinkId = argv['order-link-id']
  }
  checkConfirm(argv, {
    operation: 'spot-margin-trade set-auto-repay-mode',
    method: 'POST',
    path: '/v5/spot-margin-trade/set-auto-repay-mode',
    params: argv,
  })
  return innerHandler(argv)
}
