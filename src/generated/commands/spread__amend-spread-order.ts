// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'amend-spread-order'
export const describe = "Amend Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Spread combination symbol name.",
      
    },
    'order-id': {
      type: 'string',
      description: "Spread combination order ID. Either `orderId` or `orderLinkId` is required.\n",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined custom order ID. Either `orderId` or `orderLinkId` is required.\n",
      
    },
    'qty': {
      type: 'string',
      description: "New order quantity after modification (string-formatted number).\nAt least one of `qty` or `price` must be provided.\n",
      
    },
    'price': {
      type: 'string',
      description: "New order price after modification (string-formatted number).\nAt least one of `qty` or `price` must be provided.\n- `\"\"` (empty string): keeps the existing price unchanged.\n- `\"0\"`: updates the price to zero.\n",
      
    }
  },
  required: ['symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Spread combination symbol name." })
  .option('order-id', { type: 'string', describe: "Spread combination order ID. Either `orderId` or `orderLinkId` is required.\n" })
  .option('order-link-id', { type: 'string', describe: "User-defined custom order ID. Either `orderId` or `orderLinkId` is required.\n" })
  .option('qty', { type: 'string', describe: "New order quantity after modification (string-formatted number).\nAt least one of `qty` or `price` must be provided.\n" })
  .option('price', { type: 'string', describe: "New order price after modification (string-formatted number).\nAt least one of `qty` or `price` must be provided.\n- `\"\"` (empty string): keeps the existing price unchanged.\n- `\"0\"`: updates the price to zero.\n" })
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
  path: '/v5/spread/order/amend',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/spread/order/amend',
    
    body: { symbol: argv['symbol'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], qty: argv['qty'], price: argv['price'] },
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
    operation: 'spread amend-spread-order',
    method: 'POST',
    path: '/v5/spread/order/amend',
    params: argv,
  })
  return innerHandler(argv)
}
