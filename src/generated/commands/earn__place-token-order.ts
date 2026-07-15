// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'place-token-order'
export const describe = "Place Order (Mint/Redeem)"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin': {
      type: 'string',
      description: "Coin name",
      enum: ['BYUSDT'],
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID for idempotency, max 36 characters",
      
    },
    'order-type': {
      type: 'string',
      description: "Order type: Mint (minting), Redeem (redemption)",
      enum: ['Mint', 'Redeem'],
    },
    'amount': {
      type: 'string',
      description: "Order amount (decimal string); Mint: USDT quantity, Redeem: BYUSDT quantity",
      
    },
    'account-type': {
      type: 'string',
      description: "Account type; Mint: FlexibleSaving, Redeem: UNIFIED",
      enum: ['FlexibleSaving', 'UNIFIED'],
    }
  },
  required: ['coin', 'order-link-id', 'order-type', 'amount', 'account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('coin', { type: 'string', choices: ['BYUSDT'], demandOption: true, describe: "Coin name" })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "User-defined order ID for idempotency, max 36 characters" })
  .option('order-type', { type: 'string', choices: ['Mint', 'Redeem'], demandOption: true, describe: "Order type: Mint (minting), Redeem (redemption)" })
  .option('amount', { type: 'string', demandOption: true, describe: "Order amount (decimal string); Mint: USDT quantity, Redeem: BYUSDT quantity" })
  .option('account-type', { type: 'string', choices: ['FlexibleSaving', 'UNIFIED'], demandOption: true, describe: "Account type; Mint: FlexibleSaving, Redeem: UNIFIED" })
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
  path: '/v5/earn/token/place-order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/token/place-order',
    
    body: { coin: argv['coin'], orderLinkId: argv['order-link-id'], orderType: argv['order-type'], amount: argv['amount'], accountType: argv['account-type'] },
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
    operation: 'earn place-token-order',
    method: 'POST',
    path: '/v5/earn/token/place-order',
    params: argv,
  })
  return innerHandler(argv)
}
