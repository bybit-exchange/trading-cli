// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-pay-order'
export const describe = "Payment Creation"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'merchant-id': {
      type: 'string',
      description: "Onboarding merchant UID (KYB-verified merchant)",
      
    },
    'merchant-name': {
      type: 'string',
      description: "Merchant display name; if omitted, the Bybit KYB company name is shown",
      
    },
    'client-id': {
      type: 'string',
      description: "Merchant client ID, used to distinguish different business lines",
      
    },
    'payment-type': {
      type: 'string',
      description: "Payment type:\n- `E_COMMERCE`: Bybit QR Pay for e-commerce\n- `E_COMMERCE_REFUND`: Bybit QR Pay refund for e-commerce\n- `QR_PAY`: Bybit standard QR code payment\n- `QR_PAY_REFUND`: Bybit standard QR code payment refund\n- `MERCHANT_PAYOUT`: Bybit Pay payout initiated by merchant\n",
      enum: ['E_COMMERCE', 'E_COMMERCE_REFUND', 'QR_PAY', 'QR_PAY_REFUND', 'MERCHANT_PAYOUT'],
    },
    'customer': {
      type: 'string',
      
      
    },
    'merchant-trade-no': {
      type: 'string',
      description: "Merchant-defined order number; must be globally unique",
      
    },
    'quotation-id': {
      type: 'string',
      description: "FX pre-quotation ID (returned by `/v5/bybitpay/fx/convert`); pass to lock the exchange rate at order creation",
      
    },
    'goods': {
      type: 'string',
      description: "List of goods descriptions",
      
    },
    'order-amount': {
      type: 'string',
      description: "Order amount",
      
    },
    'currency': {
      type: 'string',
      description: "Order currency (uppercase), e.g. `EUR`, `USD`, `USDT`, `ETH`",
      
    },
    'currency-type': {
      type: 'string',
      description: "Currency type",
      enum: ['fiat', 'crypto'],
    },
    'success-url': {
      type: 'string',
      description: "URL to redirect the user to after a successful payment",
      
    },
    'failed-url': {
      type: 'string',
      description: "URL to redirect the user to after a failed payment",
      
    },
    'webhook-url': {
      type: 'string',
      description: "Merchant URL that Bybit calls when the order status changes",
      
    },
    'order-expire-time': {
      type: 'integer',
      description: "Order expiration time (UTC second timestamp); default is 1 hour, maximum is 1 hour; pass `0` to use the default",
      
    },
    'env': {
      type: 'string',
      
      
    },
    'risk-info': {
      type: 'string',
      
      
    },
    'remark': {
      type: 'string',
      description: "Payment remark",
      
    }
  },
  required: ['merchant-id', 'payment-type', 'merchant-trade-no', 'goods', 'order-amount', 'currency', 'currency-type', 'success-url', 'failed-url', 'webhook-url', 'env'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant-id', { type: 'string', demandOption: true, describe: "Onboarding merchant UID (KYB-verified merchant)" })
  .option('merchant-name', { type: 'string', describe: "Merchant display name; if omitted, the Bybit KYB company name is shown" })
  .option('client-id', { type: 'string', describe: "Merchant client ID, used to distinguish different business lines" })
  .option('payment-type', { type: 'string', choices: ['E_COMMERCE', 'E_COMMERCE_REFUND', 'QR_PAY', 'QR_PAY_REFUND', 'MERCHANT_PAYOUT'], demandOption: true, describe: "Payment type:\n- `E_COMMERCE`: Bybit QR Pay for e-commerce\n- `E_COMMERCE_REFUND`: Bybit QR Pay refund for e-commerce\n- `QR_PAY`: Bybit standard QR code payment\n- `QR_PAY_REFUND`: Bybit standard QR code payment refund\n- `MERCHANT_PAYOUT`: Bybit Pay payout initiated by merchant\n" })
  .option('customer', { type: 'string' })
  .option('merchant-trade-no', { type: 'string', demandOption: true, describe: "Merchant-defined order number; must be globally unique" })
  .option('quotation-id', { type: 'string', describe: "FX pre-quotation ID (returned by `/v5/bybitpay/fx/convert`); pass to lock the exchange rate at order creation" })
  .option('goods', { type: 'string', demandOption: true, describe: "List of goods descriptions" })
  .option('order-amount', { type: 'string', demandOption: true, describe: "Order amount" })
  .option('currency', { type: 'string', demandOption: true, describe: "Order currency (uppercase), e.g. `EUR`, `USD`, `USDT`, `ETH`" })
  .option('currency-type', { type: 'string', choices: ['fiat', 'crypto'], demandOption: true, describe: "Currency type" })
  .option('success-url', { type: 'string', demandOption: true, describe: "URL to redirect the user to after a successful payment" })
  .option('failed-url', { type: 'string', demandOption: true, describe: "URL to redirect the user to after a failed payment" })
  .option('webhook-url', { type: 'string', demandOption: true, describe: "Merchant URL that Bybit calls when the order status changes" })
  .option('order-expire-time', { type: 'number', describe: "Order expiration time (UTC second timestamp); default is 1 hour, maximum is 1 hour; pass `0` to use the default" })
  .option('env', { type: 'string', demandOption: true })
  .option('risk-info', { type: 'string' })
  .option('remark', { type: 'string', describe: "Payment remark" })
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
  path: '/v5/bybitpay/create_pay',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/create_pay',
    
    body: { merchantId: argv['merchant-id'], merchantName: argv['merchant-name'], clientId: argv['client-id'], paymentType: argv['payment-type'], customer: argv['customer'], merchantTradeNo: argv['merchant-trade-no'], quotationId: argv['quotation-id'], goods: argv['goods'], orderAmount: argv['order-amount'], currency: argv['currency'], currencyType: argv['currency-type'], successUrl: argv['success-url'], failedUrl: argv['failed-url'], webhookUrl: argv['webhook-url'], orderExpireTime: argv['order-expire-time'], env: argv['env'], riskInfo: argv['risk-info'], remark: argv['remark'] },
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
    operation: 'bybitpay create-pay-order',
    method: 'POST',
    path: '/v5/bybitpay/create_pay',
    params: argv,
  })
  return innerHandler(argv)
}
