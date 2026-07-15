// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-withdraw-records'
export const describe = "Get Withdrawal Records"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'withdraw-id': {
      type: 'string',
      description: "Withdrawal ID",
      
    },
    'tx-id': {
      type: 'string',
      description: "Transaction hash ID",
      
    },
    'coin': {
      type: 'string',
      description: "Coin name, uppercase, e.g. USDT",
      
    },
    'withdraw-type': {
      type: 'integer',
      description: "Withdrawal type:\n- `0`: On-chain withdrawal (default)\n- `1`: Off-chain (internal transfer)\n- `2`: All\n",
      enum: ['0', '1', '2'],
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. Default: 30 days before current time",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Default: current time",
      
    },
    'limit': {
      type: 'integer',
      description: "Results per page, range [1, 50], default 50",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from `nextPageCursor` in prior response",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('withdraw-id', { type: 'string', describe: "Withdrawal ID" })
  .option('tx-id', { type: 'string', describe: "Transaction hash ID" })
  .option('coin', { type: 'string', describe: "Coin name, uppercase, e.g. USDT" })
  .option('withdraw-type', { type: 'number', choices: ['0', '1', '2'], describe: "Withdrawal type:\n- `0`: On-chain withdrawal (default)\n- `1`: Off-chain (internal transfer)\n- `2`: All\n" })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. Default: 30 days before current time" })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Default: current time" })
  .option('limit', { type: 'number', describe: "Results per page, range [1, 50], default 50" })
  .option('cursor', { type: 'string', describe: "Pagination cursor from `nextPageCursor` in prior response" })
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
  path: '/v5/asset/withdraw/query-record',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/withdraw/query-record',
    query: filterDefined({ withdrawID: argv['withdraw-id'], txID: argv['tx-id'], coin: argv['coin'], withdrawType: argv['withdraw-type'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
