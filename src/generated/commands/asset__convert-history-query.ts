// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'convert-history-query'
export const describe = "Conversion history query"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Wallet type filter. Supported: eb_convert_funding, eb_convert_uta, funding, funding_fiat, funding_fbtc_convert, funding_block_trade. Accepts multiple values comma-separated",
      
    },
    'index': {
      type: 'integer',
      description: "Page number, starts at 1, defaults to 1",
      
    },
    'limit': {
      type: 'integer',
      description: "Page size, default 20, max 100",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', describe: "Wallet type filter. Supported: eb_convert_funding, eb_convert_uta, funding, funding_fiat, funding_fbtc_convert, funding_block_trade. Accepts multiple values comma-separated" })
  .option('index', { type: 'number', describe: "Page number, starts at 1, defaults to 1" })
  .option('limit', { type: 'number', describe: "Page size, default 20, max 100" })
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
  path: '/v5/asset/exchange/query-convert-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/exchange/query-convert-history',
    query: filterDefined({ accountType: argv['account-type'], index: argv['index'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
