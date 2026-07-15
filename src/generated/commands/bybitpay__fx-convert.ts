// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'fx-convert'
export const describe = "Payment Fx Convert"
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
    'order-amount': {
      type: 'string',
      description: "Order amount",
      
    },
    'order-currency': {
      type: 'string',
      description: "Order currency (uppercase), e.g. `EUR`, `ETH`",
      
    },
    'order-currency-type': {
      type: 'string',
      description: "Order currency type",
      enum: ['fiat', 'crypto'],
    },
    'settle-currency': {
      type: 'string',
      description: "Settlement currency (uppercase), e.g. `USDT`, `USDC`, `BTC`",
      
    },
    'settle-currency-type': {
      type: 'string',
      description: "Settlement currency type",
      enum: ['fiat', 'crypto'],
    }
  },
  required: ['merchant-id', 'payment-type', 'order-amount', 'order-currency', 'order-currency-type', 'settle-currency', 'settle-currency-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant-id', { type: 'string', demandOption: true, describe: "Onboarding merchant UID" })
  .option('merchant-name', { type: 'string', describe: "Merchant name" })
  .option('client-id', { type: 'string', describe: "Merchant client ID" })
  .option('payment-type', { type: 'string', choices: ['E_COMMERCE', 'E_COMMERCE_REFUND', 'QR_PAY', 'QR_PAY_REFUND', 'MERCHANT_PAYOUT'], demandOption: true, describe: "Payment type:\n- `E_COMMERCE`: Bybit QR Pay for e-commerce\n- `E_COMMERCE_REFUND`: Bybit QR Pay refund for e-commerce\n- `QR_PAY`: Bybit standard QR code payment\n- `QR_PAY_REFUND`: Bybit standard QR code payment refund\n- `MERCHANT_PAYOUT`: Bybit Pay payout initiated by merchant\n" })
  .option('order-amount', { type: 'string', demandOption: true, describe: "Order amount" })
  .option('order-currency', { type: 'string', demandOption: true, describe: "Order currency (uppercase), e.g. `EUR`, `ETH`" })
  .option('order-currency-type', { type: 'string', choices: ['fiat', 'crypto'], demandOption: true, describe: "Order currency type" })
  .option('settle-currency', { type: 'string', demandOption: true, describe: "Settlement currency (uppercase), e.g. `USDT`, `USDC`, `BTC`" })
  .option('settle-currency-type', { type: 'string', choices: ['fiat', 'crypto'], demandOption: true, describe: "Settlement currency type" })
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
  path: '/v5/bybitpay/fx/convert',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/bybitpay/fx/convert',
    
    body: { merchantId: argv['merchant-id'], merchantName: argv['merchant-name'], clientId: argv['client-id'], paymentType: argv['payment-type'], orderAmount: argv['order-amount'], orderCurrency: argv['order-currency'], orderCurrencyType: argv['order-currency-type'], settleCurrency: argv['settle-currency'], settleCurrencyType: argv['settle-currency-type'] },
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
    operation: 'bybitpay fx-convert',
    method: 'POST',
    path: '/v5/bybitpay/fx/convert',
    params: argv,
  })
  return innerHandler(argv)
}
