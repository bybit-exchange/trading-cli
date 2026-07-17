// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-order-by-page'
export const describe = "Paginated conversion order query"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'cursor': {
      type: 'string',
      description: "Pagination cursor (omit on first request)",
      
    },
    'limit': {
      type: 'integer',
      description: "Items per page",
      
    },
    'to-coin': {
      type: 'string',
      description: "To coin filter",
      
    },
    'from-coin': {
      type: 'string',
      description: "From coin filter",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('cursor', { type: 'string', describe: "Pagination cursor (omit on first request)" })
  .option('limit', { type: 'number', describe: "Items per page" })
  .option('to-coin', { type: 'string', describe: "To coin filter" })
  .option('from-coin', { type: 'string', describe: "From coin filter" })
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
  path: '/v5/asset/exchange/order-record',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/exchange/order-record',
    query: filterDefined({ cursor: argv['cursor'], limit: argv['limit'], toCoin: argv['to-coin'], fromCoin: argv['from-coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
