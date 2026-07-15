// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'user-asset-info-query'
export const describe = "Get All Coins Balance"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Account type",
      enum: ['UNIFIED', 'FUND'],
    },
    'coin': {
      type: 'string',
      description: "Coin name(s), uppercase, comma-separated (e.g. `USDT,USDC,ETH`). Required for UNIFIED account.",
      
    },
    'member-id': {
      type: 'integer',
      description: "UID. Required when querying sub UID balance with master API key",
      
    },
    'with-bonus': {
      type: 'integer',
      description: "`0` (default): exclude bonus; `1`: include bonus",
      enum: ['0', '1'],
    }
  },
  required: ['account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', choices: ['UNIFIED', 'FUND'], demandOption: true, describe: "Account type" })
  .option('coin', { type: 'string', describe: "Coin name(s), uppercase, comma-separated (e.g. `USDT,USDC,ETH`). Required for UNIFIED account." })
  .option('member-id', { type: 'number', describe: "UID. Required when querying sub UID balance with master API key" })
  .option('with-bonus', { type: 'number', choices: ['0', '1'], describe: "`0` (default): exclude bonus; `1`: include bonus" })
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
    query: filterDefined({ accountType: argv['account-type'], coin: argv['coin'], memberId: argv['member-id'], withBonus: argv['with-bonus'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
