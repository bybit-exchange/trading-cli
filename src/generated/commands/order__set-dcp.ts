// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'set-dcp'
export const describe = "Set DCP (Disconnected CancelAll Protection)"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product': {
      type: 'string',
      description: "Product type for DCP protection.\n- `OPTIONS`: option orders (default)\n- `DERIVATIVES`: futures/perpetual orders\n- `SPOT`: spot orders\n",
      enum: ['OPTIONS', 'DERIVATIVES', 'SPOT'],
    },
    'time-window': {
      type: 'integer',
      description: "Protection time window in seconds (3-300).\nIf WebSocket disconnects for longer than this duration, all active orders\nfor the specified product type will be automatically cancelled.\n",
      
    }
  },
  required: ['time-window'],
} as const

export const builder = (yargs: any) => yargs
  .option('product', { type: 'string', choices: ['OPTIONS', 'DERIVATIVES', 'SPOT'], describe: "Product type for DCP protection.\n- `OPTIONS`: option orders (default)\n- `DERIVATIVES`: futures/perpetual orders\n- `SPOT`: spot orders\n" })
  .option('time-window', { type: 'number', demandOption: true, describe: "Protection time window in seconds (3-300).\nIf WebSocket disconnects for longer than this duration, all active orders\nfor the specified product type will be automatically cancelled.\n" })
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
  path: '/v5/order/disconnected-cancel-all',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/order/disconnected-cancel-all',
    
    body: { product: argv['product'], timeWindow: argv['time-window'] },
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
    operation: 'order set-dcp',
    method: 'POST',
    path: '/v5/order/disconnected-cancel-all',
    params: argv,
  })
  return innerHandler(argv)
}
