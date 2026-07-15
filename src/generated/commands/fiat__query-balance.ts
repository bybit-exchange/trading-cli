// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-balance'
export const describe = "Query Account Balance"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-category': {
      type: 'string',
      description: "Account type (reserved field)",
      enum: ['fiat', 'crypto'],
    },
    'currency': {
      type: 'string',
      description: "Currency code:\n- Fiat: ISO 4217 standard code, e.g., EUR, GEL, KZT\n- Crypto: e.g., USDT, BTC, ETH\n- Omit to query all balances\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('account-category', { type: 'string', choices: ['fiat', 'crypto'], describe: "Account type (reserved field)" })
  .option('currency', { type: 'string', describe: "Currency code:\n- Fiat: ISO 4217 standard code, e.g., EUR, GEL, KZT\n- Crypto: e.g., USDT, BTC, ETH\n- Omit to query all balances\n" })
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
  path: '/v5/fiat/balance-query',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/fiat/balance-query',
    query: filterDefined({ accountCategory: argv['account-category'], currency: argv['currency'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
