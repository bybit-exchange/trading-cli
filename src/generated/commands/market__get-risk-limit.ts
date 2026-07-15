// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-risk-limit'
export const describe = "Get Risk Limit"
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
    'cursor': {
      type: 'string',
      description: "Pagination cursor for retrieving subsequent data sets",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse'], demandOption: true, describe: "Product type.\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n" })
  .option('symbol', { type: 'string', describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
  .option('cursor', { type: 'string', describe: "Pagination cursor for retrieving subsequent data sets" })
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
  path: '/v5/market/risk-limit',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/risk-limit',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
