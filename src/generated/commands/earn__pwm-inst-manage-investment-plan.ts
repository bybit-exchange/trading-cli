// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'pwm-inst-manage-investment-plan'
export const describe = "Update Investment Plan Status and Funds"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      
      
    },
    'update-status': {
      type: 'string',
      description: "Update plan status (optional)",
      enum: ['Closed', 'Deleted'],
    },
    'update-funds': {
      type: 'string',
      description: "Update fund allocations (optional, max 10 items)",
      
    },
    'req-link-id': {
      type: 'string',
      
      
    }
  },
  required: ['plan-id', 'req-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', demandOption: true })
  .option('update-status', { type: 'string', choices: ['Closed', 'Deleted'], describe: "Update plan status (optional)" })
  .option('update-funds', { type: 'string', describe: "Update fund allocations (optional, max 10 items)" })
  .option('req-link-id', { type: 'string', demandOption: true })
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
  path: '/v5/earn/pwm/asset-manager/manage-investment-plan',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/pwm/asset-manager/manage-investment-plan',
    
    body: { planId: argv['plan-id'], updateStatus: argv['update-status'], updateFunds: argv['update-funds'], reqLinkId: argv['req-link-id'] },
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
    operation: 'earn pwm-inst-manage-investment-plan',
    method: 'POST',
    path: '/v5/earn/pwm/asset-manager/manage-investment-plan',
    params: argv,
  })
  return innerHandler(argv)
}
