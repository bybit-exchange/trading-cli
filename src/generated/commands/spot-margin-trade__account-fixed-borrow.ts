// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'account-fixed-borrow'
export const describe = "Fixed-Rate Borrow"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-currency': {
      type: 'string',
      description: "Borrow coin name, uppercase only. e.g. `USDT`, `BTC`.",
      
    },
    'order-amount': {
      type: 'string',
      description: "Borrow amount.",
      
    },
    'annual-rate': {
      type: 'string',
      description: "Annual interest rate. e.g. `0.02` means 2%.",
      
    },
    'term': {
      type: 'string',
      description: "Loan term in days. Supported values: `7`, `14`, `30`, `90`, `180`.",
      enum: ['7', '14', '30', '90', '180'],
    },
    'repay-type': {
      type: 'string',
      description: "Maturity handling type.\n- `1`: Auto-repay at maturity (default)\n- `2`: Convert to flexible-rate (variable-rate) loan at maturity\n",
      enum: ['1', '2'],
    },
    'strategy-type': {
      type: 'string',
      description: "Order strategy.\n- `PARTIAL`: Partial fill or cancel (immediate-or-cancel)\n- `FULL`: Fill or kill (all-or-nothing)\n",
      enum: ['PARTIAL', 'FULL'],
    }
  },
  required: ['order-currency', 'order-amount', 'annual-rate', 'term'],
} as const

export const builder = (yargs: any) => yargs
  .option('order-currency', { type: 'string', demandOption: true, describe: "Borrow coin name, uppercase only. e.g. `USDT`, `BTC`." })
  .option('order-amount', { type: 'string', demandOption: true, describe: "Borrow amount." })
  .option('annual-rate', { type: 'string', demandOption: true, describe: "Annual interest rate. e.g. `0.02` means 2%." })
  .option('term', { type: 'string', choices: ['7', '14', '30', '90', '180'], demandOption: true, describe: "Loan term in days. Supported values: `7`, `14`, `30`, `90`, `180`." })
  .option('repay-type', { type: 'string', choices: ['1', '2'], describe: "Maturity handling type.\n- `1`: Auto-repay at maturity (default)\n- `2`: Convert to flexible-rate (variable-rate) loan at maturity\n" })
  .option('strategy-type', { type: 'string', choices: ['PARTIAL', 'FULL'], describe: "Order strategy.\n- `PARTIAL`: Partial fill or cancel (immediate-or-cancel)\n- `FULL`: Fill or kill (all-or-nothing)\n" })
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
  path: '/v5/spot-margin-trade/fixedborrow',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/spot-margin-trade/fixedborrow',
    
    body: { orderCurrency: argv['order-currency'], orderAmount: argv['order-amount'], annualRate: argv['annual-rate'], term: argv['term'], repayType: argv['repay-type'], strategyType: argv['strategy-type'] },
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
    operation: 'spot-margin-trade account-fixed-borrow',
    method: 'POST',
    path: '/v5/spot-margin-trade/fixedborrow',
    params: argv,
  })
  return innerHandler(argv)
}
