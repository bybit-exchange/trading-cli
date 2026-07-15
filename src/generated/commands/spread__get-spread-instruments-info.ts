// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-spread-instruments-info'
export const describe = "Get Spread Instruments Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Spread combination symbol name, e.g. `SOLUSDT_SOL/USDT`",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin in uppercase, e.g. `SOL`",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page, range `[1, 500]`. Default is `200`",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor; use `nextPageCursor` from the previous response",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', describe: "Spread combination symbol name, e.g. `SOLUSDT_SOL/USDT`" })
  .option('base-coin', { type: 'string', describe: "Base coin in uppercase, e.g. `SOL`" })
  .option('limit', { type: 'number', describe: "Number of records per page, range `[1, 500]`. Default is `200`" })
  .option('cursor', { type: 'string', describe: "Pagination cursor; use `nextPageCursor` from the previous response" })
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
  path: '/v5/spread/instrument',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spread/instrument',
    query: filterDefined({ symbol: argv['symbol'], baseCoin: argv['base-coin'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
