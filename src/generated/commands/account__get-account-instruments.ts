// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-account-instruments'
export const describe = "Get Account Instruments"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['spot', 'linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Contract or trading pair name.",
      
    },
    'limit': {
      type: 'integer',
      description: "Items per page. Max 200, default 200. Not applicable for spot.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Not applicable for spot.",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', describe: "Contract or trading pair name." })
  .option('limit', { type: 'number', describe: "Items per page. Max 200, default 200. Not applicable for spot." })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Not applicable for spot." })
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
  path: '/v5/account/instruments-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/account/instruments-info',
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
