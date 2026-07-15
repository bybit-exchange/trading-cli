// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-long-short-ratio'
export const describe = "Get Long Short Ratio"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.\n- `linear`: USDT contract\n- `inverse`: Inverse contract\n",
      enum: ['linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`",
      
    },
    'period': {
      type: 'string',
      description: "Data recording period",
      enum: ['5min', '15min', '30min', '1h', '4h', '1d'],
    },
    'start-time': {
      type: 'string',
      description: "Start timestamp in milliseconds",
      
    },
    'end-time': {
      type: 'string',
      description: "End timestamp in milliseconds",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page, range 1–500. Default is `50`",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor, use `nextPageCursor` from previous response",
      
    }
  },
  required: ['category', 'symbol', 'period'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse'], demandOption: true, describe: "Product type.\n- `linear`: USDT contract\n- `inverse`: Inverse contract\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
  .option('period', { type: 'string', choices: ['5min', '15min', '30min', '1h', '4h', '1d'], demandOption: true, describe: "Data recording period" })
  .option('start-time', { type: 'string', describe: "Start timestamp in milliseconds" })
  .option('end-time', { type: 'string', describe: "End timestamp in milliseconds" })
  .option('limit', { type: 'number', describe: "Number of records per page, range 1–500. Default is `50`" })
  .option('cursor', { type: 'string', describe: "Pagination cursor, use `nextPageCursor` from previous response" })
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
  path: '/v5/market/account-ratio',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/account-ratio',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], period: argv['period'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
