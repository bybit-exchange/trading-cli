// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'pwm-inst-create-investment-plan'
export const describe = "Create Investment Plan for Client"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-uid': {
      type: 'string',
      description: "Target user UID",
      
    },
    'plan-name': {
      type: 'string',
      description: "Investment plan name",
      
    },
    'plan-type': {
      type: 'string',
      description: "Plan type (stable = steady value added, advanced = advanced benefits)",
      enum: ['stable', 'advanced'],
    },
    'investment-distribution': {
      type: 'string',
      description: "Fund allocation list",
      
    },
    'req-link-id': {
      type: 'string',
      description: "Request ID for idempotency",
      
    }
  },
  required: ['account-uid', 'plan-name', 'plan-type', 'investment-distribution', 'req-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('account-uid', { type: 'string', demandOption: true, describe: "Target user UID" })
  .option('plan-name', { type: 'string', demandOption: true, describe: "Investment plan name" })
  .option('plan-type', { type: 'string', choices: ['stable', 'advanced'], demandOption: true, describe: "Plan type (stable = steady value added, advanced = advanced benefits)" })
  .option('investment-distribution', { type: 'string', demandOption: true, describe: "Fund allocation list" })
  .option('req-link-id', { type: 'string', demandOption: true, describe: "Request ID for idempotency" })
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
  path: '/v5/earn/pwm/asset-manager/create-investment-plan',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/pwm/asset-manager/create-investment-plan',
    
    body: { accountUid: argv['account-uid'], planName: argv['plan-name'], planType: argv['plan-type'], investmentDistribution: argv['investment-distribution'], reqLinkId: argv['req-link-id'] },
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
    operation: 'earn pwm-inst-create-investment-plan',
    method: 'POST',
    path: '/v5/earn/pwm/asset-manager/create-investment-plan',
    params: argv,
  })
  return innerHandler(argv)
}
