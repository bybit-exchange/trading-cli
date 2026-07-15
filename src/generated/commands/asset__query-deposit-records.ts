// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-deposit-records'
export const describe = "Get Deposit Records (on-chain)"
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
      description: "Transaction ID. Only works for data from Jan 1, 2024 onward.",
      
    },
    'coin': {
      type: 'string',
      description: "Coin symbol (uppercase only), e.g. `BTC`, `USDT`. Empty means query all coins.",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. Defaults to 30 days ago if not provided.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Defaults to current time if not provided.",
      
    },
    'limit': {
      type: 'integer',
      description: "Records per page. Range `[1, 50]`, default `50`.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from `nextPageCursor` in prior response.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('id', { type: 'string', describe: "Internal ID. Takes highest priority when combined with other params." })
  .option('tx-id', { type: 'string', describe: "Transaction ID. Only works for data from Jan 1, 2024 onward." })
  .option('coin', { type: 'string', describe: "Coin symbol (uppercase only), e.g. `BTC`, `USDT`. Empty means query all coins." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. Defaults to 30 days ago if not provided." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Defaults to current time if not provided." })
  .option('limit', { type: 'number', describe: "Records per page. Range `[1, 50]`, default `50`." })
  .option('cursor', { type: 'string', describe: "Pagination cursor from `nextPageCursor` in prior response." })
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
  path: '/v5/asset/deposit/query-record',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/deposit/query-record',
    query: filterDefined({ id: argv['id'], txID: argv['tx-id'], coin: argv['coin'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
