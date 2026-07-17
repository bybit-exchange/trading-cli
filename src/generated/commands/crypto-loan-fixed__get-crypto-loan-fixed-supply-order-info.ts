// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-fixed-supply-order-info'
export const describe = "Get Supply Order Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      
      
    },
    'order-currency': {
      type: 'string',
      
      
    },
    'state': {
      type: 'string',
      
      
    },
    'term': {
      type: 'string',
      
      
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
  .option('order-id', { type: 'string' })
  .option('order-currency', { type: 'string' })
  .option('state', { type: 'string' })
  .option('term', { type: 'string' })
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
  path: '/v5/crypto-loan-fixed/supply-order-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-fixed/supply-order-info',
    
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
