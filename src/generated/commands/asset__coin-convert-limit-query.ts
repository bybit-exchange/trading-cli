// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'coin-convert-limit-query'
export const describe = "Query coin conversion limit"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'from-coin': {
      type: 'string',
      description: "From coin",
      
    },
    'from-coin-type': {
      type: 'integer',
      description: "From coin type: 0=crypto, 1=fiat",
      enum: ['0', '1'],
    },
    'to-coin': {
      type: 'string',
      description: "To coin",
      
    },
    'to-coin-type': {
      type: 'integer',
      description: "To coin type: 0=crypto, 1=fiat",
      enum: ['0', '1'],
    },
    'account-type': {
      type: 'string',
      description: "Account type (scene code), pass \"funding\" for funding account flash conversion",
      
    }
  },
  required: ['from-coin', 'to-coin', 'account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('from-coin', { type: 'string', demandOption: true, describe: "From coin" })
  .option('from-coin-type', { type: 'number', choices: ['0', '1'], describe: "From coin type: 0=crypto, 1=fiat" })
  .option('to-coin', { type: 'string', demandOption: true, describe: "To coin" })
  .option('to-coin-type', { type: 'number', choices: ['0', '1'], describe: "To coin type: 0=crypto, 1=fiat" })
  .option('account-type', { type: 'string', demandOption: true, describe: "Account type (scene code), pass \"funding\" for funding account flash conversion" })
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
  path: '/v5/asset/exchange/query-convert-limit',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/exchange/query-convert-limit',
    query: filterDefined({ fromCoin: argv['from-coin'], fromCoinType: argv['from-coin-type'], toCoin: argv['to-coin'], toCoinType: argv['to-coin-type'], accountType: argv['account-type'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
