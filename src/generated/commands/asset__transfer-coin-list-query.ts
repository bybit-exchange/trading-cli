// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'transfer-coin-list-query'
export const describe = "Get Transferable Coin List"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'from-account-type': {
      type: 'string',
      description: "Source account type",
      enum: ['UNIFIED', 'FUND'],
    },
    'to-account-type': {
      type: 'string',
      description: "Destination account type",
      enum: ['UNIFIED', 'FUND'],
    }
  },
  required: ['from-account-type', 'to-account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('from-account-type', { type: 'string', choices: ['UNIFIED', 'FUND'], demandOption: true, describe: "Source account type" })
  .option('to-account-type', { type: 'string', choices: ['UNIFIED', 'FUND'], demandOption: true, describe: "Destination account type" })
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
  path: '/v5/asset/transfer/query-transfer-coin-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/transfer/query-transfer-coin-list',
    query: filterDefined({ fromAccountType: argv['from-account-type'], toAccountType: argv['to-account-type'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
