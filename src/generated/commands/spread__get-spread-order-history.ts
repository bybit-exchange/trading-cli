// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-spread-order-history'
export const describe = "Get Order History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Spread combination symbol name.",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin to filter by.",
      
    },
    'order-id': {
      type: 'string',
      description: "Spread combination order ID. Has higher priority than time-based filters.\n",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined custom order ID. Has higher priority than time-based filters.\n",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. See time range logic in description.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. See time range logic in description.",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of results per page. Range `[1, 50]`. Default `20`.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor token from `nextPageCursor` in a previous response.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', describe: "Spread combination symbol name." })
  .option('base-coin', { type: 'string', describe: "Base coin to filter by." })
  .option('order-id', { type: 'string', describe: "Spread combination order ID. Has higher priority than time-based filters.\n" })
  .option('order-link-id', { type: 'string', describe: "User-defined custom order ID. Has higher priority than time-based filters.\n" })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. See time range logic in description." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. See time range logic in description." })
  .option('limit', { type: 'number', describe: "Number of results per page. Range `[1, 50]`. Default `20`." })
  .option('cursor', { type: 'string', describe: "Pagination cursor token from `nextPageCursor` in a previous response." })
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
  path: '/v5/spread/order/history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spread/order/history',
    query: filterDefined({ symbol: argv['symbol'], baseCoin: argv['base-coin'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
