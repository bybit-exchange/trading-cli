// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-fixed-borrow-contract-info'
export const describe = "Get Borrow Contract Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "Original order ID",
      
    },
    'loan-id': {
      type: 'string',
      description: "Loan contract ID",
      
    },
    'order-currency': {
      type: 'string',
      description: "Loan currency",
      
    },
    'term': {
      type: 'string',
      description: "Loan term",
      
    },
    'limit': {
      type: 'integer',
      
      
    },
    'cursor': {
      type: 'integer',
      
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', describe: "Original order ID" })
  .option('loan-id', { type: 'string', describe: "Loan contract ID" })
  .option('order-currency', { type: 'string', describe: "Loan currency" })
  .option('term', { type: 'string', describe: "Loan term" })
  .option('limit', { type: 'number' })
  .option('cursor', { type: 'number' })
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
  path: '/v5/crypto-loan-fixed/borrow-contract-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-fixed/borrow-contract-info',
    
    body: { orderId: argv['order-id'], loanId: argv['loan-id'], orderCurrency: argv['order-currency'], term: argv['term'], limit: argv['limit'], cursor: argv['cursor'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
