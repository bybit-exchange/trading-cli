// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-pre-upgrade-closed-pnl'
export const describe = "Get Pre-Upgrade Closed PnL"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Contract name.",
      
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
      description: "Records per page (1-100, default 50).",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response.",
      
    }
  },
  required: ['category', 'symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', demandOption: true, describe: "Contract name." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Max span from startTime is 7 days." })
  .option('limit', { type: 'number', describe: "Records per page (1-100, default 50)." })
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
  path: '/v5/pre-upgrade/position/closed-pnl',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/pre-upgrade/position/closed-pnl',
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
