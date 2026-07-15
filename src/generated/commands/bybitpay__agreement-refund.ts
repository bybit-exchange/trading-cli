// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'agreement-refund'
export const describe = "Deduction Refund"
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
    'trade_no': {
      type: 'string',
      description: "Platform trade number of the original deduction; required if `out_trade_no` is not provided",
      
    },
    'out_trade_no': {
      type: 'string',
      description: "Merchant order number of the original deduction; required if `trade_no` is not provided",
      
    },
    'out_refund_no': {
      type: 'string',
      description: "Merchant refund number; must be unique on the merchant side",
      
    },
    'refund_amount': {
      type: 'string',
      
      
    },
    'refund_reason': {
      type: 'string',
      description: "Refund reason (optional)",
      
    },
    'notify_url': {
      type: 'string',
      description: "Async notification URL for refund result",
      
    }
  },
  required: ['merchant_id', 'user_id', 'agreement_type', 'out_refund_no', 'refund_amount', 'notify_url'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', demandOption: true, describe: "Platform user ID" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], demandOption: true, describe: "Agreement type:\n- `CYCLE`: Periodic deduction (recurring subscription)\n- `NON_CYCLE`: Non-periodic deduction (on-demand)\n- `SINGLE`: Single authorization (one-time)\n" })
  .option('trade_no', { type: 'string', describe: "Platform trade number of the original deduction; required if `out_trade_no` is not provided" })
  .option('out_trade_no', { type: 'string', describe: "Merchant order number of the original deduction; required if `trade_no` is not provided" })
  .option('out_refund_no', { type: 'string', demandOption: true, describe: "Merchant refund number; must be unique on the merchant side" })
  .option('refund_amount', { type: 'string', demandOption: true })
  .option('refund_reason', { type: 'string', describe: "Refund reason (optional)" })
  .option('notify_url', { type: 'string', demandOption: true, describe: "Async notification URL for refund result" })
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
  path: '/v5/bybitpay/agreement/refund',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/agreement/refund',
    
    body: { merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], trade_no: argv['trade_no'], out_trade_no: argv['out_trade_no'], out_refund_no: argv['out_refund_no'], refund_amount: argv['refund_amount'], refund_reason: argv['refund_reason'], notify_url: argv['notify_url'] },
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
    operation: 'bybitpay agreement-refund',
    method: 'POST',
    path: '/v5/bybitpay/agreement/refund',
    params: argv,
  })
  return innerHandler(argv)
}
