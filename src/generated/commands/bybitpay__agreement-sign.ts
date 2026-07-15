// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'agreement-sign'
export const describe = "Sign Request"
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
      description: "Platform user ID (Bybit user identifier)",
      
    },
    'agreement_type': {
      type: 'string',
      description: "Agreement type:\n- `CYCLE`: Periodic deduction (recurring subscription)\n- `NON_CYCLE`: Non-periodic deduction (on-demand)\n- `SINGLE`: Single authorization (one-time)\n",
      enum: ['CYCLE', 'NON_CYCLE', 'SINGLE'],
    },
    'merchant_user_id': {
      type: 'string',
      description: "Merchant-side user ID (used for mapping between merchant and platform)",
      
    },
    'scene_code': {
      type: 'string',
      description: "Scene code (see appendix 7.1), e.g. `TAXI`, `SUBSCRIPTION`, `PARKING`",
      
    },
    'product_code': {
      type: 'string',
      description: "Product code assigned by platform (optional)",
      
    },
    'external_agreement_no': {
      type: 'string',
      description: "Merchant agreement number; must be unique on the merchant side",
      
    },
    'sign_valid_time': {
      type: 'string',
      description: "Agreement validity period (ISO8601 format)",
      
    },
    'single_limit': {
      type: 'string',
      
      
    },
    'period_limits': {
      type: 'string',
      description: "Period amount limit configuration list (supports multiple period types)",
      
    },
    'notify_url': {
      type: 'string',
      description: "Async notification URL for sign result",
      
    },
    'return_url': {
      type: 'string',
      description: "Redirect URL after sign completion (can be omitted for App scan scenarios)",
      
    },
    'sign_expire_minutes': {
      type: 'integer',
      description: "Sign link validity period in minutes; default 30, max 1440 (24 hours)",
      
    },
    'extra_params': {
      type: 'string',
      description: "Extension parameters (JSON object); passed through by platform without processing",
      
    }
  },
  required: ['merchant_id', 'user_id', 'agreement_type', 'merchant_user_id', 'scene_code', 'external_agreement_no', 'notify_url'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', demandOption: true, describe: "Platform user ID (Bybit user identifier)" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], demandOption: true, describe: "Agreement type:\n- `CYCLE`: Periodic deduction (recurring subscription)\n- `NON_CYCLE`: Non-periodic deduction (on-demand)\n- `SINGLE`: Single authorization (one-time)\n" })
  .option('merchant_user_id', { type: 'string', demandOption: true, describe: "Merchant-side user ID (used for mapping between merchant and platform)" })
  .option('scene_code', { type: 'string', demandOption: true, describe: "Scene code (see appendix 7.1), e.g. `TAXI`, `SUBSCRIPTION`, `PARKING`" })
  .option('product_code', { type: 'string', describe: "Product code assigned by platform (optional)" })
  .option('external_agreement_no', { type: 'string', demandOption: true, describe: "Merchant agreement number; must be unique on the merchant side" })
  .option('sign_valid_time', { type: 'string', describe: "Agreement validity period (ISO8601 format)" })
  .option('single_limit', { type: 'string' })
  .option('period_limits', { type: 'string', describe: "Period amount limit configuration list (supports multiple period types)" })
  .option('notify_url', { type: 'string', demandOption: true, describe: "Async notification URL for sign result" })
  .option('return_url', { type: 'string', describe: "Redirect URL after sign completion (can be omitted for App scan scenarios)" })
  .option('sign_expire_minutes', { type: 'number', describe: "Sign link validity period in minutes; default 30, max 1440 (24 hours)" })
  .option('extra_params', { type: 'string', describe: "Extension parameters (JSON object); passed through by platform without processing" })
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
  path: '/v5/bybitpay/agreement/sign',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/agreement/sign',
    
    body: { merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], merchant_user_id: argv['merchant_user_id'], scene_code: argv['scene_code'], product_code: argv['product_code'], external_agreement_no: argv['external_agreement_no'], sign_valid_time: argv['sign_valid_time'], single_limit: argv['single_limit'], period_limits: argv['period_limits'], notify_url: argv['notify_url'], return_url: argv['return_url'], sign_expire_minutes: argv['sign_expire_minutes'], extra_params: argv['extra_params'] },
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
    operation: 'bybitpay agreement-sign',
    method: 'POST',
    path: '/v5/bybitpay/agreement/sign',
    params: argv,
  })
  return innerHandler(argv)
}
