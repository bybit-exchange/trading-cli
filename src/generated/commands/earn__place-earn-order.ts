// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'place-earn-order'
export const describe = "Stake / Redeem"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      
      enum: ['FlexibleSaving', 'OnChain'],
    },
    'order-type': {
      type: 'string',
      description: "Stake or Redeem",
      enum: ['Stake', 'Redeem'],
    },
    'account-type': {
      type: 'string',
      description: "Source account type; OnChain only supports `FUND`",
      enum: ['FUND', 'UNIFIED'],
    },
    'amount': {
      type: 'string',
      description: "Stake/redeem amount, must satisfy the product's minStake/maxStake and precision requirements",
      
    },
    'coin': {
      type: 'string',
      description: "Coin (uppercase)",
      
    },
    'product-id': {
      type: 'string',
      description: "Product ID",
      
    },
    'order-link-id': {
      type: 'string',
      description: "Custom order ID for replay prevention; must be unique within 30 minutes",
      
    },
    'redeem-position-id': {
      type: 'string',
      description: "Position ID for redeeming non-LST OnChain products",
      
    },
    'to-account-type': {
      type: 'string',
      description: "Target account type for redeemed funds",
      enum: ['FUND', 'UNIFIED'],
    },
    'interest-card': {
      type: 'string',
      
      
    }
  },
  required: ['category', 'order-type', 'account-type', 'amount', 'coin', 'product-id', 'order-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['FlexibleSaving', 'OnChain'], demandOption: true })
  .option('order-type', { type: 'string', choices: ['Stake', 'Redeem'], demandOption: true, describe: "Stake or Redeem" })
  .option('account-type', { type: 'string', choices: ['FUND', 'UNIFIED'], demandOption: true, describe: "Source account type; OnChain only supports `FUND`" })
  .option('amount', { type: 'string', demandOption: true, describe: "Stake/redeem amount, must satisfy the product's minStake/maxStake and precision requirements" })
  .option('coin', { type: 'string', demandOption: true, describe: "Coin (uppercase)" })
  .option('product-id', { type: 'string', demandOption: true, describe: "Product ID" })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "Custom order ID for replay prevention; must be unique within 30 minutes" })
  .option('redeem-position-id', { type: 'string', describe: "Position ID for redeeming non-LST OnChain products" })
  .option('to-account-type', { type: 'string', choices: ['FUND', 'UNIFIED'], describe: "Target account type for redeemed funds" })
  .option('interest-card', { type: 'string' })
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
  path: '/v5/earn/place-order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/place-order',
    
    body: { category: argv['category'], orderType: argv['order-type'], accountType: argv['account-type'], amount: argv['amount'], coin: argv['coin'], productId: argv['product-id'], orderLinkId: argv['order-link-id'], redeemPositionId: argv['redeem-position-id'], toAccountType: argv['to-account-type'], interestCard: argv['interest-card'] },
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
    operation: 'earn place-earn-order',
    method: 'POST',
    path: '/v5/earn/place-order',
    params: argv,
  })
  return innerHandler(argv)
}
