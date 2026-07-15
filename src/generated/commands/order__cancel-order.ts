// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'cancel-order'
export const describe = "Cancel Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['spot', 'linear', 'inverse', 'option'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair or contract name.",
      
    },
    'order-id': {
      type: 'string',
      description: "System-generated order ID. Either `orderId` or `orderLinkId` is required.",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID. Either `orderId` or `orderLinkId` is required.",
      
    },
    'order-filter': {
      type: 'string',
      description: "Order type filter (spot only).\n- `Order`: normal order (default)\n- `tpslOrder`: TP/SL order\n- `StopOrder`: conditional order\n",
      enum: ['Order', 'tpslOrder', 'StopOrder'],
    }
  },
  required: ['category', 'symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair or contract name." })
  .option('order-id', { type: 'string', describe: "System-generated order ID. Either `orderId` or `orderLinkId` is required." })
  .option('order-link-id', { type: 'string', describe: "User-defined order ID. Either `orderId` or `orderLinkId` is required." })
  .option('order-filter', { type: 'string', choices: ['Order', 'tpslOrder', 'StopOrder'], describe: "Order type filter (spot only).\n- `Order`: normal order (default)\n- `tpslOrder`: TP/SL order\n- `StopOrder`: conditional order\n" })
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
  path: '/v5/order/cancel',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/order/cancel',
    
    body: { category: argv['category'], symbol: argv['symbol'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], orderFilter: argv['order-filter'] },
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
    operation: 'order cancel-order',
    method: 'POST',
    path: '/v5/order/cancel',
    params: argv,
  })
  return innerHandler(argv)
}
