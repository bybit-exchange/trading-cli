// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-referrals'
export const describe = "Query Referrals"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'cursor': {
      type: 'string',
      
      
    },
    'size': {
      type: 'integer',
      
      
    },
    'status': {
      type: 'string',
      
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('cursor', { type: 'string' })
  .option('size', { type: 'number' })
  .option('status', { type: 'string' })
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
  path: '/v5/user/invitation/referrals',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/user/invitation/referrals',
    query: filterDefined({ cursor: argv['cursor'], size: argv['size'], status: argv['status'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
