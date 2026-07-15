// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-pre-upgrade-order-history'
export const describe = "Get Pre-upgrade Order History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type:\n- `linear`: USDT perpetual, USDC contract\n- `inverse`: Inverse perpetual, Inverse futures\n- `option`: Options\n- `spot`: Spot trading\n",
      enum: ['linear', 'inverse', 'option', 'spot'],
    },
    'symbol': {
      type: 'string',
      description: "Symbol name, e.g. `BTCUSDT`, uppercase only. For USDC perp, `symbol` is **required**",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin, e.g. `BTC`, uppercase only. For `option` queries only",
      
    },
    'order-id': {
      type: 'string',
      description: "Order ID",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User customised order ID",
      
    },
    'order-filter': {
      type: 'string',
      description: "Order filter type:\n- `Order`: Active orders\n- `StopOrder`: Conditional orders\n",
      enum: ['Order', 'StopOrder'],
    },
    'order-status': {
      type: 'string',
      description: "Order status filter. Not supported for `spot` category.\n",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in **milliseconds**. Default: 7 days before current time. Must pair with `endTime`; span <= 7 days",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in **milliseconds**. Default: current time. Must pair with `startTime`; span <= 7 days",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of items per page. Default: `20`, Range: [`1`, `50`]",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse', 'option', 'spot'], demandOption: true, describe: "Product type:\n- `linear`: USDT perpetual, USDC contract\n- `inverse`: Inverse perpetual, Inverse futures\n- `option`: Options\n- `spot`: Spot trading\n" })
  .option('symbol', { type: 'string', describe: "Symbol name, e.g. `BTCUSDT`, uppercase only. For USDC perp, `symbol` is **required**" })
  .option('base-coin', { type: 'string', describe: "Base coin, e.g. `BTC`, uppercase only. For `option` queries only" })
  .option('order-id', { type: 'string', describe: "Order ID" })
  .option('order-link-id', { type: 'string', describe: "User customised order ID" })
  .option('order-filter', { type: 'string', choices: ['Order', 'StopOrder'], describe: "Order filter type:\n- `Order`: Active orders\n- `StopOrder`: Conditional orders\n" })
  .option('order-status', { type: 'string', describe: "Order status filter. Not supported for `spot` category.\n" })
  .option('start-time', { type: 'number', describe: "Start timestamp in **milliseconds**. Default: 7 days before current time. Must pair with `endTime`; span <= 7 days" })
  .option('end-time', { type: 'number', describe: "End timestamp in **milliseconds**. Default: current time. Must pair with `startTime`; span <= 7 days" })
  .option('limit', { type: 'number', describe: "Number of items per page. Default: `20`, Range: [`1`, `50`]" })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  
function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'GET',
  path: '/v5/pre-upgrade/order/history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/pre-upgrade/order/history',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], baseCoin: argv['base-coin'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], orderFilter: argv['order-filter'], orderStatus: argv['order-status'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
