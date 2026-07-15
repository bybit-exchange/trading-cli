// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-order-price-limit'
export const describe = "Get Order Price Limit"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type. Defaults to `linear` if omitted.\n- `spot`: Spot\n- `linear`: USDT contract\n- `inverse`: Inverse contract\n",
      enum: ['spot', 'linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`",
      
    }
  },
  required: ['symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse'], describe: "Product type. Defaults to `linear` if omitted.\n- `spot`: Spot\n- `linear`: USDT contract\n- `inverse`: Inverse contract\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
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
  path: '/v5/market/price-limit',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/price-limit',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
