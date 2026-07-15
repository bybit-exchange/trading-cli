// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'cancel-all-orders'
export const describe = "Cancel All Orders"
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
      description: "Trading pair or contract name. Required for linear/inverse if baseCoin/settleCoin not provided.",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin. Cancels all orders for that coin in the category.",
      
    },
    'settle-coin': {
      type: 'string',
      description: "Settlement coin. USDC/USDT for options; required for linear/inverse if symbol/baseCoin absent.",
      
    },
    'order-filter': {
      type: 'string',
      description: "Filter by order type. Valid values vary by category:\n- **linear/inverse**: `Order` (normal orders), `StopOrder` (conditional orders), `OpenOrder` (all open orders)\n- **spot**: `Order` (normal orders), `tpslOrder` (TP/SL orders), `StopOrder` (conditional orders), `OcoOrder` (OCO orders), `BidirectionalTpslOrder` (bidirectional TP/SL orders)\n- **option**: `Order` (normal orders), `StopOrder` (conditional orders)\n",
      enum: ['Order', 'tpslOrder', 'StopOrder', 'OcoOrder', 'BidirectionalTpslOrder', 'OpenOrder'],
    },
    'stop-order-type': {
      type: 'string',
      description: "Conditional order type (linear/inverse only, with orderFilter=StopOrder).",
      enum: ['Stop'],
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', describe: "Trading pair or contract name. Required for linear/inverse if baseCoin/settleCoin not provided." })
  .option('base-coin', { type: 'string', describe: "Base coin. Cancels all orders for that coin in the category." })
  .option('settle-coin', { type: 'string', describe: "Settlement coin. USDC/USDT for options; required for linear/inverse if symbol/baseCoin absent." })
  .option('order-filter', { type: 'string', choices: ['Order', 'tpslOrder', 'StopOrder', 'OcoOrder', 'BidirectionalTpslOrder', 'OpenOrder'], describe: "Filter by order type. Valid values vary by category:\n- **linear/inverse**: `Order` (normal orders), `StopOrder` (conditional orders), `OpenOrder` (all open orders)\n- **spot**: `Order` (normal orders), `tpslOrder` (TP/SL orders), `StopOrder` (conditional orders), `OcoOrder` (OCO orders), `BidirectionalTpslOrder` (bidirectional TP/SL orders)\n- **option**: `Order` (normal orders), `StopOrder` (conditional orders)\n" })
  .option('stop-order-type', { type: 'string', choices: ['Stop'], describe: "Conditional order type (linear/inverse only, with orderFilter=StopOrder)." })
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
  path: '/v5/order/cancel-all',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/order/cancel-all',
    
    body: { category: argv['category'], symbol: argv['symbol'], baseCoin: argv['base-coin'], settleCoin: argv['settle-coin'], orderFilter: argv['order-filter'], stopOrderType: argv['stop-order-type'] },
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
    operation: 'order cancel-all-orders',
    method: 'POST',
    path: '/v5/order/cancel-all',
    params: argv,
  })
  return innerHandler(argv)
}
