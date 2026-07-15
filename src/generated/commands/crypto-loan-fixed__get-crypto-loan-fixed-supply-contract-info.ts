// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-fixed-supply-contract-info'
export const describe = "Get Supply Contract Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "Original order ID",
      
    },
    'supply-id': {
      type: 'string',
      description: "Supply contract ID",
      
    },
    'supply-currency': {
      type: 'string',
      description: "Supply currency",
      
    },
    'term': {
      type: 'string',
      description: "Supply term",
      
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
  .option('supply-id', { type: 'string', describe: "Supply contract ID" })
  .option('supply-currency', { type: 'string', describe: "Supply currency" })
  .option('term', { type: 'string', describe: "Supply term" })
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
  path: '/v5/crypto-loan-fixed/supply-contract-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-fixed/supply-contract-info',
    
    body: { orderId: argv['order-id'], supplyId: argv['supply-id'], supplyCurrency: argv['supply-currency'], term: argv['term'], limit: argv['limit'], cursor: argv['cursor'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
