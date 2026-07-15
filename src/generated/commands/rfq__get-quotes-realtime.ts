// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-quotes-realtime'
export const describe = "Get Quotes Realtime"
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
      description: "Filter by specific quote ID. Highest priority.",
      
    },
    'quote-link-id': {
      type: 'string',
      description: "Filter by custom quote ID. Invalid when traderType is \"request\".",
      
    },
    'trader-type': {
      type: 'string',
      description: "Trader type perspective. \"quote\" for quoters viewing their own quotes,\n\"request\" for requesters viewing quotes on their RFQs. Default \"quote\".\n",
      enum: ['quote', 'request'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('rfq-id', { type: 'string', describe: "Filter quotes by inquiry ID." })
  .option('quote-id', { type: 'string', describe: "Filter by specific quote ID. Highest priority." })
  .option('quote-link-id', { type: 'string', describe: "Filter by custom quote ID. Invalid when traderType is \"request\"." })
  .option('trader-type', { type: 'string', choices: ['quote', 'request'], describe: "Trader type perspective. \"quote\" for quoters viewing their own quotes,\n\"request\" for requesters viewing quotes on their RFQs. Default \"quote\".\n" })
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
  path: '/v5/rfq/quote-realtime',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/rfq/quote-realtime',
    query: filterDefined({ rfqId: argv['rfq-id'], quoteId: argv['quote-id'], quoteLinkId: argv['quote-link-id'], traderType: argv['trader-type'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
