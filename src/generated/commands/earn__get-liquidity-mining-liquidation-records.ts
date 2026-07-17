// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-liquidity-mining-liquidation-records'
export const describe = "Get Liquidation Records"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'base-coin': {
      type: 'string',
      description: "Base coin filter, e.g. `BTC`, `ETH`",
      
    },
    'quote-coin': {
      type: 'string',
      description: "Quote coin filter, e.g. `USDT`",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds)",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds)",
      
    },
    'limit': {
      type: 'integer',
      description: "Records per page, default 20, max 50",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response `nextPageCursor`",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('base-coin', { type: 'string', describe: "Base coin filter, e.g. `BTC`, `ETH`" })
  .option('quote-coin', { type: 'string', describe: "Quote coin filter, e.g. `USDT`" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds)" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds)" })
  .option('limit', { type: 'number', describe: "Records per page, default 20, max 50" })
  .option('cursor', { type: 'string', describe: "Pagination cursor from previous response `nextPageCursor`" })
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
  path: '/v5/earn/liquidity-mining/liquidation-records',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/liquidity-mining/liquidation-records',
    query: filterDefined({ baseCoin: argv['base-coin'], quoteCoin: argv['quote-coin'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
