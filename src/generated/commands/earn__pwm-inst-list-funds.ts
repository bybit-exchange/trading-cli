// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'pwm-inst-list-funds'
export const describe = "Query Institution's Managed Funds"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'fund-id': {
      type: 'string',
      description: "Fund ID filter",
      
    },
    'coin': {
      type: 'string',
      description: "Base coin filter",
      
    },
    'status': {
      type: 'string',
      description: "Fund status filter",
      enum: ['PendingSubscribe', 'Active', 'Closing', 'Closed'],
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor (fundId-based)",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('fund-id', { type: 'string', describe: "Fund ID filter" })
  .option('coin', { type: 'string', describe: "Base coin filter" })
  .option('status', { type: 'string', choices: ['PendingSubscribe', 'Active', 'Closing', 'Closed'], describe: "Fund status filter" })
  .option('limit', { type: 'number', describe: "Number of records per page" })
  .option('cursor', { type: 'string', describe: "Pagination cursor (fundId-based)" })
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
  path: '/v5/earn/pwm/asset-manager/all-funds',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/pwm/asset-manager/all-funds',
    query: filterDefined({ fundId: argv['fund-id'], coin: argv['coin'], status: argv['status'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
