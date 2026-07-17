// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'post-crypto-loan-fixed-repay-collateral'
export const describe = "Repay with Collateral"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'loan-id': {
      type: 'integer',
      description: "Loan contract ID",
      
    },
    'loan-currency': {
      type: 'string',
      description: "Loan currency",
      
    },
    'collateral-coin': {
      type: 'string',
      description: "Collateral currency to use for repayment",
      
    },
    'amount': {
      type: 'string',
      description: "Amount of collateral to convert",
      
    }
  },
  required: ['loan-id', 'loan-currency', 'collateral-coin', 'amount'],
} as const

export const builder = (yargs: any) => yargs
  .option('loan-id', { type: 'number', demandOption: true, describe: "Loan contract ID" })
  .option('loan-currency', { type: 'string', demandOption: true, describe: "Loan currency" })
  .option('collateral-coin', { type: 'string', demandOption: true, describe: "Collateral currency to use for repayment" })
  .option('amount', { type: 'string', demandOption: true, describe: "Amount of collateral to convert" })
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
  path: '/v5/crypto-loan-fixed/repay-collateral',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/crypto-loan-fixed/repay-collateral',
    
    body: { loanId: argv['loan-id'], loanCurrency: argv['loan-currency'], collateralCoin: argv['collateral-coin'], amount: argv['amount'] },
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
    operation: 'crypto-loan-fixed post-crypto-loan-fixed-repay-collateral',
    method: 'POST',
    path: '/v5/crypto-loan-fixed/repay-collateral',
    params: argv,
  })
  return innerHandler(argv)
}
