// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-public-trades'
export const describe = "Get Public Trades"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds (epoch). The window between startTime and endTime\nmust not exceed 30 days.\n",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds (epoch). The window between startTime and endTime\nmust not exceed 30 days.\n",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of items per response. Range [1, 100]. Default 50.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response's nextPageCursor.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds (epoch). The window between startTime and endTime\nmust not exceed 30 days.\n" })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds (epoch). The window between startTime and endTime\nmust not exceed 30 days.\n" })
  .option('limit', { type: 'number', describe: "Number of items per response. Range [1, 100]. Default 50." })
  .option('cursor', { type: 'string', describe: "Pagination cursor from previous response's nextPageCursor." })
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
  path: '/v5/rfq/public-trades',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/rfq/public-trades',
    query: filterDefined({ startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
