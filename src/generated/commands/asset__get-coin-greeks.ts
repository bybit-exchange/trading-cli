// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-coin-greeks'
export const describe = "Get Coin Greeks"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'base-coin': {
      type: 'string',
      description: "Base coin filter (e.g., BTC, ETH, SOL). If omitted, returns all base coins.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('base-coin', { type: 'string', describe: "Base coin filter (e.g., BTC, ETH, SOL). If omitted, returns all base coins." })
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
  path: '/v5/asset/coin-greeks',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/coin-greeks',
    query: filterDefined({ baseCoin: argv['base-coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
