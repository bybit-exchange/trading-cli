// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-position-symbol-info'
export const describe = "Get Futures Leverage"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type:\n- `linear`: USDT perpetual, USDC contract\n- `inverse`: Inverse perpetual, Inverse futures\n",
      enum: ['linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Symbol name, e.g. `BTCUSDT`, uppercase only",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse'], demandOption: true, describe: "Product type:\n- `linear`: USDT perpetual, USDC contract\n- `inverse`: Inverse perpetual, Inverse futures\n" })
  .option('symbol', { type: 'string', describe: "Symbol name, e.g. `BTCUSDT`, uppercase only" })
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
  path: '/v5/position/symbol-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/position/symbol-info',
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
