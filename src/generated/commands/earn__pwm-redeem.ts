// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'pwm-redeem'
export const describe = "Redeem from an Investment Plan"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      
      
    },
    'category': {
      type: 'string',
      
      enum: ['multiCoinEarning', 'fixedYield', 'equityFund', 'onchainEarn'],
    },
    'product-id': {
      type: 'string',
      description: "Product ID; for `equityFund` pass the fund ID",
      
    },
    'shares': {
      type: 'string',
      description: "Required for `equityFund` redemption (share-based)",
      
    },
    'amount': {
      type: 'string',
      description: "Required for non-`equityFund` redemption (amount-based)",
      
    },
    'order-link-id': {
      type: 'string',
      
      
    },
    'position-id': {
      type: 'integer',
      description: "Position ID",
      
    }
  },
  required: ['plan-id', 'category', 'product-id', 'order-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', demandOption: true })
  .option('category', { type: 'string', choices: ['multiCoinEarning', 'fixedYield', 'equityFund', 'onchainEarn'], demandOption: true })
  .option('product-id', { type: 'string', demandOption: true, describe: "Product ID; for `equityFund` pass the fund ID" })
  .option('shares', { type: 'string', describe: "Required for `equityFund` redemption (share-based)" })
  .option('amount', { type: 'string', describe: "Required for non-`equityFund` redemption (amount-based)" })
  .option('order-link-id', { type: 'string', demandOption: true })
  .option('position-id', { type: 'number', describe: "Position ID" })
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
  path: '/v5/earn/pwm/investment-plan/redeem',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/pwm/investment-plan/redeem',
    
    body: { planId: argv['plan-id'], category: argv['category'], productId: argv['product-id'], shares: argv['shares'], amount: argv['amount'], orderLinkId: argv['order-link-id'], positionId: argv['position-id'] },
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
    operation: 'earn pwm-redeem',
    method: 'POST',
    path: '/v5/earn/pwm/investment-plan/redeem',
    params: argv,
  })
  return innerHandler(argv)
}
