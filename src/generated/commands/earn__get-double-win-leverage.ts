// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-double-win-leverage'
export const describe = "Get Double Win Leverage"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-id': {
      type: 'integer',
      description: "Product ID (must be an RFQ product)",
      
    },
    'initial-price': {
      type: 'string',
      description: "Current index price of the underlying asset",
      
    },
    'lower-price': {
      type: 'string',
      description: "User-selected lower price bound. Must be a multiple of `priceTickSize`",
      
    },
    'upper-price': {
      type: 'string',
      description: "User-selected upper price bound. Must be a multiple of `priceTickSize`",
      
    }
  },
  required: ['product-id', 'initial-price', 'lower-price', 'upper-price'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'number', demandOption: true, describe: "Product ID (must be an RFQ product)" })
  .option('initial-price', { type: 'string', demandOption: true, describe: "Current index price of the underlying asset" })
  .option('lower-price', { type: 'string', demandOption: true, describe: "User-selected lower price bound. Must be a multiple of `priceTickSize`" })
  .option('upper-price', { type: 'string', demandOption: true, describe: "User-selected upper price bound. Must be a multiple of `priceTickSize`" })
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
  path: '/v5/earn/advance/double-win-leverage',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/advance/double-win-leverage',
    query: filterDefined({ productId: argv['product-id'], initialPrice: argv['initial-price'], lowerPrice: argv['lower-price'], upperPrice: argv['upper-price'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
