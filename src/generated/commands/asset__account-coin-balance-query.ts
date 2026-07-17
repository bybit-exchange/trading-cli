// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'account-coin-balance-query'
export const describe = "Get Single Coin Balance"
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
      description: "Coin name, uppercase (e.g. USDT, BTC). Required.",
      
    },
    'member-id': {
      type: 'integer',
      description: "UID. Required when querying sub UID balance with master API key",
      
    },
    'to-member-id': {
      type: 'integer',
      description: "Target UID. Required for cross-UID transferable balance query",
      
    },
    'to-account-type': {
      type: 'string',
      description: "Destination account type. Required when `withLtvTransferSafeAmount=1`",
      enum: ['UNIFIED', 'FUND'],
    },
    'with-bonus': {
      type: 'integer',
      description: "`0` (default): exclude bonus; `1`: include bonus",
      enum: ['0', '1'],
    },
    'with-transfer-safe-amount': {
      type: 'integer',
      description: "`0` (default): not query; `1`: query delay-withdraw safe amount",
      enum: ['0', '1'],
    },
    'with-ltv-transfer-safe-amount': {
      type: 'integer',
      description: "`0` (default): not query; `1`: query OTC loan transferable amount. Requires `toAccountType`",
      enum: ['0', '1'],
    }
  },
  required: ['account-type', 'coin'],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', choices: ['UNIFIED', 'FUND'], demandOption: true, describe: "Account type" })
  .option('coin', { type: 'string', demandOption: true, describe: "Coin name, uppercase (e.g. USDT, BTC). Required." })
  .option('member-id', { type: 'number', describe: "UID. Required when querying sub UID balance with master API key" })
  .option('to-member-id', { type: 'number', describe: "Target UID. Required for cross-UID transferable balance query" })
  .option('to-account-type', { type: 'string', choices: ['UNIFIED', 'FUND'], describe: "Destination account type. Required when `withLtvTransferSafeAmount=1`" })
  .option('with-bonus', { type: 'number', choices: ['0', '1'], describe: "`0` (default): exclude bonus; `1`: include bonus" })
  .option('with-transfer-safe-amount', { type: 'number', choices: ['0', '1'], describe: "`0` (default): not query; `1`: query delay-withdraw safe amount" })
  .option('with-ltv-transfer-safe-amount', { type: 'number', choices: ['0', '1'], describe: "`0` (default): not query; `1`: query OTC loan transferable amount. Requires `toAccountType`" })
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
  path: '/v5/asset/transfer/query-account-coin-balance',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/transfer/query-account-coin-balance',
    query: filterDefined({ accountType: argv['account-type'], coin: argv['coin'], memberId: argv['member-id'], toMemberId: argv['to-member-id'], toAccountType: argv['to-account-type'], withBonus: argv['with-bonus'], withTransferSafeAmount: argv['with-transfer-safe-amount'], withLtvTransferSafeAmount: argv['with-ltv-transfer-safe-amount'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
