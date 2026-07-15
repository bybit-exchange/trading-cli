// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-fixed-term-order'
export const describe = "Get Fixed Term Order History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-type': {
      type: 'string',
      description: "Order type filter; returns all types if not specified",
      enum: ['Stake', 'Redeem', 'Reinvest'],
    },
    'product-id': {
      type: 'string',
      description: "Product ID filter",
      
    },
    'category': {
      type: 'string',
      description: "Product category filter; must be provided when `productId` is specified",
      enum: ['FixedTermSaving', 'FundPool', 'FundPoolPremium'],
    },
    'order-id': {
      type: 'string',
      description: "Exact order ID search",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds)",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds)",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page, default 20, max 50",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor, use `nextPageCursor` from the previous response",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-type', { type: 'string', choices: ['Stake', 'Redeem', 'Reinvest'], describe: "Order type filter; returns all types if not specified" })
  .option('product-id', { type: 'string', describe: "Product ID filter" })
  .option('category', { type: 'string', choices: ['FixedTermSaving', 'FundPool', 'FundPoolPremium'], describe: "Product category filter; must be provided when `productId` is specified" })
  .option('order-id', { type: 'string', describe: "Exact order ID search" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds)" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds)" })
  .option('limit', { type: 'number', describe: "Number of records per page, default 20, max 50" })
  .option('cursor', { type: 'string', describe: "Pagination cursor, use `nextPageCursor` from the previous response" })
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
  path: '/v5/earn/fixed-term/order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/fixed-term/order',
    query: filterDefined({ orderType: argv['order-type'], productId: argv['product-id'], category: argv['category'], orderId: argv['order-id'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
