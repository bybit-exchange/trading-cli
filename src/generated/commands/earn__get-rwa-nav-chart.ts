// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-rwa-nav-chart'
export const describe = "Get NAV Chart"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-id': {
      type: 'integer',
      description: "Product ID",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (Unix seconds), default `endTime - 7 days`",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (Unix seconds), default now",
      
    }
  },
  required: ['product-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'number', demandOption: true, describe: "Product ID" })
  .option('start-time', { type: 'number', describe: "Start timestamp (Unix seconds), default `endTime - 7 days`" })
  .option('end-time', { type: 'number', describe: "End timestamp (Unix seconds), default now" })
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
  path: '/v5/earn/rwa/nav-chart',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/rwa/nav-chart',
    query: filterDefined({ productId: argv['product-id'], startTime: argv['start-time'], endTime: argv['end-time'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
