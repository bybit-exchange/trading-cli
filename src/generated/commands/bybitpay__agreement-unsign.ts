// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'agreement-unsign'
export const describe = "Unsign"
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
      description: "Platform agreement number; required if `external_agreement_no` is not provided",
      
    },
    'external_agreement_no': {
      type: 'string',
      description: "Merchant agreement number; required if `agreement_no` is not provided",
      
    },
    'unsign_type': {
      type: 'string',
      description: "Unsign initiator type:\n- `USER`: User actively unsigned\n- `MERCHANT`: Merchant initiated unsign\n- `EXPIRED`: Agreement auto-expired\n- `SYSTEM`: System-triggered unsign\n",
      enum: ['USER', 'MERCHANT', 'EXPIRED', 'SYSTEM'],
    },
    'unsign_reason': {
      type: 'string',
      description: "Reason for unsigning",
      
    }
  },
  required: ['merchant_id', 'user_id', 'agreement_type'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', demandOption: true, describe: "Platform user ID" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], demandOption: true, describe: "Agreement type:\n- `CYCLE`: Periodic deduction (recurring subscription)\n- `NON_CYCLE`: Non-periodic deduction (on-demand)\n- `SINGLE`: Single authorization (one-time)\n" })
  .option('agreement_no', { type: 'string', describe: "Platform agreement number; required if `external_agreement_no` is not provided" })
  .option('external_agreement_no', { type: 'string', describe: "Merchant agreement number; required if `agreement_no` is not provided" })
  .option('unsign_type', { type: 'string', choices: ['USER', 'MERCHANT', 'EXPIRED', 'SYSTEM'], describe: "Unsign initiator type:\n- `USER`: User actively unsigned\n- `MERCHANT`: Merchant initiated unsign\n- `EXPIRED`: Agreement auto-expired\n- `SYSTEM`: System-triggered unsign\n" })
  .option('unsign_reason', { type: 'string', describe: "Reason for unsigning" })
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
  path: '/v5/bybitpay/agreement/unsign',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/agreement/unsign',
    
    body: { merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], agreement_no: argv['agreement_no'], external_agreement_no: argv['external_agreement_no'], unsign_type: argv['unsign_type'], unsign_reason: argv['unsign_reason'] },
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
    operation: 'bybitpay agreement-unsign',
    method: 'POST',
    path: '/v5/bybitpay/agreement/unsign',
    params: argv,
  })
  return innerHandler(argv)
}
