// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'place-fixed-term-order'
export const describe = "Place Fixed Term Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-id': {
      type: 'string',
      description: "Product ID",
      
    },
    'category': {
      type: 'string',
      description: "Product category",
      enum: ['FixedTermSaving', 'FundPool', 'FundPoolPremium'],
    },
    'coin': {
      type: 'string',
      description: "Coin name (uppercase), e.g. `BTC`, `ETH`, `USDT`",
      
    },
    'amount': {
      type: 'string',
      description: "Purchase amount (must be > 0), must satisfy product min/max and precision",
      
    },
    'account-type': {
      type: 'string',
      description: "Source account type",
      enum: ['FUND', 'UNIFIED'],
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined idempotent ID; must be unique for specific user and category",
      
    },
    'auto-invest': {
      type: 'boolean',
      description: "Enable auto-reinvestment; only effective when `category` is `FundPool`",
      
    }
  },
  required: ['product-id', 'category', 'coin', 'amount', 'account-type', 'order-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'string', demandOption: true, describe: "Product ID" })
  .option('category', { type: 'string', choices: ['FixedTermSaving', 'FundPool', 'FundPoolPremium'], demandOption: true, describe: "Product category" })
  .option('coin', { type: 'string', demandOption: true, describe: "Coin name (uppercase), e.g. `BTC`, `ETH`, `USDT`" })
  .option('amount', { type: 'string', demandOption: true, describe: "Purchase amount (must be > 0), must satisfy product min/max and precision" })
  .option('account-type', { type: 'string', choices: ['FUND', 'UNIFIED'], demandOption: true, describe: "Source account type" })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "User-defined idempotent ID; must be unique for specific user and category" })
  .option('auto-invest', { type: 'boolean', describe: "Enable auto-reinvestment; only effective when `category` is `FundPool`" })
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
  path: '/v5/earn/fixed-term/place-order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/fixed-term/place-order',
    
    body: { productId: argv['product-id'], category: argv['category'], coin: argv['coin'], amount: argv['amount'], accountType: argv['account-type'], orderLinkId: argv['order-link-id'], autoInvest: argv['auto-invest'] },
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
    operation: 'earn place-fixed-term-order',
    method: 'POST',
    path: '/v5/earn/fixed-term/place-order',
    params: argv,
  })
  return innerHandler(argv)
}
