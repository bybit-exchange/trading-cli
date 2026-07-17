// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'pwm-inst-get-investment-plans'
export const describe = "Query Institution's Investment Plans"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      description: "Investment plan ID filter",
      
    },
    'status': {
      type: 'string',
      description: "Plan status filter",
      enum: ['PendingSubscription', 'Active', 'Closed', 'Deleted'],
    },
    'subscription-uid': {
      type: 'string',
      description: "Filter by subscriber UID",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor (planId-based)",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', describe: "Investment plan ID filter" })
  .option('status', { type: 'string', choices: ['PendingSubscription', 'Active', 'Closed', 'Deleted'], describe: "Plan status filter" })
  .option('subscription-uid', { type: 'string', describe: "Filter by subscriber UID" })
  .option('limit', { type: 'number', describe: "Number of records per page" })
  .option('cursor', { type: 'string', describe: "Pagination cursor (planId-based)" })
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
  path: '/v5/earn/pwm/asset-manager/get-investment-plan',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/pwm/asset-manager/get-investment-plan',
    query: filterDefined({ planId: argv['plan-id'], status: argv['status'], subscriptionUid: argv['subscription-uid'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
