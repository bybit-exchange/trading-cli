// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-fixed-term-position'
export const describe = "Get Fixed Term Position"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-id': {
      type: 'string',
      description: "Product ID filter",
      
    },
    'category': {
      type: 'string',
      description: "Product category filter",
      enum: ['FixedTermSaving', 'FundPool', 'FundPoolPremium'],
    },
    'coin': {
      type: 'string',
      description: "Coin filter (uppercase), e.g. `BTC`, `ETH`",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'string', describe: "Product ID filter" })
  .option('category', { type: 'string', choices: ['FixedTermSaving', 'FundPool', 'FundPoolPremium'], describe: "Product category filter" })
  .option('coin', { type: 'string', describe: "Coin filter (uppercase), e.g. `BTC`, `ETH`" })
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
  path: '/v5/earn/fixed-term/position',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/fixed-term/position',
    query: filterDefined({ productId: argv['product-id'], category: argv['category'], coin: argv['coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
