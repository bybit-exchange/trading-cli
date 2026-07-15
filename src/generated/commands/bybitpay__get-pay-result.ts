// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-pay-result'
export const describe = "Payment Result"
export const isWriteOp = false

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
      description: "Payment type; pass `E_COMMERCE_REFUND` to query a refund order",
      enum: ['E_COMMERCE', 'E_COMMERCE_REFUND', 'QR_PAY', 'QR_PAY_REFUND', 'MERCHANT_PAYOUT'],
    },
    'merchant-trade-no': {
      type: 'string',
      description: "Merchant order number (merchant refund number when `paymentType=E_COMMERCE_REFUND`); required if `payId` is not provided",
      
    },
    'pay-id': {
      type: 'string',
      description: "Bybit Pay ID (Bybit refund ID when `paymentType=E_COMMERCE_REFUND`); recommended, required if `merchantTradeNo` is not provided",
      
    }
  },
  required: ['merchant-id', 'payment-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant-id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('client-id', { type: 'string', describe: "Merchant client ID" })
  .option('payment-type', { type: 'string', choices: ['E_COMMERCE', 'E_COMMERCE_REFUND', 'QR_PAY', 'QR_PAY_REFUND', 'MERCHANT_PAYOUT'], demandOption: true, describe: "Payment type; pass `E_COMMERCE_REFUND` to query a refund order" })
  .option('merchant-trade-no', { type: 'string', describe: "Merchant order number (merchant refund number when `paymentType=E_COMMERCE_REFUND`); required if `payId` is not provided" })
  .option('pay-id', { type: 'string', describe: "Bybit Pay ID (Bybit refund ID when `paymentType=E_COMMERCE_REFUND`); recommended, required if `merchantTradeNo` is not provided" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  
function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'GET',
  path: '/v5/bybitpay/pay_result',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/bybitpay/pay_result',
    query: filterDefined({ merchantId: argv['merchant-id'], clientId: argv['client-id'], paymentType: argv['payment-type'], merchantTradeNo: argv['merchant-trade-no'], payId: argv['pay-id'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
