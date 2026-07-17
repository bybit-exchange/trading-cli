// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'pwm-asset-trend'
export const describe = "Get Plan Asset Trend"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      description: "Investment plan ID",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp (milliseconds); defaults to current time minus 7 days",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp (milliseconds); defaults to current time",
      
    }
  },
  required: ['plan-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', demandOption: true, describe: "Investment plan ID" })
  .option('start-time', { type: 'number', describe: "Start timestamp (milliseconds); defaults to current time minus 7 days" })
  .option('end-time', { type: 'number', describe: "End timestamp (milliseconds); defaults to current time" })
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
  path: '/v5/earn/pwm/investment-plan/asset-trend',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/pwm/investment-plan/asset-trend',
    query: filterDefined({ planId: argv['plan-id'], startTime: argv['start-time'], endTime: argv['end-time'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
