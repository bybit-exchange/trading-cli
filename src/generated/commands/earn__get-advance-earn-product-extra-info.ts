// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-advance-earn-product-extra-info'
export const describe = "Get Product Extra Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product category",
      enum: ['DualAssets', 'SmartLeverage', 'DoubleWin', 'DiscountBuy'],
    },
    'product-id': {
      type: 'integer',
      description: "Product ID. Optional for DiscountBuy — when omitted (or 0), all available offers are returned.\nRequired for DualAssets, SmartLeverage, and DoubleWin.\n",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['DualAssets', 'SmartLeverage', 'DoubleWin', 'DiscountBuy'], demandOption: true, describe: "Product category" })
  .option('product-id', { type: 'number', describe: "Product ID. Optional for DiscountBuy — when omitted (or 0), all available offers are returned.\nRequired for DualAssets, SmartLeverage, and DoubleWin.\n" })
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
  path: '/v5/earn/advance/product-extra-info',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/advance/product-extra-info',
    query: filterDefined({ category: argv['category'], productId: argv['product-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
