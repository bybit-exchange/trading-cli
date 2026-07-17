// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-funding-rate-history'
export const describe = "Get Funding Rate History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n",
      enum: ['linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page, range 1–200. Default is `200`",
      
    }
  },
  required: ['category', 'symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse'], demandOption: true, describe: "Product type.\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds" })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds" })
  .option('limit', { type: 'number', describe: "Number of records per page, range 1–200. Default is `200`" })
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
  path: '/v5/market/funding/history',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/funding/history',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
