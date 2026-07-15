// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'post-crypto-loan-fixed-borrow'
export const describe = "Create Fixed-Term Borrow Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-currency': {
      type: 'string',
      description: "Currency to borrow (e.g., USDT, BTC, ETH)",
      
    },
    'order-amount': {
      type: 'string',
      description: "Amount to borrow (full precision string)",
      
    },
    'annual-rate': {
      type: 'string',
      description: "Annualized interest rate (decimal format, e.g., \"0.073\" = 7.3%).\nMust match available rate from borrow-order-quote endpoint.\n",
      
    },
    'term': {
      type: 'string',
      description: "Loan term in days. Valid values: \"7\", \"14\", \"30\", \"60\", \"90\", \"180\"\n",
      enum: ['7', '14', '30', '60', '90', '180'],
    },
    'auto-repay': {
      type: 'string',
      description: "Auto-repay setting:\n- \"0\": Manual repay\n- \"1\": Auto-repay enabled\n",
      enum: ['0', '1'],
    },
    'collateral-list': {
      type: 'string',
      description: "List of collateral currencies and amounts",
      
    },
    'repay-type': {
      type: 'string',
      description: "Repayment type:\n- \"1\": Normal repay\n",
      
    }
  },
  required: ['order-currency', 'order-amount', 'annual-rate', 'term', 'collateral-list'],
} as const

export const builder = (yargs: any) => yargs
  .option('order-currency', { type: 'string', demandOption: true, describe: "Currency to borrow (e.g., USDT, BTC, ETH)" })
  .option('order-amount', { type: 'string', demandOption: true, describe: "Amount to borrow (full precision string)" })
  .option('annual-rate', { type: 'string', demandOption: true, describe: "Annualized interest rate (decimal format, e.g., \"0.073\" = 7.3%).\nMust match available rate from borrow-order-quote endpoint.\n" })
  .option('term', { type: 'string', choices: ['7', '14', '30', '60', '90', '180'], demandOption: true, describe: "Loan term in days. Valid values: \"7\", \"14\", \"30\", \"60\", \"90\", \"180\"\n" })
  .option('auto-repay', { type: 'string', choices: ['0', '1'], describe: "Auto-repay setting:\n- \"0\": Manual repay\n- \"1\": Auto-repay enabled\n" })
  .option('collateral-list', { type: 'string', demandOption: true, describe: "List of collateral currencies and amounts" })
  .option('repay-type', { type: 'string', describe: "Repayment type:\n- \"1\": Normal repay\n" })
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
  path: '/v5/crypto-loan-fixed/borrow',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/crypto-loan-fixed/borrow',
    
    body: { orderCurrency: argv['order-currency'], orderAmount: argv['order-amount'], annualRate: argv['annual-rate'], term: argv['term'], autoRepay: argv['auto-repay'], collateralList: argv['collateral-list'], repayType: argv['repay-type'] },
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
    operation: 'crypto-loan-fixed post-crypto-loan-fixed-borrow',
    method: 'POST',
    path: '/v5/crypto-loan-fixed/borrow',
    params: argv,
  })
  return innerHandler(argv)
}
