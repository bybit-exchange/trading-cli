// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-fixed-borrow-contracts'
export const describe = "Query Fixed-Rate Borrow Contracts"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "Filter by borrow order ID.",
      
    },
    'order-currency': {
      type: 'string',
      description: "Filter by borrow coin name, uppercase only. e.g. `USDT`.",
      
    },
    'term': {
      type: 'string',
      description: "Filter by loan term in days. e.g. `7`, `14`, `30`, `90`, `180`.",
      
    },
    'limit': {
      type: 'string',
      description: "Page size. Range: [1, 100]. Default: `10`.",
      
    },
    'cursor': {
      type: 'string',
      description: "Cursor for pagination. Use `nextPageCursor` from previous response.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', describe: "Filter by borrow order ID." })
  .option('order-currency', { type: 'string', describe: "Filter by borrow coin name, uppercase only. e.g. `USDT`." })
  .option('term', { type: 'string', describe: "Filter by loan term in days. e.g. `7`, `14`, `30`, `90`, `180`." })
  .option('limit', { type: 'string', describe: "Page size. Range: [1, 100]. Default: `10`." })
  .option('cursor', { type: 'string', describe: "Cursor for pagination. Use `nextPageCursor` from previous response." })
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
  path: '/v5/spot-margin-trade/fixedborrow-contract-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spot-margin-trade/fixedborrow-contract-info',
    query: filterDefined({ orderId: argv['order-id'], orderCurrency: argv['order-currency'], term: argv['term'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
