// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-sub-member-deposit-address'
export const describe = "Get Sub Deposit Address"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin': {
      type: 'string',
      description: "Coin symbol (uppercase only).",
      
    },
    'chain-type': {
      type: 'string',
      description: "Chain type. Use `chain` value from the coin-info endpoint.",
      
    },
    'sub-member-id': {
      type: 'string',
      description: "Sub-account user ID.",
      
    }
  },
  required: ['coin', 'chain-type', 'sub-member-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('coin', { type: 'string', demandOption: true, describe: "Coin symbol (uppercase only)." })
  .option('chain-type', { type: 'string', demandOption: true, describe: "Chain type. Use `chain` value from the coin-info endpoint." })
  .option('sub-member-id', { type: 'string', demandOption: true, describe: "Sub-account user ID." })
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
  path: '/v5/asset/deposit/query-sub-member-address',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/deposit/query-sub-member-address',
    query: filterDefined({ coin: argv['coin'], chainType: argv['chain-type'], subMemberId: argv['sub-member-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
