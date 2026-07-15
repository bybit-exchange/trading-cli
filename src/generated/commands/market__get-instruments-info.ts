// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-instruments-info'
export const describe = "Get Instruments Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.\n- `spot`: Spot\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n- `option`: Option\n",
      enum: ['spot', 'linear', 'inverse', 'option'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`",
      
    },
    'status': {
      type: 'string',
      description: "Filter by instrument trading status",
      enum: ['Trading', 'PreLaunch', 'Delivering'],
    },
    'base-coin': {
      type: 'string',
      description: "Base currency in uppercase, e.g. `BTC`. For linear/inverse/option only",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page, range 1–1000. Default is `500`",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor, use `nextPageCursor` from previous response",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type.\n- `spot`: Spot\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n- `option`: Option\n" })
  .option('symbol', { type: 'string', describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
  .option('status', { type: 'string', choices: ['Trading', 'PreLaunch', 'Delivering'], describe: "Filter by instrument trading status" })
  .option('base-coin', { type: 'string', describe: "Base currency in uppercase, e.g. `BTC`. For linear/inverse/option only" })
  .option('limit', { type: 'number', describe: "Number of records per page, range 1–1000. Default is `500`" })
  .option('cursor', { type: 'string', describe: "Pagination cursor, use `nextPageCursor` from previous response" })
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
  path: '/v5/market/instruments-info',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/instruments-info',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], status: argv['status'], baseCoin: argv['base-coin'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
