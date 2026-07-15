// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-move-position-history'
export const describe = "Get move position (block trade) history"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type filter.",
      enum: ['linear', 'spot', 'option', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Contract or trading pair name.",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. Range with endTime must be 7 days or less.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Range with startTime must be 7 days or less.",
      
    },
    'status': {
      type: 'string',
      description: "Block trade order status filter.",
      enum: ['Processing', 'Filled', 'Rejected'],
    },
    'block-trade-id': {
      type: 'string',
      description: "Block trade order ID for specific lookup.",
      
    },
    'limit': {
      type: 'string',
      description: "Records per page. Range [1, 200].",
      
    },
    'cursor': {
      type: 'string',
      description: "Cursor for pagination. Use nextPageCursor from previous response.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'spot', 'option', 'inverse'], describe: "Product type filter." })
  .option('symbol', { type: 'string', describe: "Contract or trading pair name." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. Range with endTime must be 7 days or less." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Range with startTime must be 7 days or less." })
  .option('status', { type: 'string', choices: ['Processing', 'Filled', 'Rejected'], describe: "Block trade order status filter." })
  .option('block-trade-id', { type: 'string', describe: "Block trade order ID for specific lookup." })
  .option('limit', { type: 'string', describe: "Records per page. Range [1, 200]." })
  .option('cursor', { type: 'string', describe: "Cursor for pagination. Use nextPageCursor from previous response." })
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
  path: '/v5/position/move-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/position/move-history',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], startTime: argv['start-time'], endTime: argv['end-time'], status: argv['status'], blockTradeId: argv['block-trade-id'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
