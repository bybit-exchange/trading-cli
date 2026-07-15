// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'post-crypto-loan-flexible-borrow'
export const describe = "Create Flexible Borrow Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'loan-currency': {
      type: 'string',
      description: "Currency to borrow (e.g., USDT, BTC, ETH)",
      
    },
    'loan-amount': {
      type: 'string',
      description: "Amount to borrow (full precision string)",
      
    },
    'collateral-list': {
      type: 'string',
      description: "List of collateral currencies and amounts",
      
    }
  },
  required: ['loan-currency', 'loan-amount', 'collateral-list'],
} as const

export const builder = (yargs: any) => yargs
  .option('loan-currency', { type: 'string', demandOption: true, describe: "Currency to borrow (e.g., USDT, BTC, ETH)" })
  .option('loan-amount', { type: 'string', demandOption: true, describe: "Amount to borrow (full precision string)" })
  .option('collateral-list', { type: 'string', demandOption: true, describe: "List of collateral currencies and amounts" })
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
  path: '/v5/crypto-loan-flexible/borrow',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/crypto-loan-flexible/borrow',
    
    body: { loanCurrency: argv['loan-currency'], loanAmount: argv['loan-amount'], collateralList: argv['collateral-list'] },
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
    operation: 'crypto-loan-flexible post-crypto-loan-flexible-borrow',
    method: 'POST',
    path: '/v5/crypto-loan-flexible/borrow',
    params: argv,
  })
  return innerHandler(argv)
}
