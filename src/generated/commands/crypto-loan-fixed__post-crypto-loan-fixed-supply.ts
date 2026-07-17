// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'post-crypto-loan-fixed-supply'
export const describe = "Create Supply Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-currency': {
      type: 'string',
      description: "Currency to lend",
      
    },
    'order-amount': {
      type: 'string',
      description: "Amount to lend",
      
    },
    'annual-rate': {
      type: 'string',
      description: "Annual interest rate",
      
    },
    'term': {
      type: 'string',
      description: "Term in days (7, 14, 30, 60, 90, 180)",
      
    },
    'available-source': {
      type: 'integer',
      description: "Fund source for supply order:\n- `0`: Funding account (default)\n- `1`: Flexible savings\n- `2`: Mixed (funding account + flexible savings)\n",
      enum: ['0', '1', '2'],
    }
  },
  required: ['order-currency', 'order-amount', 'annual-rate', 'term'],
} as const

export const builder = (yargs: any) => yargs
  .option('order-currency', { type: 'string', demandOption: true, describe: "Currency to lend" })
  .option('order-amount', { type: 'string', demandOption: true, describe: "Amount to lend" })
  .option('annual-rate', { type: 'string', demandOption: true, describe: "Annual interest rate" })
  .option('term', { type: 'string', demandOption: true, describe: "Term in days (7, 14, 30, 60, 90, 180)" })
  .option('available-source', { type: 'number', choices: ['0', '1', '2'], describe: "Fund source for supply order:\n- `0`: Funding account (default)\n- `1`: Flexible savings\n- `2`: Mixed (funding account + flexible savings)\n" })
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
  path: '/v5/crypto-loan-fixed/supply',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/crypto-loan-fixed/supply',
    
    body: { orderCurrency: argv['order-currency'], orderAmount: argv['order-amount'], annualRate: argv['annual-rate'], term: argv['term'], availableSource: argv['available-source'] },
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
    operation: 'crypto-loan-fixed post-crypto-loan-fixed-supply',
    method: 'POST',
    path: '/v5/crypto-loan-fixed/supply',
    params: argv,
  })
  return innerHandler(argv)
}
