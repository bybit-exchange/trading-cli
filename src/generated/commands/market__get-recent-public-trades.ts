// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-recent-public-trades'
export const describe = "Get Recent Public Trades"
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
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`. Required for `spot`, `linear`, `inverse`",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin in uppercase. For `option` only; defaults to `BTC`",
      
    },
    'option-type': {
      type: 'string',
      description: "Option type filter. For `option` only",
      enum: ['Call', 'Put'],
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page.\n- `spot`: 1–60, default `60`\n- Others: 1–1000, default `500`\n",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type.\n- `spot`: Spot\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n- `option`: Option\n" })
  .option('symbol', { type: 'string', describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`. Required for `spot`, `linear`, `inverse`" })
  .option('base-coin', { type: 'string', describe: "Base coin in uppercase. For `option` only; defaults to `BTC`" })
  .option('option-type', { type: 'string', choices: ['Call', 'Put'], describe: "Option type filter. For `option` only" })
  .option('limit', { type: 'number', describe: "Number of records per page.\n- `spot`: 1–60, default `60`\n- Others: 1–1000, default `500`\n" })
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
  path: '/v5/market/recent-trade',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/recent-trade',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], baseCoin: argv['base-coin'], optionType: argv['option-type'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
