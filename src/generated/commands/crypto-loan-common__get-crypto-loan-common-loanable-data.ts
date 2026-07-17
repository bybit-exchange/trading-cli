// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-common-loanable-data'
export const describe = "Get Loanable Currency Data"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'currency': {
      type: 'string',
      description: "Currency code to query (e.g., BTC, USDT, ETH).\nIf not provided, returns all available loanable currencies.\n",
      
    },
    'vip-level': {
      type: 'string',
      description: "VIP level to filter interest rates and borrowing limits.\nDifferent VIP levels have different borrowing rates and maximum quotas.\n\nValid values: VIP0, VIP1, VIP2, VIP3, VIP4, VIP5, VIP99 (supreme VIP), PRO1, PRO2, PRO3, PRO4, PRO5, PRO6\n\nDefault: VIP0 if not specified\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('currency', { type: 'string', describe: "Currency code to query (e.g., BTC, USDT, ETH).\nIf not provided, returns all available loanable currencies.\n" })
  .option('vip-level', { type: 'string', describe: "VIP level to filter interest rates and borrowing limits.\nDifferent VIP levels have different borrowing rates and maximum quotas.\n\nValid values: VIP0, VIP1, VIP2, VIP3, VIP4, VIP5, VIP99 (supreme VIP), PRO1, PRO2, PRO3, PRO4, PRO5, PRO6\n\nDefault: VIP0 if not specified\n" })
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
  path: '/v5/crypto-loan-common/loanable-data',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-common/loanable-data',
    
    body: { currency: argv['currency'], vipLevel: argv['vip-level'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
