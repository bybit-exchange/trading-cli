// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-earn-apr-history'
export const describe = "Get APR History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product category",
      enum: ['FlexibleSaving', 'OnChain'],
    },
    'product-id': {
      type: 'string',
      description: "Product ID, consistent with `productId` returned by `GET /v5/earn/product`",
      
    },
    'start-time': {
      type: 'integer',
      description: "Query start time (Unix milliseconds)",
      
    },
    'end-time': {
      type: 'integer',
      description: "Query end time (Unix milliseconds); interval from `startTime` must not exceed 182 days",
      
    }
  },
  required: ['category', 'product-id', 'start-time', 'end-time'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['FlexibleSaving', 'OnChain'], demandOption: true, describe: "Product category" })
  .option('product-id', { type: 'string', demandOption: true, describe: "Product ID, consistent with `productId` returned by `GET /v5/earn/product`" })
  .option('start-time', { type: 'number', demandOption: true, describe: "Query start time (Unix milliseconds)" })
  .option('end-time', { type: 'number', demandOption: true, describe: "Query end time (Unix milliseconds); interval from `startTime` must not exceed 182 days" })
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
  path: '/v5/earn/apr-history',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/apr-history',
    query: filterDefined({ category: argv['category'], productId: argv['product-id'], startTime: argv['start-time'], endTime: argv['end-time'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
