// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-historical-interest-rate'
export const describe = "Get Historical Interest Rate"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'currency': {
      type: 'string',
      description: "Coin name, uppercase only.",
      
    },
    'vip-level': {
      type: 'string',
      description: "VIP level designation. If omitted, uses the account's current VIP level.\nNote: \"No VIP\" must be URL-encoded as \"No%20VIP\".\n",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds. Must be provided together with `endTime`. Maximum span is 30 days.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Must be provided together with `startTime`. Maximum span is 30 days.",
      
    }
  },
  required: ['currency'],
} as const

export const builder = (yargs: any) => yargs
  .option('currency', { type: 'string', demandOption: true, describe: "Coin name, uppercase only." })
  .option('vip-level', { type: 'string', describe: "VIP level designation. If omitted, uses the account's current VIP level.\nNote: \"No VIP\" must be URL-encoded as \"No%20VIP\".\n" })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds. Must be provided together with `endTime`. Maximum span is 30 days." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Must be provided together with `startTime`. Maximum span is 30 days." })
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
  path: '/v5/spot-margin-trade/interest-rate-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spot-margin-trade/interest-rate-history',
    query: filterDefined({ currency: argv['currency'], vipLevel: argv['vip-level'], startTime: argv['start-time'], endTime: argv['end-time'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
