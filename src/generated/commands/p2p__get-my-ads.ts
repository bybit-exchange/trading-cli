// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-my-ads'
export const describe = "Get My Ads"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'item-id': {
      type: 'string',
      description: "Advertisement ID",
      
    },
    'status': {
      type: 'string',
      description: "1: Sold Out; 2: Available",
      
    },
    'side': {
      type: 'string',
      description: "Ad side for token. 0: buy; 1: sell",
      
    },
    'token-id': {
      type: 'string',
      description: "Token id. e.g. USDT, ETH, BTC",
      
    },
    'page': {
      type: 'string',
      description: "Page number. Default Value is 1",
      
    },
    'size': {
      type: 'string',
      description: "Page size. Default Value is 10, max is 30",
      
    },
    'currency-id': {
      type: 'string',
      description: "Currency id. e.g. HKD, USD, EUR",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('item-id', { type: 'string', describe: "Advertisement ID" })
  .option('status', { type: 'string', describe: "1: Sold Out; 2: Available" })
  .option('side', { type: 'string', describe: "Ad side for token. 0: buy; 1: sell" })
  .option('token-id', { type: 'string', describe: "Token id. e.g. USDT, ETH, BTC" })
  .option('page', { type: 'string', describe: "Page number. Default Value is 1" })
  .option('size', { type: 'string', describe: "Page size. Default Value is 10, max is 30" })
  .option('currency-id', { type: 'string', describe: "Currency id. e.g. HKD, USD, EUR" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  
function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'POST',
  path: '/v5/p2p/item/personal/list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/p2p/item/personal/list',
    
    body: { itemId: argv['item-id'], status: argv['status'], side: argv['side'], tokenId: argv['token-id'], page: argv['page'], size: argv['size'], currencyId: argv['currency-id'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
