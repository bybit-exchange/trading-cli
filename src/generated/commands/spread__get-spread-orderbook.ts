// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-spread-orderbook'
export const describe = "Get Spread Orderbook"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Spread combination symbol name, e.g. `SOLUSDT_SOL/USDT`",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of bid/ask levels per side, range `[1, 25]`. Default is `1`",
      
    }
  },
  required: ['symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Spread combination symbol name, e.g. `SOLUSDT_SOL/USDT`" })
  .option('limit', { type: 'number', describe: "Number of bid/ask levels per side, range `[1, 25]`. Default is `1`" })
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
  path: '/v5/spread/orderbook',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spread/orderbook',
    query: filterDefined({ symbol: argv['symbol'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
