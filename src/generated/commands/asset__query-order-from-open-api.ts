// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-order-from-open-api'
export const describe = "Query conversion order list"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'integer',
      description: "Account type: 0=ASSET, 1=OBU",
      enum: ['0', '1'],
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor",
      
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
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (seconds)",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (seconds)",
      
    },
    'type': {
      type: 'integer',
      description: "Conversion type: 0=all, 1=auto conversion, 2=active conversion",
      enum: ['0', '1', '2'],
    },
    'exchange-status': {
      type: 'integer',
      description: "Order status: 0=all, 1=init, 2=pending, 3=success, 4=failure",
      enum: ['0', '1', '2', '3', '4'],
    },
    'direction': {
      type: 'string',
      description: "Pagination direction",
      enum: ['next', 'prev'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'number', choices: ['0', '1'], describe: "Account type: 0=ASSET, 1=OBU" })
  .option('cursor', { type: 'string', describe: "Pagination cursor" })
  .option('limit', { type: 'number', describe: "Items per page" })
  .option('to-coin', { type: 'string', describe: "To coin filter" })
  .option('from-coin', { type: 'string', describe: "From coin filter" })
  .option('start-time', { type: 'number', describe: "Start timestamp (seconds)" })
  .option('end-time', { type: 'number', describe: "End timestamp (seconds)" })
  .option('type', { type: 'number', choices: ['0', '1', '2'], describe: "Conversion type: 0=all, 1=auto conversion, 2=active conversion" })
  .option('exchange-status', { type: 'number', choices: ['0', '1', '2', '3', '4'], describe: "Order status: 0=all, 1=init, 2=pending, 3=success, 4=failure" })
  .option('direction', { type: 'string', choices: ['next', 'prev'], describe: "Pagination direction" })
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
  path: '/v5/asset/exchange/query-order-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/exchange/query-order-list',
    query: filterDefined({ accountType: argv['account-type'], cursor: argv['cursor'], limit: argv['limit'], toCoin: argv['to-coin'], fromCoin: argv['from-coin'], startTime: argv['start-time'], endTime: argv['end-time'], type: argv['type'], exchangeStatus: argv['exchange-status'], direction: argv['direction'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
