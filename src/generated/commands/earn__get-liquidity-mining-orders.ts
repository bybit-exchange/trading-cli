// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-liquidity-mining-orders'
export const describe = "Get Order History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "System order ID; use with `orderLinkId` as mutually exclusive single-order lookup",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID; use with `orderId` as mutually exclusive single-order lookup",
      
    },
    'product-id': {
      type: 'string',
      description: "Product ID filter (list mode only)",
      
    },
    'order-type': {
      type: 'string',
      description: "Order type filter (list mode only)",
      enum: ['AddLiquidity', 'RemoveLiquidity', 'Reinvest', 'AddMargin'],
    },
    'status': {
      type: 'string',
      description: "Order status filter (list mode only). Supported values: `Success`, `Processing`.\n`Fail` orders are returned by default but cannot be used as a filter value — passing `status=Fail` returns error `180001`.\nIf omitted, returns `Success`, `Processing`, and `Fail` orders.\n",
      enum: ['Success', 'Processing'],
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds, list mode only)",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds, list mode only)",
      
    },
    'limit': {
      type: 'integer',
      description: "Records per page, default 20, max 50 (list mode only)",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response `nextPageCursor` (list mode only)",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', describe: "System order ID; use with `orderLinkId` as mutually exclusive single-order lookup" })
  .option('order-link-id', { type: 'string', describe: "User-defined order ID; use with `orderId` as mutually exclusive single-order lookup" })
  .option('product-id', { type: 'string', describe: "Product ID filter (list mode only)" })
  .option('order-type', { type: 'string', choices: ['AddLiquidity', 'RemoveLiquidity', 'Reinvest', 'AddMargin'], describe: "Order type filter (list mode only)" })
  .option('status', { type: 'string', choices: ['Success', 'Processing'], describe: "Order status filter (list mode only). Supported values: `Success`, `Processing`.\n`Fail` orders are returned by default but cannot be used as a filter value — passing `status=Fail` returns error `180001`.\nIf omitted, returns `Success`, `Processing`, and `Fail` orders.\n" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds, list mode only)" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds, list mode only)" })
  .option('limit', { type: 'number', describe: "Records per page, default 20, max 50 (list mode only)" })
  .option('cursor', { type: 'string', describe: "Pagination cursor from previous response `nextPageCursor` (list mode only)" })
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
  path: '/v5/earn/liquidity-mining/order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/liquidity-mining/order',
    query: filterDefined({ orderId: argv['order-id'], orderLinkId: argv['order-link-id'], productId: argv['product-id'], orderType: argv['order-type'], status: argv['status'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
