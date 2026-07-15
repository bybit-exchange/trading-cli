// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-fixed-borrow-order-info'
export const describe = "Get Borrow Order Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "Borrow order ID",
      
    },
    'order-currency': {
      type: 'string',
      description: "Loan currency",
      
    },
    'state': {
      type: 'string',
      description: "Order state filter",
      
    },
    'term': {
      type: 'string',
      description: "Loan term in days",
      
    },
    'limit': {
      type: 'integer',
      description: "Page size",
      
    },
    'cursor': {
      type: 'integer',
      description: "Page cursor",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', describe: "Borrow order ID" })
  .option('order-currency', { type: 'string', describe: "Loan currency" })
  .option('state', { type: 'string', describe: "Order state filter" })
  .option('term', { type: 'string', describe: "Loan term in days" })
  .option('limit', { type: 'number', describe: "Page size" })
  .option('cursor', { type: 'number', describe: "Page cursor" })
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
  path: '/v5/crypto-loan-fixed/borrow-order-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-fixed/borrow-order-info',
    
    body: { orderId: argv['order-id'], orderCurrency: argv['order-currency'], state: argv['state'], term: argv['term'], limit: argv['limit'], cursor: argv['cursor'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
