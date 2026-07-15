// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'pwm-list-investment-plans'
export const describe = "List Investment Plans"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      description: "Investment plan ID; if omitted, returns all plans",
      
    },
    'status': {
      type: 'string',
      description: "Plan status filter",
      enum: ['PendingSubscription', 'Active', 'Closed'],
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor; use `nextPageCursor` from the previous response",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', describe: "Investment plan ID; if omitted, returns all plans" })
  .option('status', { type: 'string', choices: ['PendingSubscription', 'Active', 'Closed'], describe: "Plan status filter" })
  .option('limit', { type: 'number', describe: "Number of records per page" })
  .option('cursor', { type: 'string', describe: "Pagination cursor; use `nextPageCursor` from the previous response" })
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
  path: '/v5/earn/pwm/investment-plan/all',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/pwm/investment-plan/all',
    query: filterDefined({ planId: argv['plan-id'], status: argv['status'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
