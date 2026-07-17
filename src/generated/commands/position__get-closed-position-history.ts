// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-closed-position-history'
export const describe = "Get Closed Position History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type:\n- `option`: Options\n",
      enum: ['option'],
    },
    'symbol': {
      type: 'string',
      description: "Symbol name, e.g. `BTC-29DEC23-30000-C`",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in **milliseconds**. See time range rules in description",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in **milliseconds**. See time range rules in description",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of items per page. Default: `50`, Range: [`1`, `100`]",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['option'], demandOption: true, describe: "Product type:\n- `option`: Options\n" })
  .option('symbol', { type: 'string', describe: "Symbol name, e.g. `BTC-29DEC23-30000-C`" })
  .option('start-time', { type: 'number', describe: "Start timestamp in **milliseconds**. See time range rules in description" })
  .option('end-time', { type: 'number', describe: "End timestamp in **milliseconds**. See time range rules in description" })
  .option('limit', { type: 'number', describe: "Number of items per page. Default: `50`, Range: [`1`, `100`]" })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page" })
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
  path: '/v5/position/get-closed-positions',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/position/get-closed-positions',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
