// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'agreement-pay-query'
export const describe = "Transaction / Refund Query (Single)"
export const isWriteOp = false

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
      description: "Agreement type",
      enum: ['CYCLE', 'NON_CYCLE', 'SINGLE'],
    },
    'record_type': {
      type: 'string',
      description: "Record type; `PAY` for deduction transaction, `REFUND` for refund record",
      enum: ['PAY', 'REFUND'],
    },
    'trade_no': {
      type: 'string',
      description: "Platform trade number (used when `record_type=PAY`; either this or `out_trade_no`)",
      
    },
    'out_trade_no': {
      type: 'string',
      description: "Merchant order number (used when `record_type=PAY`; either this or `trade_no`)",
      
    },
    'refund_no': {
      type: 'string',
      description: "Platform refund number (used when `record_type=REFUND`; either this or `out_refund_no`)",
      
    },
    'out_refund_no': {
      type: 'string',
      description: "Merchant refund number (used when `record_type=REFUND`; either this or `refund_no`)",
      
    }
  },
  required: ['merchant_id', 'user_id', 'agreement_type'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', demandOption: true, describe: "Platform user ID" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], demandOption: true, describe: "Agreement type" })
  .option('record_type', { type: 'string', choices: ['PAY', 'REFUND'], describe: "Record type; `PAY` for deduction transaction, `REFUND` for refund record" })
  .option('trade_no', { type: 'string', describe: "Platform trade number (used when `record_type=PAY`; either this or `out_trade_no`)" })
  .option('out_trade_no', { type: 'string', describe: "Merchant order number (used when `record_type=PAY`; either this or `trade_no`)" })
  .option('refund_no', { type: 'string', describe: "Platform refund number (used when `record_type=REFUND`; either this or `out_refund_no`)" })
  .option('out_refund_no', { type: 'string', describe: "Merchant refund number (used when `record_type=REFUND`; either this or `refund_no`)" })
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
  path: '/v5/bybitpay/agreement/pay/query',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/bybitpay/agreement/pay/query',
    query: filterDefined({ merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], record_type: argv['record_type'], trade_no: argv['trade_no'], out_trade_no: argv['out_trade_no'], refund_no: argv['refund_no'], out_refund_no: argv['out_refund_no'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
