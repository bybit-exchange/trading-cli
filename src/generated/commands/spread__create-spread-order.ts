// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-spread-order'
export const describe = "Create Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Spread combination symbol name.",
      
    },
    'side': {
      type: 'string',
      description: "Order direction.",
      enum: ['Buy', 'Sell'],
    },
    'order-type': {
      type: 'string',
      description: "Order type.",
      enum: ['Limit', 'Market'],
    },
    'qty': {
      type: 'string',
      description: "Order quantity (string-formatted number).",
      
    },
    'price': {
      type: 'string',
      description: "Order price (string-formatted number). Required for Limit orders.\nNot required for Market orders.\n",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined custom order identifier. Maximum 45 characters.\nSupports alphanumeric characters, dashes, and underscores.\n",
      
    },
    'time-in-force': {
      type: 'string',
      description: "Time-in-force strategy for order execution.\n- `GTC`: Good Till Cancel (default for Limit).\n- `IOC`: Immediate or Cancel.\n- `FOK`: Fill or Kill.\n- `PostOnly`: Maker-only; rejected if it would take liquidity.\n",
      enum: ['GTC', 'IOC', 'FOK', 'PostOnly'],
    }
  },
  required: ['symbol', 'side', 'order-type', 'qty'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Spread combination symbol name." })
  .option('side', { type: 'string', choices: ['Buy', 'Sell'], demandOption: true, describe: "Order direction." })
  .option('order-type', { type: 'string', choices: ['Limit', 'Market'], demandOption: true, describe: "Order type." })
  .option('qty', { type: 'string', demandOption: true, describe: "Order quantity (string-formatted number)." })
  .option('price', { type: 'string', describe: "Order price (string-formatted number). Required for Limit orders.\nNot required for Market orders.\n" })
  .option('order-link-id', { type: 'string', describe: "User-defined custom order identifier. Maximum 45 characters.\nSupports alphanumeric characters, dashes, and underscores.\n" })
  .option('time-in-force', { type: 'string', choices: ['GTC', 'IOC', 'FOK', 'PostOnly'], describe: "Time-in-force strategy for order execution.\n- `GTC`: Good Till Cancel (default for Limit).\n- `IOC`: Immediate or Cancel.\n- `FOK`: Fill or Kill.\n- `PostOnly`: Maker-only; rejected if it would take liquidity.\n" })
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
  path: '/v5/spread/order/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/spread/order/create',
    
    body: { symbol: argv['symbol'], side: argv['side'], orderType: argv['order-type'], qty: argv['qty'], price: argv['price'], orderLinkId: argv['order-link-id'], timeInForce: argv['time-in-force'] },
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
    operation: 'spread create-spread-order',
    method: 'POST',
    path: '/v5/spread/order/create',
    params: argv,
  })
  return innerHandler(argv)
}
