// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-rpi-orderbook'
export const describe = "Get RPI Orderbook"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.\n- `spot`: Spot\n- `linear`: USDT contract\n- `inverse`: Inverse contract\n",
      enum: ['spot', 'linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of depth levels per side, range 1–50",
      
    }
  },
  required: ['symbol', 'limit'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse'], describe: "Product type.\n- `spot`: Spot\n- `linear`: USDT contract\n- `inverse`: Inverse contract\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
  .option('limit', { type: 'number', demandOption: true, describe: "Number of depth levels per side, range 1–50" })
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
  path: '/v5/market/rpi_orderbook',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/rpi_orderbook',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
