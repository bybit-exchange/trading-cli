// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-trade-history'
export const describe = "Get Trade History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'rfq-id': {
      type: 'string',
      description: "Filter by inquiry ID. Takes priority over rfqLinkId.",
      
    },
    'rfq-link-id': {
      type: 'string',
      description: "Filter by custom RFQ ID. Restricts results to last 3 months.",
      
    },
    'quote-id': {
      type: 'string',
      description: "Filter by quote ID. Takes priority over quoteLinkId.",
      
    },
    'quote-link-id': {
      type: 'string',
      description: "Filter by custom quote ID. Restricts results to last 3 months.",
      
    },
    'trader-type': {
      type: 'string',
      description: "Trader type perspective. Default \"quote\".",
      enum: ['quote', 'request'],
    },
    'status': {
      type: 'string',
      description: "Filter by trade outcome status.",
      enum: ['Filled', 'Failed'],
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
  .option('rfq-id', { type: 'string', describe: "Filter by inquiry ID. Takes priority over rfqLinkId." })
  .option('rfq-link-id', { type: 'string', describe: "Filter by custom RFQ ID. Restricts results to last 3 months." })
  .option('quote-id', { type: 'string', describe: "Filter by quote ID. Takes priority over quoteLinkId." })
  .option('quote-link-id', { type: 'string', describe: "Filter by custom quote ID. Restricts results to last 3 months." })
  .option('trader-type', { type: 'string', choices: ['quote', 'request'], describe: "Trader type perspective. Default \"quote\"." })
  .option('status', { type: 'string', choices: ['Filled', 'Failed'], describe: "Filter by trade outcome status." })
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
  path: '/v5/rfq/trade-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/rfq/trade-list',
    query: filterDefined({ rfqId: argv['rfq-id'], rfqLinkId: argv['rfq-link-id'], quoteId: argv['quote-id'], quoteLinkId: argv['quote-link-id'], traderType: argv['trader-type'], status: argv['status'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
