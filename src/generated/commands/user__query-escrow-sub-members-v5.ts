// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-escrow-sub-members-v5'
export const describe = "Query Escrow Sub-accounts (Fund Management)"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'next-cursor': {
      type: 'integer',
      
      
    },
    'page-size': {
      type: 'integer',
      
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('next-cursor', { type: 'number' })
  .option('page-size', { type: 'number' })
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
  path: '/v5/user/escrow_sub_members',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/user/escrow_sub_members',
    query: filterDefined({ nextCursor: argv['next-cursor'], pageSize: argv['page-size'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
