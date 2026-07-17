// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-deposit-address'
export const describe = "Get Master Deposit Address"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin': {
      type: 'string',
      description: "Coin symbol (uppercase only), e.g. `USDT`.",
      
    },
    'chain-type': {
      type: 'string',
      description: "Chain type. Use `chain` value from the coin-info endpoint. If not provided, returns all chains.",
      
    }
  },
  required: ['coin'],
} as const

export const builder = (yargs: any) => yargs
  .option('coin', { type: 'string', demandOption: true, describe: "Coin symbol (uppercase only), e.g. `USDT`." })
  .option('chain-type', { type: 'string', describe: "Chain type. Use `chain` value from the coin-info endpoint. If not provided, returns all chains." })
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
  path: '/v5/asset/deposit/query-address',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/deposit/query-address',
    query: filterDefined({ coin: argv['coin'], chainType: argv['chain-type'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
