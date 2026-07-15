// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-coin-balance'
export const describe = "Get Coin Balance"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'member-id': {
      type: 'string',
      description: "User Id. Required when using master api key to check sub account coin balance.",
      
    },
    'account-type': {
      type: 'string',
      description: "Account type",
      
    },
    'coin': {
      type: 'string',
      description: "Coin name, uppercase only. Query all coins if not passed. Can query multiple coins separated by comma (e.g. USDT,USDC,ETH). Mandatory for accountType=UNIFIED, supports up to 10 coins each request.",
      
    },
    'with-bonus': {
      type: 'integer',
      description: "0 (default): not query bonus. 1: query bonus",
      enum: ['0', '1'],
    }
  },
  required: ['account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('member-id', { type: 'string', describe: "User Id. Required when using master api key to check sub account coin balance." })
  .option('account-type', { type: 'string', demandOption: true, describe: "Account type" })
  .option('coin', { type: 'string', describe: "Coin name, uppercase only. Query all coins if not passed. Can query multiple coins separated by comma (e.g. USDT,USDC,ETH). Mandatory for accountType=UNIFIED, supports up to 10 coins each request." })
  .option('with-bonus', { type: 'number', choices: ['0', '1'], describe: "0 (default): not query bonus. 1: query bonus" })
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
  path: '/v5/asset/transfer/query-account-coins-balance',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/transfer/query-account-coins-balance',
    query: filterDefined({ memberId: argv['member-id'], accountType: argv['account-type'], coin: argv['coin'], withBonus: argv['with-bonus'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
