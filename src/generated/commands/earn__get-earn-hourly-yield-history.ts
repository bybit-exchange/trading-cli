// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-earn-hourly-yield-history'
export const describe = "Get Hourly Yield History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product category, fixed as `FlexibleSaving`",
      enum: ['FlexibleSaving'],
    },
    'product-id': {
      type: 'string',
      description: "Product ID",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds), defaults to 7 days ago",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds), interval from `startTime` must not exceed 7 days",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['FlexibleSaving'], demandOption: true, describe: "Product category, fixed as `FlexibleSaving`" })
  .option('product-id', { type: 'string', describe: "Product ID" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds), defaults to 7 days ago" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds), interval from `startTime` must not exceed 7 days" })
  .option('limit', { type: 'number', describe: "Number of records per page" })
  .option('cursor', { type: 'string', describe: "Pagination cursor" })
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
  path: '/v5/earn/hourly-yield',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/hourly-yield',
    query: filterDefined({ category: argv['category'], productId: argv['product-id'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
