// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-common-collateral-data'
export const describe = "Get Collateral Currency Data"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'currency': {
      type: 'string',
      description: "Currency code to query (e.g., BTC, USDT, ETH).\nIf not provided, returns all available collateral currencies.\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('currency', { type: 'string', describe: "Currency code to query (e.g., BTC, USDT, ETH).\nIf not provided, returns all available collateral currencies.\n" })
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
  path: '/v5/crypto-loan-common/collateral-data',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-common/collateral-data',
    
    body: { currency: argv['currency'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
