// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-trade'
export const describe = "Query Trade Status"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'trade-no': {
      type: 'string',
      description: "Trade order number (either tradeNo or merchantRequestId must be provided)",
      
    },
    'merchant-request-id': {
      type: 'string',
      description: "Merchant request ID (either tradeNo or merchantRequestId must be provided)",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('trade-no', { type: 'string', describe: "Trade order number (either tradeNo or merchantRequestId must be provided)" })
  .option('merchant-request-id', { type: 'string', describe: "Merchant request ID (either tradeNo or merchantRequestId must be provided)" })
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
  path: '/v5/fiat/trade-query',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/fiat/trade-query',
    query: filterDefined({ tradeNo: argv['trade-no'], merchantRequestId: argv['merchant-request-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
