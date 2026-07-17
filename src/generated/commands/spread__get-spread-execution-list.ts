// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-spread-execution-list'
export const describe = "Get Spread Execution List"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Spread combination symbol name, e.g. `SOLUSDT_SOL/USDT`",
      
    },
    'order-id': {
      type: 'string',
      description: "Spread combination order ID",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User customised order ID",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in **milliseconds**. See time range rules in description",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in **milliseconds**. See time range rules in description",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of items per page. Default: `20`, Range: [`1`, `50`]",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', describe: "Spread combination symbol name, e.g. `SOLUSDT_SOL/USDT`" })
  .option('order-id', { type: 'string', describe: "Spread combination order ID" })
  .option('order-link-id', { type: 'string', describe: "User customised order ID" })
  .option('start-time', { type: 'number', describe: "Start timestamp in **milliseconds**. See time range rules in description" })
  .option('end-time', { type: 'number', describe: "End timestamp in **milliseconds**. See time range rules in description" })
  .option('limit', { type: 'number', describe: "Number of items per page. Default: `20`, Range: [`1`, `50`]" })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page" })
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
  path: '/v5/spread/execution/list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spread/execution/list',
    query: filterDefined({ symbol: argv['symbol'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
