// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-wallet-balance'
export const describe = "Get Wallet Balance"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Account type:\n- `UNIFIED`: Unified trading account\n",
      enum: ['UNIFIED'],
    },
    'coin': {
      type: 'string',
      description: "Coin name, uppercase only. If not passed, returns non-zero asset and liability coins. Multiple coins separated by commas, e.g. `USDT,USDC`.",
      
    }
  },
  required: ['account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', choices: ['UNIFIED'], demandOption: true, describe: "Account type:\n- `UNIFIED`: Unified trading account\n" })
  .option('coin', { type: 'string', describe: "Coin name, uppercase only. If not passed, returns non-zero asset and liability coins. Multiple coins separated by commas, e.g. `USDT,USDC`." })
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
  path: '/v5/account/wallet-balance',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/account/wallet-balance',
    query: filterDefined({ accountType: argv['account-type'], coin: argv['coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
