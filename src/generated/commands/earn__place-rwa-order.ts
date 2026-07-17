// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'place-rwa-order'
export const describe = "Place Order (Stake / Redeem)"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-id': {
      type: 'integer',
      description: "Product ID",
      
    },
    'order-type': {
      type: 'string',
      description: "Order type: Stake (subscription) or Redeem (redemption)",
      enum: ['Stake', 'Redeem'],
    },
    'coin': {
      type: 'string',
      description: "Settlement coin (uppercase), e.g. `USDC`",
      
    },
    'stake-amount': {
      type: 'string',
      description: "Stake amount in settlement coin (decimal string).\n**Required when `orderType=Stake`**, ignored otherwise. Must be a positive number.\n",
      
    },
    'redeem-shares': {
      type: 'string',
      description: "Redeem share quantity (decimal string).\n**Required when `orderType=Redeem`**, ignored otherwise. Must be a positive number.\n",
      
    },
    'account-type': {
      type: 'string',
      description: "Source/destination account; default `FUND`.",
      enum: ['FUND', 'UNIFIED'],
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined idempotency key. **Required**, max 36 characters,\nallowed charset `[a-zA-Z0-9-_]`. Must be unique per UID within\nRWA business scope; reusing a previous value returns `180025`.\n",
      
    }
  },
  required: ['product-id', 'order-type', 'coin', 'order-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'number', demandOption: true, describe: "Product ID" })
  .option('order-type', { type: 'string', choices: ['Stake', 'Redeem'], demandOption: true, describe: "Order type: Stake (subscription) or Redeem (redemption)" })
  .option('coin', { type: 'string', demandOption: true, describe: "Settlement coin (uppercase), e.g. `USDC`" })
  .option('stake-amount', { type: 'string', describe: "Stake amount in settlement coin (decimal string).\n**Required when `orderType=Stake`**, ignored otherwise. Must be a positive number.\n" })
  .option('redeem-shares', { type: 'string', describe: "Redeem share quantity (decimal string).\n**Required when `orderType=Redeem`**, ignored otherwise. Must be a positive number.\n" })
  .option('account-type', { type: 'string', choices: ['FUND', 'UNIFIED'], describe: "Source/destination account; default `FUND`." })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "User-defined idempotency key. **Required**, max 36 characters,\nallowed charset `[a-zA-Z0-9-_]`. Must be unique per UID within\nRWA business scope; reusing a previous value returns `180025`.\n" })
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
  path: '/v5/earn/rwa/place-order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/rwa/place-order',
    
    body: { productId: argv['product-id'], orderType: argv['order-type'], coin: argv['coin'], stakeAmount: argv['stake-amount'], redeemShares: argv['redeem-shares'], accountType: argv['account-type'], orderLinkId: argv['order-link-id'] },
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
    operation: 'earn place-rwa-order',
    method: 'POST',
    path: '/v5/earn/rwa/place-order',
    params: argv,
  })
  return innerHandler(argv)
}
