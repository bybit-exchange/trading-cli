// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'post-crypto-loan-fixed-supply-order-cancel'
export const describe = "Cancel Supply Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "Supply order ID to cancel",
      
    },
    'refunded-account': {
      type: 'integer',
      description: "Where to refund the funds after cancellation (only effective when the order was placed from flexible savings):\n- `0`: Redeem to funding account (default)\n- `1`: Keep in flexible savings (unfreeze)\n",
      enum: ['0', '1'],
    }
  },
  required: ['order-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', demandOption: true, describe: "Supply order ID to cancel" })
  .option('refunded-account', { type: 'number', choices: ['0', '1'], describe: "Where to refund the funds after cancellation (only effective when the order was placed from flexible savings):\n- `0`: Redeem to funding account (default)\n- `1`: Keep in flexible savings (unfreeze)\n" })
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
  path: '/v5/crypto-loan-fixed/supply-order-cancel',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/crypto-loan-fixed/supply-order-cancel',
    
    body: { orderId: argv['order-id'], refundedAccount: argv['refunded-account'] },
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
    operation: 'crypto-loan-fixed post-crypto-loan-fixed-supply-order-cancel',
    method: 'POST',
    path: '/v5/crypto-loan-fixed/supply-order-cancel',
    params: argv,
  })
  return innerHandler(argv)
}
