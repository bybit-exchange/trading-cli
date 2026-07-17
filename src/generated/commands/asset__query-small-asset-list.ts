// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-small-asset-list'
export const describe = "Small asset conversion list query"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Wallet type. Only supports eb_convert_uta (Unified wallet)",
      
    },
    'from-coin': {
      type: 'string',
      description: "Source currency filter (optional). Multiple coins separated by comma, e.g. \"BTC,ETH\"",
      
    }
  },
  required: ['account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', demandOption: true, describe: "Wallet type. Only supports eb_convert_uta (Unified wallet)" })
  .option('from-coin', { type: 'string', describe: "Source currency filter (optional). Multiple coins separated by comma, e.g. \"BTC,ETH\"" })
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
  path: '/v5/asset/covert/small-balance-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/covert/small-balance-list',
    query: filterDefined({ accountType: argv['account-type'], fromCoin: argv['from-coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
