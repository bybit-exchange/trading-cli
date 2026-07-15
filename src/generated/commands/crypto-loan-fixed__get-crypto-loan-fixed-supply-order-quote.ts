// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-fixed-supply-order-quote'
export const describe = "Get Supply Market Quotes"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-currency': {
      type: 'string',
      
      
    },
    'term': {
      type: 'string',
      
      
    },
    'order-by': {
      type: 'string',
      
      
    },
    'sort': {
      type: 'integer',
      
      
    },
    'limit': {
      type: 'integer',
      
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-currency', { type: 'string' })
  .option('term', { type: 'string' })
  .option('order-by', { type: 'string' })
  .option('sort', { type: 'number' })
  .option('limit', { type: 'number' })
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
  path: '/v5/crypto-loan-fixed/supply-order-quote',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-fixed/supply-order-quote',
    
    body: { orderCurrency: argv['order-currency'], term: argv['term'], orderBy: argv['order-by'], sort: argv['sort'], limit: argv['limit'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
