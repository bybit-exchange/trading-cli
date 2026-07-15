// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'pwm-claim'
export const describe = "Claim Available Funds"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      description: "Investment plan ID; must be in `Active` status",
      
    },
    'to-account-type': {
      type: 'string',
      description: "Target account type for claimed funds",
      enum: ['FUND', 'UNIFIED'],
    },
    'order-link-id': {
      type: 'string',
      description: "Custom order ID for idempotency",
      
    }
  },
  required: ['plan-id', 'order-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', demandOption: true, describe: "Investment plan ID; must be in `Active` status" })
  .option('to-account-type', { type: 'string', choices: ['FUND', 'UNIFIED'], describe: "Target account type for claimed funds" })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "Custom order ID for idempotency" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  .option('yes', { type: 'boolean', describe: 'Confirm mainnet write op (required on mainnet)' })
  .option('cap-usd', { type: 'number', describe: 'Reject if estimated USD value exceeds this' })
  .option('cap-usd-total-hour', { type: 'number', describe: 'Reject if rolling 1h total exceeds this' })
  .option('max-orders-per-hour', { type: 'number', describe: 'Reject if 1h order count would exceed this' })
  .option('enable-advanced-money-ops', { type: 'boolean', describe: 'Unlock withdraw/transfer/fiat/p2p endpoints' })

function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'POST',
  path: '/v5/earn/pwm/investment-plan/claim',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/pwm/investment-plan/claim',
    
    body: { planId: argv['plan-id'], toAccountType: argv['to-account-type'], orderLinkId: argv['order-link-id'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  // Auto-inject orderLinkId for idempotency across retries.
  // User can override with --order-link-id.
  if (argv['order-link-id'] === undefined && argv.orderLinkId === undefined) {
    argv['order-link-id'] = makeOrderLinkId(argv)
    argv.orderLinkId = argv['order-link-id']
  }
  checkConfirm(argv, {
    operation: 'earn pwm-claim',
    method: 'POST',
    path: '/v5/earn/pwm/investment-plan/claim',
    params: argv,
  })
  return innerHandler(argv)
}
