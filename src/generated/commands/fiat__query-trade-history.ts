// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-trade-history'
export const describe = "Query Trade History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'index': {
      type: 'integer',
      description: "Page number, starts from 1",
      
    },
    'limit': {
      type: 'integer',
      description: "Page size, maximum 100",
      
    },
    'start-time': {
      type: 'string',
      description: "Query start time (millisecond timestamp)",
      
    },
    'end-time': {
      type: 'string',
      description: "Query end time (millisecond timestamp)",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('index', { type: 'number', describe: "Page number, starts from 1" })
  .option('limit', { type: 'number', describe: "Page size, maximum 100" })
  .option('start-time', { type: 'string', describe: "Query start time (millisecond timestamp)" })
  .option('end-time', { type: 'string', describe: "Query end time (millisecond timestamp)" })
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
  path: '/v5/fiat/query-trade-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/fiat/query-trade-history',
    query: filterDefined({ index: argv['index'], limit: argv['limit'], startTime: argv['start-time'], endTime: argv['end-time'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
