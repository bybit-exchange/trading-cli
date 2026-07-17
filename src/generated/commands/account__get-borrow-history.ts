// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-borrow-history'
export const describe = "Get Borrow History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'currency': {
      type: 'string',
      description: "Currency filter (e.g., USDC, USDT, BTC, ETH).",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Max 30-day range.",
      
    },
    'limit': {
      type: 'integer',
      description: "Records per page. Max 50, default 20.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('currency', { type: 'string', describe: "Currency filter (e.g., USDC, USDT, BTC, ETH)." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Max 30-day range." })
  .option('limit', { type: 'number', describe: "Records per page. Max 50, default 20." })
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
  path: '/v5/account/borrow-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/account/borrow-history',
    query: filterDefined({ currency: argv['currency'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
