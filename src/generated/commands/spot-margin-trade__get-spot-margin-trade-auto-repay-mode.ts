// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-spot-margin-trade-auto-repay-mode'
export const describe = "Get Auto Repay Mode"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'currency': {
      type: 'string',
      description: "Coin name, uppercase only. e.g. `ETH`. When omitted, returns settings for all currencies.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('currency', { type: 'string', describe: "Coin name, uppercase only. e.g. `ETH`. When omitted, returns settings for all currencies." })
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
  path: '/v5/spot-margin-trade/get-auto-repay-mode',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spot-margin-trade/get-auto-repay-mode',
    query: filterDefined({ currency: argv['currency'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
