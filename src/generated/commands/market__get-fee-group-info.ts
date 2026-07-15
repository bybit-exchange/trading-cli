// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-fee-group-info'
export const describe = "Get Fee Group Structure"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-type': {
      type: 'string',
      description: "Product type. Only `contract` is supported",
      enum: ['contract'],
    },
    'group-id': {
      type: 'string',
      description: "Group ID identifier, range 1–8",
      enum: ['1', '2', '3', '4', '5', '6', '7', '8'],
    }
  },
  required: ['product-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-type', { type: 'string', choices: ['contract'], demandOption: true, describe: "Product type. Only `contract` is supported" })
  .option('group-id', { type: 'string', choices: ['1', '2', '3', '4', '5', '6', '7', '8'], describe: "Group ID identifier, range 1–8" })
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
