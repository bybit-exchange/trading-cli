// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'mock-payment-status'
export const describe = "Payment Status Mock (Sandbox Only)"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'merchant-id': {
      type: 'string',
      description: "Merchant ID",
      
    },
    'client-id': {
      type: 'string',
      description: "Merchant client ID",
      
    },
    'payment-type': {
      type: 'string',
      description: "Payment type:\n- `E_COMMERCE`: Bybit QR Pay for e-commerce\n- `E_COMMERCE_REFUND`: Bybit QR Pay refund for e-commerce\n- `QR_PAY`: Bybit standard QR code payment\n- `QR_PAY_REFUND`: Bybit standard QR code payment refund\n- `MERCHANT_PAYOUT`: Bybit Pay payout initiated by merchant\n",
      enum: ['E_COMMERCE', 'E_COMMERCE_REFUND', 'QR_PAY', 'QR_PAY_REFUND', 'MERCHANT_PAYOUT'],
    },
    'merchant-trade-no': {
      type: 'string',
      description: "Merchant order number; required if `payId` is not provided",
      
    },
    'pay-id': {
      type: 'string',
      description: "Bybit Pay ID; required if `merchantTradeNo` is not provided (recommended)",
      
    },
    'status': {
      type: 'string',
      description: "Target status to transition to. Allowed values:\n- Payment orders: `PAY_SUCCESS`, `TIMEOUT`, `CANCEL`, `PAY_FAILED`\n- Refund orders: `REFUND_SUCCESS`, `REFUND_CANCEL`, `REFUND_FAILED`\n",
      
    }
  },
  required: ['merchant-id', 'payment-type', 'status'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant-id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('client-id', { type: 'string', describe: "Merchant client ID" })
  .option('payment-type', { type: 'string', choices: ['E_COMMERCE', 'E_COMMERCE_REFUND', 'QR_PAY', 'QR_PAY_REFUND', 'MERCHANT_PAYOUT'], demandOption: true, describe: "Payment type:\n- `E_COMMERCE`: Bybit QR Pay for e-commerce\n- `E_COMMERCE_REFUND`: Bybit QR Pay refund for e-commerce\n- `QR_PAY`: Bybit standard QR code payment\n- `QR_PAY_REFUND`: Bybit standard QR code payment refund\n- `MERCHANT_PAYOUT`: Bybit Pay payout initiated by merchant\n" })
  .option('merchant-trade-no', { type: 'string', describe: "Merchant order number; required if `payId` is not provided" })
  .option('pay-id', { type: 'string', describe: "Bybit Pay ID; required if `merchantTradeNo` is not provided (recommended)" })
  .option('status', { type: 'string', demandOption: true, describe: "Target status to transition to. Allowed values:\n- Payment orders: `PAY_SUCCESS`, `TIMEOUT`, `CANCEL`, `PAY_FAILED`\n- Refund orders: `REFUND_SUCCESS`, `REFUND_CANCEL`, `REFUND_FAILED`\n" })
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
  path: '/v5/bybitpay/paystatus/mock',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/paystatus/mock',
    
    body: { merchantId: argv['merchant-id'], clientId: argv['client-id'], paymentType: argv['payment-type'], merchantTradeNo: argv['merchant-trade-no'], payId: argv['pay-id'], status: argv['status'] },
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
    operation: 'bybitpay mock-payment-status',
    method: 'POST',
    path: '/v5/bybitpay/paystatus/mock',
    params: argv,
  })
  return innerHandler(argv)
}
