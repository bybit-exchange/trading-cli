// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'asset-info-query'
export const describe = "Get Spot Asset Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Account type. Currently only SPOT. Defaults to SPOT if empty.",
      enum: ['UNIFIED', 'FUND'],
    },
    'coin': {
      type: 'string',
      description: "Coin name, uppercase. Optional; returns all coins if empty.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', choices: ['UNIFIED', 'FUND'], describe: "Account type. Currently only SPOT. Defaults to SPOT if empty." })
  .option('coin', { type: 'string', describe: "Coin name, uppercase. Optional; returns all coins if empty." })
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
  path: '/v5/asset/transfer/query-asset-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/transfer/query-asset-info',
    query: filterDefined({ accountType: argv['account-type'], coin: argv['coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
