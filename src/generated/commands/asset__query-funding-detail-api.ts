// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-funding-detail-api'
export const describe = "Get Funding History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'create-time-from': {
      type: 'string',
      description: "Start timestamp (seconds). Must be used together with `createTimeTo`. The interval between `createTimeFrom` and `createTimeTo` cannot exceed 7 days. If neither is provided, defaults to the last 7 days.",
      
    },
    'create-time-to': {
      type: 'string',
      description: "End timestamp (seconds). Must be used together with `createTimeFrom`. The interval between `createTimeFrom` and `createTimeTo` cannot exceed 7 days. If neither is provided, defaults to the last 7 days.",
      
    },
    'limit': {
      type: 'string',
      description: "Limit for data size per page. [1, 100]. Default: 10.",
      
    },
    'cursor': {
      type: 'string',
      description: "Cursor, used for pagination. Pass `nextPageCursor` from the previous response.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('create-time-from', { type: 'string', describe: "Start timestamp (seconds). Must be used together with `createTimeTo`. The interval between `createTimeFrom` and `createTimeTo` cannot exceed 7 days. If neither is provided, defaults to the last 7 days." })
  .option('create-time-to', { type: 'string', describe: "End timestamp (seconds). Must be used together with `createTimeFrom`. The interval between `createTimeFrom` and `createTimeTo` cannot exceed 7 days. If neither is provided, defaults to the last 7 days." })
  .option('limit', { type: 'string', describe: "Limit for data size per page. [1, 100]. Default: 10." })
  .option('cursor', { type: 'string', describe: "Cursor, used for pagination. Pass `nextPageCursor` from the previous response." })
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
  path: '/v5/asset/fundinghistory',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/fundinghistory',
    query: filterDefined({ createTimeFrom: argv['create-time-from'], createTimeTo: argv['create-time-to'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
