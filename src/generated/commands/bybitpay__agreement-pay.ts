// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'agreement-pay'
export const describe = "Agreement Deduction"
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
    'agreement_no': {
      type: 'string',
      description: "Platform agreement number",
      
    },
    'out_trade_no': {
      type: 'string',
      description: "Merchant order number; must be unique on the merchant side",
      
    },
    'scene_code': {
      type: 'string',
      description: "Scene code, e.g. `TAXI`, `SUBSCRIPTION`",
      
    },
    'amount': {
      type: 'string',
      
      
    },
    'order_info': {
      type: 'string',
      
      
    },
    'scene_info': {
      type: 'string',
      
      
    },
    'notify_url': {
      type: 'string',
      description: "Async notification URL for deduction result",
      
    },
    'risk_info': {
      type: 'string',
      
      
    }
  },
  required: ['merchant_id', 'user_id', 'agreement_type', 'agreement_no', 'out_trade_no', 'scene_code', 'amount', 'order_info', 'notify_url'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', demandOption: true, describe: "Platform user ID" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], demandOption: true, describe: "Agreement type:\n- `CYCLE`: Periodic deduction (recurring subscription)\n- `NON_CYCLE`: Non-periodic deduction (on-demand)\n- `SINGLE`: Single authorization (one-time)\n" })
  .option('agreement_no', { type: 'string', demandOption: true, describe: "Platform agreement number" })
  .option('out_trade_no', { type: 'string', demandOption: true, describe: "Merchant order number; must be unique on the merchant side" })
  .option('scene_code', { type: 'string', demandOption: true, describe: "Scene code, e.g. `TAXI`, `SUBSCRIPTION`" })
  .option('amount', { type: 'string', demandOption: true })
  .option('order_info', { type: 'string', demandOption: true })
  .option('scene_info', { type: 'string' })
  .option('notify_url', { type: 'string', demandOption: true, describe: "Async notification URL for deduction result" })
  .option('risk_info', { type: 'string' })
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
  path: '/v5/bybitpay/agreement/pay',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/agreement/pay',
    
    body: { merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], agreement_no: argv['agreement_no'], out_trade_no: argv['out_trade_no'], scene_code: argv['scene_code'], amount: argv['amount'], order_info: argv['order_info'], scene_info: argv['scene_info'], notify_url: argv['notify_url'], risk_info: argv['risk_info'] },
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
    operation: 'bybitpay agreement-pay',
    method: 'POST',
    path: '/v5/bybitpay/agreement/pay',
    params: argv,
  })
  return innerHandler(argv)
}
