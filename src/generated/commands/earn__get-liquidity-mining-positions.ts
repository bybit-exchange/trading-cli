// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-liquidity-mining-positions'
export const describe = "Get Active Positions"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-id': {
      type: 'string',
      description: "Product ID filter",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin filter, e.g. `BTC`",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'string', describe: "Product ID filter" })
  .option('base-coin', { type: 'string', describe: "Base coin filter, e.g. `BTC`" })
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
  path: '/v5/earn/liquidity-mining/position',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/liquidity-mining/position',
    query: filterDefined({ productId: argv['product-id'], baseCoin: argv['base-coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
