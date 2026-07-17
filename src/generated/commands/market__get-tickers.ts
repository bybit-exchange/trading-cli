// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-tickers'
export const describe = "Get Tickers"
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
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`. For `option`, either `symbol` or `baseCoin` must be provided",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin in uppercase, e.g. `BTC`. For `option` category only",
      
    },
    'exp-date': {
      type: 'string',
      description: "Expiry date filter, format e.g. `25DEC22`. For `option` category only",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type.\n- `spot`: Spot\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n- `option`: Option\n" })
  .option('symbol', { type: 'string', describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`. For `option`, either `symbol` or `baseCoin` must be provided" })
  .option('base-coin', { type: 'string', describe: "Base coin in uppercase, e.g. `BTC`. For `option` category only" })
  .option('exp-date', { type: 'string', describe: "Expiry date filter, format e.g. `25DEC22`. For `option` category only" })
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
  path: '/v5/market/tickers',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/tickers',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], baseCoin: argv['base-coin'], expDate: argv['exp-date'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
