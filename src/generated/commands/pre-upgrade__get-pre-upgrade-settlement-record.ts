// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-pre-upgrade-settlement-record'
export const describe = "Get Pre-upgrade Settlement Record"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type:\n- `linear`: USDC perpetual\n",
      enum: ['linear'],
    },
    'symbol': {
      type: 'string',
      description: "Symbol name, e.g. `BTCUSDT`, uppercase only",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of items per page. Default: `20`, Range: [`1`, `50`]",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear'], demandOption: true, describe: "Product type:\n- `linear`: USDC perpetual\n" })
  .option('symbol', { type: 'string', describe: "Symbol name, e.g. `BTCUSDT`, uppercase only" })
  .option('limit', { type: 'number', describe: "Number of items per page. Default: `20`, Range: [`1`, `50`]" })
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
  path: '/v5/pre-upgrade/asset/settlement-record',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/pre-upgrade/asset/settlement-record',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
