// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-order-history'
export const describe = "Get Order History"
export const isWriteOp = false

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
    'base-coin': {
      type: 'string',
      description: "Base coin filter.",
      
    },
    'settle-coin': {
      type: 'string',
      description: "Settlement coin filter.",
      
    },
    'order-id': {
      type: 'string',
      description: "Filter by system-generated order ID.",
      
    },
    'order-link-id': {
      type: 'string',
      description: "Filter by user-defined order ID.",
      
    },
    'order-filter': {
      type: 'string',
      description: "Filter by order type. Returns all types if omitted.",
      enum: ['Order', 'StopOrder', 'tpslOrder', 'OcoOrder', 'BidirectionalTpslOrder'],
    },
    'order-status': {
      type: 'string',
      description: "Filter by order status. Returns all terminal statuses if omitted.",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Max span from startTime is 7 days.",
      
    },
    'limit': {
      type: 'integer',
      description: "Records per page (1-50, default 20).",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response.",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', describe: "Trading pair or contract name." })
  .option('base-coin', { type: 'string', describe: "Base coin filter." })
  .option('settle-coin', { type: 'string', describe: "Settlement coin filter." })
  .option('order-id', { type: 'string', describe: "Filter by system-generated order ID." })
  .option('order-link-id', { type: 'string', describe: "Filter by user-defined order ID." })
  .option('order-filter', { type: 'string', choices: ['Order', 'StopOrder', 'tpslOrder', 'OcoOrder', 'BidirectionalTpslOrder'], describe: "Filter by order type. Returns all types if omitted." })
  .option('order-status', { type: 'string', describe: "Filter by order status. Returns all terminal statuses if omitted." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Max span from startTime is 7 days." })
  .option('limit', { type: 'number', describe: "Records per page (1-50, default 20)." })
  .option('cursor', { type: 'string', describe: "Pagination cursor from previous response." })
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
  path: '/v5/order/history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/order/history',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], baseCoin: argv['base-coin'], settleCoin: argv['settle-coin'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], orderFilter: argv['order-filter'], orderStatus: argv['order-status'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
