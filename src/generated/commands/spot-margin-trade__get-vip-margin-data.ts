// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-vip-margin-data'
export const describe = "Get VIP Margin Data"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'vip-level': {
      type: 'string',
      description: "VIP tier classification. If omitted, returns data for all VIP levels.",
      
    },
    'currency': {
      type: 'string',
      description: "Coin name, uppercase only. If omitted, returns data for all coins.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('vip-level', { type: 'string', describe: "VIP tier classification. If omitted, returns data for all VIP levels." })
  .option('currency', { type: 'string', describe: "Coin name, uppercase only. If omitted, returns data for all coins." })
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
  path: '/v5/spot-margin-trade/data',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spot-margin-trade/data',
    query: filterDefined({ vipLevel: argv['vip-level'], currency: argv['currency'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
