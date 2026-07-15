// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'pwm-inst-list-orders'
export const describe = "Query Fund Subscription/Redemption Orders"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'fund-id': {
      type: 'string',
      description: "Fund ID filter",
      
    },
    'order-type': {
      type: 'string',
      description: "Order type filter",
      enum: ['Subscribe', 'Redeem'],
    },
    'status': {
      type: 'string',
      description: "Order status filter",
      enum: ['PendingReview', 'Pass', 'Rejected', 'Processing', 'Success', 'Failed'],
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds)",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds)",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor (orderId-based)",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('fund-id', { type: 'string', describe: "Fund ID filter" })
  .option('order-type', { type: 'string', choices: ['Subscribe', 'Redeem'], describe: "Order type filter" })
  .option('status', { type: 'string', choices: ['PendingReview', 'Pass', 'Rejected', 'Processing', 'Success', 'Failed'], describe: "Order status filter" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds)" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds)" })
  .option('limit', { type: 'number', describe: "Number of records per page" })
  .option('cursor', { type: 'string', describe: "Pagination cursor (orderId-based)" })
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
  path: '/v5/earn/pwm/asset-manager/all-order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/pwm/asset-manager/all-order',
    query: filterDefined({ fundId: argv['fund-id'], orderType: argv['order-type'], status: argv['status'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
