// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'coin-list-query'
export const describe = "Coin list query"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Wallet type. Supported values: eb_convert_funding, eb_convert_uta, eb_convert_spot, eb_convert_contract, eb_convert_inverse",
      enum: ['eb_convert_funding', 'eb_convert_uta', 'eb_convert_spot', 'eb_convert_contract', 'eb_convert_inverse'],
    },
    'side': {
      type: 'integer',
      description: "0: fromCoin list (coins to sell); 1: toCoin list (coins to buy)",
      enum: ['0', '1'],
    },
    'coin': {
      type: 'string',
      description: "Coin name, uppercase only. Used as fromCoin filter when side=0",
      
    }
  },
  required: ['account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', choices: ['eb_convert_funding', 'eb_convert_uta', 'eb_convert_spot', 'eb_convert_contract', 'eb_convert_inverse'], demandOption: true, describe: "Wallet type. Supported values: eb_convert_funding, eb_convert_uta, eb_convert_spot, eb_convert_contract, eb_convert_inverse" })
  .option('side', { type: 'number', choices: ['0', '1'], describe: "0: fromCoin list (coins to sell); 1: toCoin list (coins to buy)" })
  .option('coin', { type: 'string', describe: "Coin name, uppercase only. Used as fromCoin filter when side=0" })
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
  path: '/v5/asset/exchange/query-coin-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/exchange/query-coin-list',
    query: filterDefined({ accountType: argv['account-type'], side: argv['side'], coin: argv['coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
