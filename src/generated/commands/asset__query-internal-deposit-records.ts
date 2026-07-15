// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-internal-deposit-records'
export const describe = "Get Internal Deposit Records (off-chain)"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'tx-id': {
      type: 'string',
      description: "Internal transfer transaction ID.",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. Defaults to 30 days ago.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Defaults to current time.",
      
    },
    'coin': {
      type: 'string',
      description: "Coin symbol (uppercase only). Empty means query all.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor.",
      
    },
    'limit': {
      type: 'integer',
      description: "Records per page. Range `[1, 50]`, default `50`.",
      
    },
    'status': {
      type: 'integer',
      description: "Filter by status. `0` = all (default).",
      enum: ['0', '1', '2', '3'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('tx-id', { type: 'string', describe: "Internal transfer transaction ID." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. Defaults to 30 days ago." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Defaults to current time." })
  .option('coin', { type: 'string', describe: "Coin symbol (uppercase only). Empty means query all." })
  .option('cursor', { type: 'string', describe: "Pagination cursor." })
  .option('limit', { type: 'number', describe: "Records per page. Range `[1, 50]`, default `50`." })
  .option('status', { type: 'number', choices: ['0', '1', '2', '3'], describe: "Filter by status. `0` = all (default)." })
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
  path: '/v5/asset/deposit/query-internal-record',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/deposit/query-internal-record',
    query: filterDefined({ txID: argv['tx-id'], startTime: argv['start-time'], endTime: argv['end-time'], coin: argv['coin'], cursor: argv['cursor'], limit: argv['limit'], status: argv['status'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
