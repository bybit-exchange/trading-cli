// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-orderbook'
export const describe = "Get Orderbook"
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
    'limit': {
      type: 'integer',
      description: "Number of bid/ask levels per side.\n- `spot`: 1–200, default `1`\n- `linear` / `inverse`: 1–500, default `25`\n- `option`: 1–25, default `1`\n",
      
    }
  },
  required: ['category', 'symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type.\n- `spot`: Spot\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n- `option`: Option\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
  .option('limit', { type: 'number', describe: "Number of bid/ask levels per side.\n- `spot`: 1–200, default `1`\n- `linear` / `inverse`: 1–500, default `25`\n- `option`: 1–25, default `1`\n" })
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
  path: '/v5/market/orderbook',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/orderbook',
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
