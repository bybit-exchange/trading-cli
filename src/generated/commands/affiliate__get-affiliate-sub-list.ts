// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-affiliate-sub-list'
export const describe = "Get affiliate sub-affiliate list"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Pass an empty string or omit on the first request;\npass the `nextPageCursor` from the previous response for subsequent pages.\n",
      
    },
    'size': {
      type: 'integer',
      description: "Number of records per page, range 0–1000. Default 0 (returns all, up to 1000).",
      
    },
    'start-date': {
      type: 'string',
      description: "Custom query start date, format `YYYY-MM-DD` (corresponds to `00:00:00` UTC).\nWhen provided together with `endDate`, the response includes `commissionsVol` and `commissionsForUsdt` for the date range.\n",
      
    },
    'end-date': {
      type: 'string',
      description: "Custom query end date, format `YYYY-MM-DD` (corresponds to `23:59:59` UTC).\nTakes effect when provided together with `startDate`.\n",
      
    },
    'sub-aff-id': {
      type: 'integer',
      description: "Sub-affiliate ID for exact lookup. Pass `0` or omit to return all sub-affiliates without filtering.\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('cursor', { type: 'string', describe: "Pagination cursor. Pass an empty string or omit on the first request;\npass the `nextPageCursor` from the previous response for subsequent pages.\n" })
  .option('size', { type: 'number', describe: "Number of records per page, range 0–1000. Default 0 (returns all, up to 1000)." })
  .option('start-date', { type: 'string', describe: "Custom query start date, format `YYYY-MM-DD` (corresponds to `00:00:00` UTC).\nWhen provided together with `endDate`, the response includes `commissionsVol` and `commissionsForUsdt` for the date range.\n" })
  .option('end-date', { type: 'string', describe: "Custom query end date, format `YYYY-MM-DD` (corresponds to `23:59:59` UTC).\nTakes effect when provided together with `startDate`.\n" })
  .option('sub-aff-id', { type: 'number', describe: "Sub-affiliate ID for exact lookup. Pass `0` or omit to return all sub-affiliates without filtering.\n" })
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
  path: '/v5/affiliate/affiliate-sub-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/affiliate/affiliate-sub-list',
    query: filterDefined({ cursor: argv['cursor'], size: argv['size'], startDate: argv['start-date'], endDate: argv['end-date'], subAffId: argv['sub-aff-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
