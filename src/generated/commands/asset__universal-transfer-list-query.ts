// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'universal-transfer-list-query'
export const describe = "Get Universal Transfer Records"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'transfer-id': {
      type: 'string',
      description: "UUID of the transfer",
      
    },
    'coin': {
      type: 'string',
      description: "Coin name, uppercase",
      
    },
    'status': {
      type: 'string',
      description: "Filter by transfer status: SUCCESS, FAILED, PENDING",
      enum: ['SUCCESS', 'FAILED', 'PENDING'],
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds (effective at second level)",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds (effective at second level)",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page. Default: 20, Range: [1, 50]",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from `nextPageCursor`",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('transfer-id', { type: 'string', describe: "UUID of the transfer" })
  .option('coin', { type: 'string', describe: "Coin name, uppercase" })
  .option('status', { type: 'string', choices: ['SUCCESS', 'FAILED', 'PENDING'], describe: "Filter by transfer status: SUCCESS, FAILED, PENDING" })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds (effective at second level)" })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds (effective at second level)" })
  .option('limit', { type: 'number', describe: "Number of records per page. Default: 20, Range: [1, 50]" })
  .option('cursor', { type: 'string', describe: "Pagination cursor from `nextPageCursor`" })
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
  path: '/v5/asset/transfer/query-universal-transfer-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/transfer/query-universal-transfer-list',
    query: filterDefined({ transferId: argv['transfer-id'], coin: argv['coin'], status: argv['status'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
