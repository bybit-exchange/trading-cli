// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-result'
export const describe = "Query conversion result"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'quote-tx-id': {
      type: 'string',
      description: "Quote transaction ID",
      
    },
    'account-type': {
      type: 'string',
      description: "Wallet type (scene code)",
      
    }
  },
  required: ['quote-tx-id', 'account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('quote-tx-id', { type: 'string', demandOption: true, describe: "Quote transaction ID" })
  .option('account-type', { type: 'string', demandOption: true, describe: "Wallet type (scene code)" })
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
  path: '/v5/asset/exchange/convert-result-query',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/exchange/convert-result-query',
    query: filterDefined({ quoteTxId: argv['quote-tx-id'], accountType: argv['account-type'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
