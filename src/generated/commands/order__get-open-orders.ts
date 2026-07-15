// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-open-orders'
export const describe = "Get Open Orders"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['spot', 'linear', 'inverse', 'option'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair or contract name.",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin. Supports linear, inverse, option.",
      
    },
    'settle-coin': {
      type: 'string',
      description: "Settlement coin. For linear requires symbol or settleCoin; for option USDT/USDC.",
      
    },
    'order-id': {
      type: 'string',
      description: "System-generated order ID.",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID.",
      
    },
    'open-only': {
      type: 'integer',
      description: "- `0`: active orders only (default)\n- `1`: include terminal state orders (max 500 per category)\n",
      enum: ['0', '1'],
    },
    'order-filter': {
      type: 'string',
      description: "Filter by order type. Returns all types if omitted.",
      enum: ['Order', 'StopOrder', 'tpslOrder', 'OcoOrder', 'BidirectionalTpslOrder'],
    },
    'limit': {
      type: 'integer',
      description: "Number of results per page (1-50, default 20).",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response.",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', describe: "Trading pair or contract name." })
  .option('base-coin', { type: 'string', describe: "Base coin. Supports linear, inverse, option." })
  .option('settle-coin', { type: 'string', describe: "Settlement coin. For linear requires symbol or settleCoin; for option USDT/USDC." })
  .option('order-id', { type: 'string', describe: "System-generated order ID." })
  .option('order-link-id', { type: 'string', describe: "User-defined order ID." })
  .option('open-only', { type: 'number', choices: ['0', '1'], describe: "- `0`: active orders only (default)\n- `1`: include terminal state orders (max 500 per category)\n" })
  .option('order-filter', { type: 'string', choices: ['Order', 'StopOrder', 'tpslOrder', 'OcoOrder', 'BidirectionalTpslOrder'], describe: "Filter by order type. Returns all types if omitted." })
  .option('limit', { type: 'number', describe: "Number of results per page (1-50, default 20)." })
  .option('cursor', { type: 'string', describe: "Pagination cursor from previous response." })
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
  path: '/v5/order/realtime',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/order/realtime',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], baseCoin: argv['base-coin'], settleCoin: argv['settle-coin'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], openOnly: argv['open-only'], orderFilter: argv['order-filter'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
