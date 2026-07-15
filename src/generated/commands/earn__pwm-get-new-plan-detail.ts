// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'pwm-get-new-plan-detail'
export const describe = "Get Pending-Subscription Plan Detail"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      description: "Investment plan ID; must be in `PendingSubscription` status",
      
    }
  },
  required: ['plan-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', demandOption: true, describe: "Investment plan ID; must be in `PendingSubscription` status" })
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
  path: '/v5/earn/pwm/investment-plan/new-plan',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/pwm/investment-plan/new-plan',
    query: filterDefined({ planId: argv['plan-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
