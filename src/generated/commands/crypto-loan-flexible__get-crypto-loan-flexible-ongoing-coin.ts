// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-flexible-ongoing-coin'
export const describe = "Get Ongoing Flexible Borrow Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'loan-currency': {
      type: 'string',
      description: "Loan currency to query (e.g., USDT, BTC).\nIf not provided, returns all ongoing loans.\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('loan-currency', { type: 'string', describe: "Loan currency to query (e.g., USDT, BTC).\nIf not provided, returns all ongoing loans.\n" })
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
  path: '/v5/crypto-loan-flexible/ongoing-coin',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-flexible/ongoing-coin',
    
    body: { loanCurrency: argv['loan-currency'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
