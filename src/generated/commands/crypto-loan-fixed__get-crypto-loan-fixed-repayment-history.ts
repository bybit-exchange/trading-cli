// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-fixed-repayment-history'
export const describe = "Get Repayment History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'repay-id': {
      type: 'string',
      description: "Repayment ID",
      
    },
    'loan-currency': {
      type: 'string',
      description: "Loan currency filter",
      
    },
    'limit': {
      type: 'integer',
      description: "Page size",
      
    },
    'cursor': {
      type: 'integer',
      description: "Page cursor",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('repay-id', { type: 'string', describe: "Repayment ID" })
  .option('loan-currency', { type: 'string', describe: "Loan currency filter" })
  .option('limit', { type: 'number', describe: "Page size" })
  .option('cursor', { type: 'number', describe: "Page cursor" })
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
  path: '/v5/crypto-loan-fixed/repayment-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-fixed/repayment-history',
    
    body: { repayId: argv['repay-id'], loanCurrency: argv['loan-currency'], limit: argv['limit'], cursor: argv['cursor'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
