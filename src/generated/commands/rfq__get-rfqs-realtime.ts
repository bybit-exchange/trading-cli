// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-rfqs-realtime'
export const describe = "Get RFQs Realtime"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'rfq-id': {
      type: 'string',
      description: "Filter by specific inquiry ID.",
      
    },
    'rfq-link-id': {
      type: 'string',
      description: "Filter by custom inquiry ID. Invalid when traderType is \"quote\".",
      
    },
    'trader-type': {
      type: 'string',
      description: "Trader type perspective. \"quote\" for quoters viewing incoming RFQs,\n\"request\" for requesters viewing their own RFQs. Default: \"quote\".\n",
      enum: ['quote', 'request'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('rfq-id', { type: 'string', describe: "Filter by specific inquiry ID." })
  .option('rfq-link-id', { type: 'string', describe: "Filter by custom inquiry ID. Invalid when traderType is \"quote\"." })
  .option('trader-type', { type: 'string', choices: ['quote', 'request'], describe: "Trader type perspective. \"quote\" for quoters viewing incoming RFQs,\n\"request\" for requesters viewing their own RFQs. Default: \"quote\".\n" })
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
  path: '/v5/rfq/rfq-realtime',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/rfq/rfq-realtime',
    query: filterDefined({ rfqId: argv['rfq-id'], rfqLinkId: argv['rfq-link-id'], traderType: argv['trader-type'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
