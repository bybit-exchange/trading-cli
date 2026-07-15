// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-position-info'
export const describe = "Get position info (real-time)"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['linear', 'inverse', 'option'],
    },
    'symbol': {
      type: 'string',
      description: "Contract name. If specified, returns data regardless of whether a position exists.\nFor USDT/USDC futures, either symbol or settleCoin is required.\n",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin (option only). If omitted, returns all option positions.",
      
    },
    'settle-coin': {
      type: 'string',
      description: "Settlement coin. For USDT/USDC futures, either symbol or settleCoin is required.",
      
    },
    'limit': {
      type: 'integer',
      description: "Page size limit. Range [1, 200].",
      
    },
    'cursor': {
      type: 'string',
      description: "Cursor for pagination. Use nextPageCursor from the previous response.",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse', 'option'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', describe: "Contract name. If specified, returns data regardless of whether a position exists.\nFor USDT/USDC futures, either symbol or settleCoin is required.\n" })
  .option('base-coin', { type: 'string', describe: "Base coin (option only). If omitted, returns all option positions." })
  .option('settle-coin', { type: 'string', describe: "Settlement coin. For USDT/USDC futures, either symbol or settleCoin is required." })
  .option('limit', { type: 'number', describe: "Page size limit. Range [1, 200]." })
  .option('cursor', { type: 'string', describe: "Cursor for pagination. Use nextPageCursor from the previous response." })
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
  path: '/v5/position/list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/position/list',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], baseCoin: argv['base-coin'], settleCoin: argv['settle-coin'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
