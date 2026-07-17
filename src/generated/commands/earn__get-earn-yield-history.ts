// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-earn-yield-history'
export const describe = "Get Yield History"
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
      type: 'integer',
      description: "Product ID (FlexibleSaving only; not applicable for OnChain)",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds). Defaults to 7 days ago.\nFor `OnChain`, maximum range from `endTime` is 90 days.\n",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds). Defaults to current time.\nFor `OnChain`, interval from `startTime` must not exceed 182 days.\n",
      
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
  .option('category', { type: 'string', choices: ['FlexibleSaving', 'OnChain'], demandOption: true, describe: "Product category" })
  .option('product-id', { type: 'number', describe: "Product ID (FlexibleSaving only; not applicable for OnChain)" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds). Defaults to 7 days ago.\nFor `OnChain`, maximum range from `endTime` is 90 days.\n" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds). Defaults to current time.\nFor `OnChain`, interval from `startTime` must not exceed 182 days.\n" })
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
  path: '/v5/earn/yield',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/yield',
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
