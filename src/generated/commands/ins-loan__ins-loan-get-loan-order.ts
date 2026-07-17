// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'ins-loan-get-loan-order'
export const describe = "Get Loan Orders"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "Loan order ID. If not passed, returns all orders.",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start time, unit in millisecond.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End time, unit in millisecond.",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records to return. Default 500, max 500.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', describe: "Loan order ID. If not passed, returns all orders." })
  .option('start-time', { type: 'number', describe: "Start time, unit in millisecond." })
  .option('end-time', { type: 'number', describe: "End time, unit in millisecond." })
  .option('limit', { type: 'number', describe: "Number of records to return. Default 500, max 500." })
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
  path: '/v5/ins-loan/loan-order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/ins-loan/loan-order',
    query: filterDefined({ orderId: argv['order-id'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
