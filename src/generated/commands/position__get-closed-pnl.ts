// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-closed-pnl'
export const describe = "Get closed profit and loss records"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['linear'],
    },
    'symbol': {
      type: 'string',
      description: "Contract name.",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. Defaults to 7 days ago if both times omitted.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Max range with startTime is 7 days.",
      
    },
    'limit': {
      type: 'integer',
      description: "Records per page. Range [1, 100].",
      
    },
    'cursor': {
      type: 'string',
      description: "Cursor for pagination. Use nextPageCursor from previous response.",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', describe: "Contract name." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. Defaults to 7 days ago if both times omitted." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Max range with startTime is 7 days." })
  .option('limit', { type: 'number', describe: "Records per page. Range [1, 100]." })
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
  path: '/v5/position/closed-pnl',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/position/closed-pnl',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
