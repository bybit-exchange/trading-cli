// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-payout'
export const describe = "Payout"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'merchant-id': {
      type: 'string',
      description: "Onboarding merchant UID",
      
    },
    'merchant-name': {
      type: 'string',
      description: "Merchant name",
      
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
      description: "Merchant-defined order number; must be globally unique",
      
    },
    'amount': {
      type: 'string',
      description: "Payout amount",
      
    },
    'currency': {
      type: 'string',
      description: "Payout currency (uppercase), e.g. `USDT`",
      
    },
    'currency-type': {
      type: 'string',
      description: "Currency type",
      enum: ['fiat', 'crypto'],
    },
    'combined': {
      type: 'boolean',
      description: "Whether combined payment is supported — when `true`, other crypto assets can be exchanged to cover a USDT shortfall; default `false`",
      
    },
    'webhook-url': {
      type: 'string',
      description: "Callback URL invoked when the payout status changes (optional)",
      
    },
    'payee': {
      type: 'string',
      
      
    },
    'env': {
      type: 'string',
      
      
    },
    'risk-info': {
      type: 'string',
      
      
    },
    'mcc-code': {
      type: 'string',
      description: "Merchant category code per ISO 18245:2023",
      
    }
  },
  required: ['merchant-id', 'payment-type', 'merchant-trade-no', 'amount', 'currency', 'currency-type', 'payee', 'env', 'mcc-code'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant-id', { type: 'string', demandOption: true, describe: "Onboarding merchant UID" })
  .option('merchant-name', { type: 'string', describe: "Merchant name" })
  .option('client-id', { type: 'string', describe: "Merchant client ID" })
  .option('payment-type', { type: 'string', choices: ['E_COMMERCE', 'E_COMMERCE_REFUND', 'QR_PAY', 'QR_PAY_REFUND', 'MERCHANT_PAYOUT'], demandOption: true, describe: "Payment type:\n- `E_COMMERCE`: Bybit QR Pay for e-commerce\n- `E_COMMERCE_REFUND`: Bybit QR Pay refund for e-commerce\n- `QR_PAY`: Bybit standard QR code payment\n- `QR_PAY_REFUND`: Bybit standard QR code payment refund\n- `MERCHANT_PAYOUT`: Bybit Pay payout initiated by merchant\n" })
  .option('merchant-trade-no', { type: 'string', demandOption: true, describe: "Merchant-defined order number; must be globally unique" })
  .option('amount', { type: 'string', demandOption: true, describe: "Payout amount" })
  .option('currency', { type: 'string', demandOption: true, describe: "Payout currency (uppercase), e.g. `USDT`" })
  .option('currency-type', { type: 'string', choices: ['fiat', 'crypto'], demandOption: true, describe: "Currency type" })
  .option('combined', { type: 'boolean', describe: "Whether combined payment is supported — when `true`, other crypto assets can be exchanged to cover a USDT shortfall; default `false`" })
  .option('webhook-url', { type: 'string', describe: "Callback URL invoked when the payout status changes (optional)" })
  .option('payee', { type: 'string', demandOption: true })
  .option('env', { type: 'string', demandOption: true })
  .option('risk-info', { type: 'string' })
  .option('mcc-code', { type: 'string', demandOption: true, describe: "Merchant category code per ISO 18245:2023" })
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
  path: '/v5/bybitpay/payout',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/payout',
    
    body: { merchantId: argv['merchant-id'], merchantName: argv['merchant-name'], clientId: argv['client-id'], paymentType: argv['payment-type'], merchantTradeNo: argv['merchant-trade-no'], amount: argv['amount'], currency: argv['currency'], currencyType: argv['currency-type'], combined: argv['combined'], webhookUrl: argv['webhook-url'], payee: argv['payee'], env: argv['env'], riskInfo: argv['risk-info'], mccCode: argv['mcc-code'] },
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
    operation: 'bybitpay create-payout',
    method: 'POST',
    path: '/v5/bybitpay/payout',
    params: argv,
  })
  return innerHandler(argv)
}
