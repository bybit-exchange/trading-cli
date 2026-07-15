// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-token-order-list'
export const describe = "Get Order List"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin': {
      type: 'string',
      description: "Coin name",
      enum: ['BYUSDT'],
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID for exact query",
      
    },
    'order-id': {
      type: 'string',
      description: "System order ID for exact query",
      
    },
    'order-type': {
      type: 'string',
      description: "Order type filter",
      enum: ['Mint', 'Redeem'],
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds), default 1 year ago",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds), default current time",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page",
      
    }
  },
  required: ['coin'],
} as const

export const builder = (yargs: any) => yargs
  .option('coin', { type: 'string', choices: ['BYUSDT'], demandOption: true, describe: "Coin name" })
  .option('order-link-id', { type: 'string', describe: "User-defined order ID for exact query" })
  .option('order-id', { type: 'string', describe: "System order ID for exact query" })
  .option('order-type', { type: 'string', choices: ['Mint', 'Redeem'], describe: "Order type filter" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds), default 1 year ago" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds), default current time" })
  .option('cursor', { type: 'string', describe: "Pagination cursor" })
  .option('limit', { type: 'number', describe: "Number of records per page" })
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
  path: '/v5/earn/token/order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/token/order',
    query: filterDefined({ coin: argv['coin'], orderLinkId: argv['order-link-id'], orderId: argv['order-id'], orderType: argv['order-type'], startTime: argv['start-time'], endTime: argv['end-time'], cursor: argv['cursor'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
