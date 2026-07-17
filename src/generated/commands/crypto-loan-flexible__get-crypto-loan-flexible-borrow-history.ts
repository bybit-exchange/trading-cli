// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-flexible-borrow-history'
export const describe = "Get Flexible Borrow History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "Specific order ID to query",
      
    },
    'loan-currency': {
      type: 'string',
      description: "Filter by loan currency",
      
    },
    'limit': {
      type: 'integer',
      description: "Page size (default 20)",
      
    },
    'cursor': {
      type: 'integer',
      description: "Page cursor for pagination",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', describe: "Specific order ID to query" })
  .option('loan-currency', { type: 'string', describe: "Filter by loan currency" })
  .option('limit', { type: 'number', describe: "Page size (default 20)" })
  .option('cursor', { type: 'number', describe: "Page cursor for pagination" })
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
  path: '/v5/crypto-loan-flexible/borrow-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-flexible/borrow-history',
    
    body: { orderId: argv['order-id'], loanCurrency: argv['loan-currency'], limit: argv['limit'], cursor: argv['cursor'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
