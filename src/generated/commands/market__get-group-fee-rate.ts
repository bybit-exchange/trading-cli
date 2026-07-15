// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-group-fee-rate'
export const describe = "Query group fee rate info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-type': {
      type: 'string',
      description: "Product type, currently only supports:\n- `contract` — Futures/Contract\n",
      enum: ['contract'],
    },
    'group-id': {
      type: 'string',
      description: "Group ID, returns all groups if not provided",
      
    }
  },
  required: ['product-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-type', { type: 'string', choices: ['contract'], demandOption: true, describe: "Product type, currently only supports:\n- `contract` — Futures/Contract\n" })
  .option('group-id', { type: 'string', describe: "Group ID, returns all groups if not provided" })
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
  path: '/v5/market/fee-group-info',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/fee-group-info',
    query: filterDefined({ productType: argv['product-type'], groupId: argv['group-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
