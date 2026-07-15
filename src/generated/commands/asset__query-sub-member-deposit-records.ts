// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-sub-member-deposit-records'
export const describe = "Get Sub Deposit Records (on-chain)"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'id': {
      type: 'string',
      description: "Internal ID. Takes highest priority when combined with other params.",
      
    },
    'tx-id': {
      type: 'string',
      description: "Transaction ID (data before Jan 1, 2024 not queryable via txID).",
      
    },
    'sub-member-id': {
      type: 'string',
      description: "Sub-account UID.",
      
    },
    'coin': {
      type: 'string',
      description: "Coin symbol (uppercase only). Empty means query all.",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. Defaults to 30 days ago.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Defaults to current time.",
      
    },
    'limit': {
      type: 'integer',
      description: "Records per page. Range `[1, 50]`, default `50`.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from `nextPageCursor`.",
      
    }
  },
  required: ['sub-member-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('id', { type: 'string', describe: "Internal ID. Takes highest priority when combined with other params." })
  .option('tx-id', { type: 'string', describe: "Transaction ID (data before Jan 1, 2024 not queryable via txID)." })
  .option('sub-member-id', { type: 'string', demandOption: true, describe: "Sub-account UID." })
  .option('coin', { type: 'string', describe: "Coin symbol (uppercase only). Empty means query all." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. Defaults to 30 days ago." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Defaults to current time." })
  .option('limit', { type: 'number', describe: "Records per page. Range `[1, 50]`, default `50`." })
  .option('cursor', { type: 'string', describe: "Pagination cursor from `nextPageCursor`." })
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
  path: '/v5/asset/deposit/query-sub-member-record',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/deposit/query-sub-member-record',
    query: filterDefined({ id: argv['id'], txID: argv['tx-id'], subMemberId: argv['sub-member-id'], coin: argv['coin'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
