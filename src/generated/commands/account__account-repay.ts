// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'account-repay'
export const describe = "Manual Repay"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin': {
      type: 'string',
      description: "Coin name with liability, uppercase only.\n- If not passed, the system repays all liabilities\n",
      
    },
    'amount': {
      type: 'string',
      description: "Repay amount.\n- If `coin` is not passed, `amount` cannot be passed\n- If `coin` is passed, `amount` is optional; when omitted the full liability for that coin is repaid\n",
      
    },
    'repayment-type': {
      type: 'string',
      description: "Repayment business type.\n- `ALL`: Repay all liabilities (both fixed-rate and flexible-rate)\n- `FIXED`: Repay fixed-rate liabilities only\n- `FLEXIBLE`: Repay flexible-rate (variable-rate) liabilities only (default)\n\nWhen neither `coin` nor `amount` is provided, `repaymentType` must be `ALL`.\n",
      enum: ['ALL', 'FIXED', 'FLEXIBLE'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('coin', { type: 'string', describe: "Coin name with liability, uppercase only.\n- If not passed, the system repays all liabilities\n" })
  .option('amount', { type: 'string', describe: "Repay amount.\n- If `coin` is not passed, `amount` cannot be passed\n- If `coin` is passed, `amount` is optional; when omitted the full liability for that coin is repaid\n" })
  .option('repayment-type', { type: 'string', choices: ['ALL', 'FIXED', 'FLEXIBLE'], describe: "Repayment business type.\n- `ALL`: Repay all liabilities (both fixed-rate and flexible-rate)\n- `FIXED`: Repay fixed-rate liabilities only\n- `FLEXIBLE`: Repay flexible-rate (variable-rate) liabilities only (default)\n\nWhen neither `coin` nor `amount` is provided, `repaymentType` must be `ALL`.\n" })
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
  path: '/v5/account/repay',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/account/repay',
    
    body: { coin: argv['coin'], amount: argv['amount'], repaymentType: argv['repayment-type'] },
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
    operation: 'account account-repay',
    method: 'POST',
    path: '/v5/account/repay',
    params: argv,
  })
  return innerHandler(argv)
}
