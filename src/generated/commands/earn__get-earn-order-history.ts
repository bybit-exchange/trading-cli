// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-earn-order-history'
export const describe = "Get Stake/Redeem Order History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product category",
      enum: ['FlexibleSaving', 'OnChain'],
    },
    'order-id': {
      type: 'string',
      description: "Order ID; for OnChain category, at least one of `orderId` or `orderLinkId` is required",
      
    },
    'order-link-id': {
      type: 'string',
      description: "Custom order ID; if reused historically, returns the latest record",
      
    },
    'product-id': {
      type: 'string',
      description: "Product ID",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds), defaults to 7 days before current time",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds), interval from `startTime` must not exceed 7 days",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor, use `nextPageCursor` from the previous response",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['FlexibleSaving', 'OnChain'], demandOption: true, describe: "Product category" })
  .option('order-id', { type: 'string', describe: "Order ID; for OnChain category, at least one of `orderId` or `orderLinkId` is required" })
  .option('order-link-id', { type: 'string', describe: "Custom order ID; if reused historically, returns the latest record" })
  .option('product-id', { type: 'string', describe: "Product ID" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds), defaults to 7 days before current time" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds), interval from `startTime` must not exceed 7 days" })
  .option('limit', { type: 'number', describe: "Number of records per page" })
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
  path: '/v5/earn/order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/order',
    query: filterDefined({ category: argv['category'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], productId: argv['product-id'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
