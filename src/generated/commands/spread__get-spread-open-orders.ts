// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-spread-open-orders'
export const describe = "Get Open Orders"
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
      description: "Spread combination order ID.",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined custom order ID.",
      
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
  .option('order-id', { type: 'string', describe: "Spread combination order ID." })
  .option('order-link-id', { type: 'string', describe: "User-defined custom order ID." })
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
  path: '/v5/spread/order/realtime',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spread/order/realtime',
    query: filterDefined({ symbol: argv['symbol'], baseCoin: argv['base-coin'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
