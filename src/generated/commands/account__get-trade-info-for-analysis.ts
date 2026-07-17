// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-trade-info-for-analysis'
export const describe = "Get Trade Info For Analysis"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Trading pair, e.g. `BTCUSDT`, `ETHUSDT`.",
      
    },
    'start-time': {
      type: 'integer',
      description: "Query start time in milliseconds timestamp.",
      
    },
    'end-time': {
      type: 'integer',
      description: "Query end time in milliseconds timestamp.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', describe: "Trading pair, e.g. `BTCUSDT`, `ETHUSDT`." })
  .option('start-time', { type: 'number', describe: "Query start time in milliseconds timestamp." })
  .option('end-time', { type: 'number', describe: "Query end time in milliseconds timestamp." })
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
  path: '/v5/account/trade-info-for-analysis',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/account/trade-info-for-analysis',
    query: filterDefined({ symbol: argv['symbol'], startTime: argv['start-time'], endTime: argv['end-time'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
