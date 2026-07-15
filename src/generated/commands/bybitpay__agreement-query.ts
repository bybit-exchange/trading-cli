// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'agreement-query'
export const describe = "Sign Status Query"
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
      description: "Platform agreement number; required if `external_agreement_no` is not provided",
      
    },
    'external_agreement_no': {
      type: 'string',
      description: "Merchant agreement number; required if `agreement_no` is not provided",
      
    }
  },
  required: ['merchant_id', 'user_id', 'agreement_type'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', demandOption: true, describe: "Platform user ID" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], demandOption: true, describe: "Agreement type" })
  .option('agreement_no', { type: 'string', describe: "Platform agreement number; required if `external_agreement_no` is not provided" })
  .option('external_agreement_no', { type: 'string', describe: "Merchant agreement number; required if `agreement_no` is not provided" })
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
  path: '/v5/bybitpay/agreement/query',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/bybitpay/agreement/query',
    query: filterDefined({ merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], agreement_no: argv['agreement_no'], external_agreement_no: argv['external_agreement_no'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
