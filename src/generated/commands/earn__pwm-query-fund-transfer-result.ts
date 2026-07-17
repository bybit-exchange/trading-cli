// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'pwm-query-fund-transfer-result'
export const describe = "Query Fund Transfer Records"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'transfer-id': {
      type: 'string',
      description: "Transfer ID filter",
      
    },
    'from-user-id': {
      type: 'integer',
      description: "Source user ID filter",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('transfer-id', { type: 'string', describe: "Transfer ID filter" })
  .option('from-user-id', { type: 'number', describe: "Source user ID filter" })
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
  path: '/v5/earn/pwm/query-fund-transfer-result',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/pwm/query-fund-transfer-result',
    query: filterDefined({ transferId: argv['transfer-id'], fromUserId: argv['from-user-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
