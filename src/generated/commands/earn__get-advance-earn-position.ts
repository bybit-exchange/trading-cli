// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-advance-earn-position'
export const describe = "Get Position"
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
      description: "Product ID filter",
      
    },
    'coin': {
      type: 'string',
      description: "Coin name filter. e.g., `BTC`",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of items per page. Default `20`, Max `20`",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use `nextPageCursor` from previous response",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['DualAssets', 'SmartLeverage', 'DoubleWin', 'DiscountBuy'], demandOption: true, describe: "Product category" })
  .option('product-id', { type: 'number', describe: "Product ID filter" })
  .option('coin', { type: 'string', describe: "Coin name filter. e.g., `BTC`" })
  .option('limit', { type: 'number', describe: "Number of items per page. Default `20`, Max `20`" })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Use `nextPageCursor` from previous response" })
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
  path: '/v5/earn/advance/position',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/advance/position',
    query: filterDefined({ category: argv['category'], productId: argv['product-id'], coin: argv['coin'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
