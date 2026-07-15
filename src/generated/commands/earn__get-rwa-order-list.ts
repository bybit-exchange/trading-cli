// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-rwa-order-list'
export const describe = "Get Order List"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "System order ID for exact lookup (highest priority)",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID for exact lookup (used when `orderId` is empty)",
      
    },
    'order-type': {
      type: 'string',
      description: "Order type filter",
      enum: ['Stake', 'Redeem'],
    },
    'product-id': {
      type: 'integer',
      description: "Product ID filter",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (Unix seconds), default 7 days ago, earliest 180 days ago",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (Unix seconds), default now",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page, default 20, max 50",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor (returned as `nextPageCursor` in the previous response)",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', describe: "System order ID for exact lookup (highest priority)" })
  .option('order-link-id', { type: 'string', describe: "User-defined order ID for exact lookup (used when `orderId` is empty)" })
  .option('order-type', { type: 'string', choices: ['Stake', 'Redeem'], describe: "Order type filter" })
  .option('product-id', { type: 'number', describe: "Product ID filter" })
  .option('start-time', { type: 'number', describe: "Start timestamp (Unix seconds), default 7 days ago, earliest 180 days ago" })
  .option('end-time', { type: 'number', describe: "End timestamp (Unix seconds), default now" })
  .option('limit', { type: 'number', describe: "Number of records per page, default 20, max 50" })
  .option('cursor', { type: 'string', describe: "Pagination cursor (returned as `nextPageCursor` in the previous response)" })
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
  path: '/v5/earn/rwa/order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/rwa/order',
    query: filterDefined({ orderId: argv['order-id'], orderLinkId: argv['order-link-id'], orderType: argv['order-type'], productId: argv['product-id'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
