// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-withdraw-addresses'
export const describe = "Get Withdrawal Address List"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin': {
      type: 'string',
      description: "Coin name; use `baseCoin` for universal addresses",
      
    },
    'chain': {
      type: 'string',
      description: "Chain name",
      
    },
    'address-type': {
      type: 'integer',
      description: "Address type:\n- `0`: On-chain address (default)\n- `1`: Internal transfer address (coin/chain ignored)\n- `2`: Both types (coin/chain ignored)\n",
      enum: ['0', '1', '2'],
    },
    'limit': {
      type: 'integer',
      description: "Records per page, range [1, 50], default 50",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from `nextPageCursor` in prior response",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('coin', { type: 'string', describe: "Coin name; use `baseCoin` for universal addresses" })
  .option('chain', { type: 'string', describe: "Chain name" })
  .option('address-type', { type: 'number', choices: ['0', '1', '2'], describe: "Address type:\n- `0`: On-chain address (default)\n- `1`: Internal transfer address (coin/chain ignored)\n- `2`: Both types (coin/chain ignored)\n" })
  .option('limit', { type: 'number', describe: "Records per page, range [1, 50], default 50" })
  .option('cursor', { type: 'string', describe: "Pagination cursor from `nextPageCursor` in prior response" })
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
  path: '/v5/asset/withdraw/query-address',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/withdraw/query-address',
    query: filterDefined({ coin: argv['coin'], chain: argv['chain'], addressType: argv['address-type'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
