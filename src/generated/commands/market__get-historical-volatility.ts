// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-historical-volatility'
export const describe = "Get Historical Volatility"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type. Must be `option`",
      enum: ['option'],
    },
    'base-coin': {
      type: 'string',
      description: "Base coin in uppercase; defaults to `BTC`",
      
    },
    'quote-coin': {
      type: 'string',
      description: "Quote coin; defaults to `USD`",
      enum: ['USD', 'USDT'],
    },
    'period': {
      type: 'integer',
      description: "Averaging period (days); defaults to 7-day average if unspecified",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. Must be provided together with `endTime`",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Must be provided together with `startTime`",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['option'], demandOption: true, describe: "Product type. Must be `option`" })
  .option('base-coin', { type: 'string', describe: "Base coin in uppercase; defaults to `BTC`" })
  .option('quote-coin', { type: 'string', choices: ['USD', 'USDT'], describe: "Quote coin; defaults to `USD`" })
  .option('period', { type: 'number', describe: "Averaging period (days); defaults to 7-day average if unspecified" })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. Must be provided together with `endTime`" })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Must be provided together with `startTime`" })
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
  path: '/v5/market/historical-volatility',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/historical-volatility',
    query: filterDefined({ category: argv['category'], baseCoin: argv['base-coin'], quoteCoin: argv['quote-coin'], period: argv['period'], startTime: argv['start-time'], endTime: argv['end-time'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
