// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-broker-all-uid-details'
export const describe = "Query Broker All UID Rate Limits"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'uids': {
      type: 'string',
      description: "Multiple UIDs across different master accounts, separated by commas.",
      
    },
    'limit': {
      type: 'integer',
      description: "Page size. Range: [1, 1000], default: 1000.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use the `nextPageCursor` value returned from the previous response. URL-encode when sending the request.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('uids', { type: 'string', describe: "Multiple UIDs across different master accounts, separated by commas." })
  .option('limit', { type: 'number', describe: "Page size. Range: [1, 1000], default: 1000." })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Use the `nextPageCursor` value returned from the previous response. URL-encode when sending the request." })
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
  path: '/v5/broker/apilimit/query-all',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/broker/apilimit/query-all',
    query: filterDefined({ uids: argv['uids'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
