// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'pwm-list-order'
export const describe = "List Investment Plan Orders"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      description: "Investment plan ID; if omitted, returns orders across all plans",
      
    },
    'category': {
      type: 'string',
      description: "Product category filter",
      enum: ['multiCoinEarning', 'fixedYield', 'equityFund', 'onchainEarn'],
    },
    'type': {
      type: 'string',
      description: "Order type filter",
      enum: ['Subscribe', 'Redeem'],
    },
    'status': {
      type: 'string',
      description: "Order status filter",
      enum: ['Completed', 'Pending', 'Failed'],
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
      description: "Pagination cursor",
      
    },
    'order-link-id': {
      type: 'string',
      description: "Custom order ID; if provided, returns the matched order",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', describe: "Investment plan ID; if omitted, returns orders across all plans" })
  .option('category', { type: 'string', choices: ['multiCoinEarning', 'fixedYield', 'equityFund', 'onchainEarn'], describe: "Product category filter" })
  .option('type', { type: 'string', choices: ['Subscribe', 'Redeem'], describe: "Order type filter" })
  .option('status', { type: 'string', choices: ['Completed', 'Pending', 'Failed'], describe: "Order status filter" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds)" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds)" })
  .option('limit', { type: 'number', describe: "Number of records per page" })
  .option('cursor', { type: 'string', describe: "Pagination cursor" })
  .option('order-link-id', { type: 'string', describe: "Custom order ID; if provided, returns the matched order" })
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
  path: '/v5/earn/pwm/investment-plan/order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/pwm/investment-plan/order',
    query: filterDefined({ planId: argv['plan-id'], category: argv['category'], type: argv['type'], status: argv['status'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'], orderLinkId: argv['order-link-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
