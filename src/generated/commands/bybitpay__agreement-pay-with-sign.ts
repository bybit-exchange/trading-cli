// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'agreement-pay-with-sign'
export const describe = "Pay with Sign (One-Step)"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'merchant_id': {
      type: 'string',
      description: "Merchant ID",
      
    },
    'user_id': {
      type: 'string',
      description: "Platform user ID",
      
    },
    'agreement_type': {
      type: 'string',
      description: "Agreement type:\n- `CYCLE`: Periodic deduction (recurring subscription)\n- `NON_CYCLE`: Non-periodic deduction (on-demand)\n- `SINGLE`: Single authorization (one-time)\n",
      enum: ['CYCLE', 'NON_CYCLE', 'SINGLE'],
    },
    'sign_params': {
      type: 'string',
      
      
    },
    'pay_params': {
      type: 'string',
      
      
    }
  },
  required: ['merchant_id', 'user_id', 'agreement_type', 'pay_params'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', demandOption: true, describe: "Platform user ID" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], demandOption: true, describe: "Agreement type:\n- `CYCLE`: Periodic deduction (recurring subscription)\n- `NON_CYCLE`: Non-periodic deduction (on-demand)\n- `SINGLE`: Single authorization (one-time)\n" })
  .option('sign_params', { type: 'string' })
  .option('pay_params', { type: 'string', demandOption: true })
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
  path: '/v5/bybitpay/agreement/pay-with-sign',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/agreement/pay-with-sign',
    
    body: { merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], sign_params: argv['sign_params'], pay_params: argv['pay_params'] },
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
    operation: 'bybitpay agreement-pay-with-sign',
    method: 'POST',
    path: '/v5/bybitpay/agreement/pay-with-sign',
    params: argv,
  })
  return innerHandler(argv)
}
