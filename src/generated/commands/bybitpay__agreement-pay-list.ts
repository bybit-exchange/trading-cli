// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'agreement-pay-list'
export const describe = "Deduction Transaction List"
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
    'agreement_no': {
      type: 'string',
      description: "Platform agreement number",
      
    },
    'record_type': {
      type: 'string',
      description: "Record type; `PAY` for deduction transactions, `REFUND` for refund records",
      enum: ['PAY', 'REFUND'],
    },
    'status': {
      type: 'string',
      description: "Status filter",
      enum: ['SUCCESS', 'FAILED', 'PROCESSING'],
    },
    'start_time': {
      type: 'string',
      description: "Start time (ISO8601 format)",
      
    },
    'end_time': {
      type: 'string',
      description: "End time (ISO8601 format)",
      
    },
    'page_no': {
      type: 'integer',
      description: "Page number; default 1",
      
    },
    'page_size': {
      type: 'integer',
      description: "Page size; default 20, max 100",
      
    }
  },
  required: ['merchant_id', 'user_id', 'agreement_type', 'agreement_no'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', demandOption: true, describe: "Platform user ID" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], demandOption: true, describe: "Agreement type" })
  .option('agreement_no', { type: 'string', demandOption: true, describe: "Platform agreement number" })
  .option('record_type', { type: 'string', choices: ['PAY', 'REFUND'], describe: "Record type; `PAY` for deduction transactions, `REFUND` for refund records" })
  .option('status', { type: 'string', choices: ['SUCCESS', 'FAILED', 'PROCESSING'], describe: "Status filter" })
  .option('start_time', { type: 'string', describe: "Start time (ISO8601 format)" })
  .option('end_time', { type: 'string', describe: "End time (ISO8601 format)" })
  .option('page_no', { type: 'number', describe: "Page number; default 1" })
  .option('page_size', { type: 'number', describe: "Page size; default 20, max 100" })
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
  path: '/v5/bybitpay/agreement/pay/list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/bybitpay/agreement/pay/list',
    query: filterDefined({ merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], agreement_no: argv['agreement_no'], record_type: argv['record_type'], status: argv['status'], start_time: argv['start_time'], end_time: argv['end_time'], page_no: argv['page_no'], page_size: argv['page_size'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
