// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-trade-history'
export const describe = "Get Trade History"
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
    'order-id': {
      type: 'string',
      description: "Filter by order ID.",
      
    },
    'order-link-id': {
      type: 'string',
      description: "Filter by user-defined order ID.",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin filter. BTC default for options.",
      
    },
    'settle-coin': {
      type: 'string',
      description: "Settlement coin filter (linear, inverse, option only).",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Max span from startTime is 7 days.",
      
    },
    'exec-type': {
      type: 'string',
      description: "Execution type filter.",
      
    },
    'limit': {
      type: 'integer',
      description: "Items per page (1-100, default 50).",
      
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
  .option('order-id', { type: 'string', describe: "Filter by order ID." })
  .option('order-link-id', { type: 'string', describe: "Filter by user-defined order ID." })
  .option('base-coin', { type: 'string', describe: "Base coin filter. BTC default for options." })
  .option('settle-coin', { type: 'string', describe: "Settlement coin filter (linear, inverse, option only)." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Max span from startTime is 7 days." })
  .option('exec-type', { type: 'string', describe: "Execution type filter." })
  .option('limit', { type: 'number', describe: "Items per page (1-100, default 50)." })
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
  path: '/v5/execution/list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/execution/list',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], baseCoin: argv['base-coin'], settleCoin: argv['settle-coin'], startTime: argv['start-time'], endTime: argv['end-time'], execType: argv['exec-type'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
