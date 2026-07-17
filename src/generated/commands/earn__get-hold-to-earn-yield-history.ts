// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-hold-to-earn-yield-history'
export const describe = "Get Yield History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'time-start': {
      type: 'integer',
      description: "Start time (Unix seconds). Cannot be earlier than current time minus 3 months;\notherwise returns `INVALIDARGUMENTS`.\n",
      
    },
    'time-end': {
      type: 'integer',
      description: "End time (Unix seconds). Must satisfy `timeStart ≤ timeEnd`.",
      
    },
    'limit': {
      type: 'integer',
      description: "Page size. Range `1–49`. Returns `INVALIDARGUMENTS` if out of range.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Omit on the first request; pass the `nextCursor` value from\nthe previous response for subsequent pages. Treat the cursor as opaque —\ndo not parse or modify it.\n",
      
    }
  },
  required: ['limit'],
} as const

export const builder = (yargs: any) => yargs
  .option('time-start', { type: 'number', describe: "Start time (Unix seconds). Cannot be earlier than current time minus 3 months;\notherwise returns `INVALIDARGUMENTS`.\n" })
  .option('time-end', { type: 'number', describe: "End time (Unix seconds). Must satisfy `timeStart ≤ timeEnd`." })
  .option('limit', { type: 'number', demandOption: true, describe: "Page size. Range `1–49`. Returns `INVALIDARGUMENTS` if out of range." })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Omit on the first request; pass the `nextCursor` value from\nthe previous response for subsequent pages. Treat the cursor as opaque —\ndo not parse or modify it.\n" })
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
  path: '/v5/earn/hold-to-earn/yield-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/hold-to-earn/yield-history',
    query: filterDefined({ timeStart: argv['time-start'], timeEnd: argv['time-end'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
