// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-small-asset-convert-order'
export const describe = "Small asset conversion history query"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Wallet type: eb_convert_uta or eb_convert_funding",
      enum: ['eb_convert_uta', 'eb_convert_funding'],
    },
    'quote-id': {
      type: 'string',
      description: "Quote ID. Highest priority filter when provided",
      
    },
    'cursor': {
      type: 'string',
      description: "Page number for pagination",
      
    },
    'size': {
      type: 'string',
      description: "Page size, default 50, max 100",
      
    },
    'start-time': {
      type: 'string',
      description: "Start timestamp in milliseconds",
      
    },
    'end-time': {
      type: 'string',
      description: "End timestamp in milliseconds",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', choices: ['eb_convert_uta', 'eb_convert_funding'], describe: "Wallet type: eb_convert_uta or eb_convert_funding" })
  .option('quote-id', { type: 'string', describe: "Quote ID. Highest priority filter when provided" })
  .option('cursor', { type: 'string', describe: "Page number for pagination" })
  .option('size', { type: 'string', describe: "Page size, default 50, max 100" })
  .option('start-time', { type: 'string', describe: "Start timestamp in milliseconds" })
  .option('end-time', { type: 'string', describe: "End timestamp in milliseconds" })
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
  path: '/v5/asset/covert/small-balance-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/covert/small-balance-history',
    query: filterDefined({ accountType: argv['account-type'], quoteId: argv['quote-id'], cursor: argv['cursor'], size: argv['size'], startTime: argv['start-time'], endTime: argv['end-time'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
