// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'pwm-invest-more'
export const describe = "Invest More in an Active Plan"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'plan-id': {
      type: 'string',
      description: "Investment plan ID; must be in `Active` status",
      
    },
    'account-type': {
      type: 'string',
      
      enum: ['FUND', 'UNIFIED'],
    },
    'category': {
      type: 'string',
      
      enum: ['multiCoinEarning', 'fixedYield', 'equityFund', 'onchainEarn'],
    },
    'product-id': {
      type: 'string',
      
      
    },
    'amount': {
      type: 'string',
      description: "Amount to invest (denominated in the product coin)",
      
    },
    'order-link-id': {
      type: 'string',
      
      
    }
  },
  required: ['plan-id', 'category', 'product-id', 'amount', 'order-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('plan-id', { type: 'string', demandOption: true, describe: "Investment plan ID; must be in `Active` status" })
  .option('account-type', { type: 'string', choices: ['FUND', 'UNIFIED'] })
  .option('category', { type: 'string', choices: ['multiCoinEarning', 'fixedYield', 'equityFund', 'onchainEarn'], demandOption: true })
  .option('product-id', { type: 'string', demandOption: true })
  .option('amount', { type: 'string', demandOption: true, describe: "Amount to invest (denominated in the product coin)" })
  .option('order-link-id', { type: 'string', demandOption: true })
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
  path: '/v5/earn/pwm/investment-plan/invest-more',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/pwm/investment-plan/invest-more',
    
    body: { planId: argv['plan-id'], accountType: argv['account-type'], category: argv['category'], productId: argv['product-id'], amount: argv['amount'], orderLinkId: argv['order-link-id'] },
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
    operation: 'earn pwm-invest-more',
    method: 'POST',
    path: '/v5/earn/pwm/investment-plan/invest-more',
    params: argv,
  })
  return innerHandler(argv)
}
