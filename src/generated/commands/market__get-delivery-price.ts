// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-delivery-price'
export const describe = "Get Delivery Price"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.\n- `linear`: USDT / USDC futures\n- `inverse`: Inverse futures\n- `option`: Option\n",
      enum: ['linear', 'inverse', 'option'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base asset in uppercase; defaults to `BTC`. For `option` only",
      
    },
    'settle-coin': {
      type: 'string',
      description: "Settlement currency in uppercase; defaults to `USDC`",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page, range 1–200. Default is `50`",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor, use `nextPageCursor` from previous response",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse', 'option'], demandOption: true, describe: "Product type.\n- `linear`: USDT / USDC futures\n- `inverse`: Inverse futures\n- `option`: Option\n" })
  .option('symbol', { type: 'string', describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
  .option('base-coin', { type: 'string', describe: "Base asset in uppercase; defaults to `BTC`. For `option` only" })
  .option('settle-coin', { type: 'string', describe: "Settlement currency in uppercase; defaults to `USDC`" })
  .option('limit', { type: 'number', describe: "Number of records per page, range 1–200. Default is `50`" })
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
  path: '/v5/market/delivery-price',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/delivery-price',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], baseCoin: argv['base-coin'], settleCoin: argv['settle-coin'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
