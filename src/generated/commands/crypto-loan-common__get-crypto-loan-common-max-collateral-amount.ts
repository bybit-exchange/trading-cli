// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-common-max-collateral-amount'
export const describe = "Get Max Collateral Redeem Amount"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'currency': {
      type: 'string',
      description: "Collateral currency code to query (e.g., BTC, USDT, ETH).\nMust be a currency that is already pledged as collateral.\n",
      
    }
  },
  required: ['currency'],
} as const

export const builder = (yargs: any) => yargs
  .option('currency', { type: 'string', demandOption: true, describe: "Collateral currency code to query (e.g., BTC, USDT, ETH).\nMust be a currency that is already pledged as collateral.\n" })
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
  path: '/v5/crypto-loan-common/max-collateral-amount',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-common/max-collateral-amount',
    
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
