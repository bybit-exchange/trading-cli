// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-broker-earning'
export const describe = "Get Broker Earnings Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'biz-type': {
      type: 'string',
      description: "Business type filter.",
      enum: ['SPOT', 'DERIVATIVES', 'OPTIONS', 'CONVERT'],
    },
    'begin': {
      type: 'string',
      description: "Start date in YYYYMMDD format. Must be provided together with `end`.",
      
    },
    'end': {
      type: 'string',
      description: "End date in YYYYMMDD format. Must be provided together with `begin`.",
      
    },
    'uid': {
      type: 'string',
      description: "Broker subaccount UID. If empty, returns data for all subaccounts.",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of results per page. Range: [1, 1000], default: 1000.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use the `nextPageCursor` value from the previous response. URL-encode when sending the request.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('biz-type', { type: 'string', choices: ['SPOT', 'DERIVATIVES', 'OPTIONS', 'CONVERT'], describe: "Business type filter." })
  .option('begin', { type: 'string', describe: "Start date in YYYYMMDD format. Must be provided together with `end`." })
  .option('end', { type: 'string', describe: "End date in YYYYMMDD format. Must be provided together with `begin`." })
  .option('uid', { type: 'string', describe: "Broker subaccount UID. If empty, returns data for all subaccounts." })
  .option('limit', { type: 'number', describe: "Number of results per page. Range: [1, 1000], default: 1000." })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Use the `nextPageCursor` value from the previous response. URL-encode when sending the request." })
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
  path: '/v5/broker/earnings-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/broker/earnings-info',
    query: filterDefined({ bizType: argv['biz-type'], begin: argv['begin'], end: argv['end'], uid: argv['uid'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
