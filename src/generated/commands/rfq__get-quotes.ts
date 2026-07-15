// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-quotes'
export const describe = "Get Quotes"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'rfq-id': {
      type: 'string',
      description: "Filter quotes by inquiry ID.",
      
    },
    'quote-id': {
      type: 'string',
      description: "Filter by specific quote ID.",
      
    },
    'quote-link-id': {
      type: 'string',
      description: "Filter by custom quote ID. Invalid when traderType is \"request\".\n",
      
    },
    'trader-type': {
      type: 'string',
      description: "Trader type perspective. Default \"quote\".",
      enum: ['quote', 'request'],
    },
    'status': {
      type: 'string',
      description: "Filter by quote status.",
      enum: ['Active', 'Canceled', 'PendingFill', 'Filled', 'Expired', 'Failed'],
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
  .option('rfq-id', { type: 'string', describe: "Filter quotes by inquiry ID." })
  .option('quote-id', { type: 'string', describe: "Filter by specific quote ID." })
  .option('quote-link-id', { type: 'string', describe: "Filter by custom quote ID. Invalid when traderType is \"request\".\n" })
  .option('trader-type', { type: 'string', choices: ['quote', 'request'], describe: "Trader type perspective. Default \"quote\"." })
  .option('status', { type: 'string', choices: ['Active', 'Canceled', 'PendingFill', 'Filled', 'Expired', 'Failed'], describe: "Filter by quote status." })
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
  path: '/v5/rfq/quote-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/rfq/quote-list',
    query: filterDefined({ rfqId: argv['rfq-id'], quoteId: argv['quote-id'], quoteLinkId: argv['quote-link-id'], traderType: argv['trader-type'], status: argv['status'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
