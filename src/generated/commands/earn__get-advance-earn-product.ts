// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-advance-earn-product'
export const describe = "Get Product Info"
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
    'coin': {
      type: 'string',
      description: "Coin name, uppercase. e.g., `BTC`, `ETH`. For `DiscountBuy`, filters by underlying asset.",
      
    },
    'duration': {
      type: 'string',
      description: "Product duration filter. e.g., `8h`, `1d`, `3d`, `6d`, `12d`. **Not applicable to `DiscountBuy`** — this parameter is ignored when `category=DiscountBuy`.",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['DualAssets', 'SmartLeverage', 'DoubleWin', 'DiscountBuy'], demandOption: true, describe: "Product category" })
  .option('coin', { type: 'string', describe: "Coin name, uppercase. e.g., `BTC`, `ETH`. For `DiscountBuy`, filters by underlying asset." })
  .option('duration', { type: 'string', describe: "Product duration filter. e.g., `8h`, `1d`, `3d`, `6d`, `12d`. **Not applicable to `DiscountBuy`** — this parameter is ignored when `category=DiscountBuy`." })
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
  path: '/v5/earn/advance/product',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/advance/product',
    query: filterDefined({ category: argv['category'], coin: argv['coin'], duration: argv['duration'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
