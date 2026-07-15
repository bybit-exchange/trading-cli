// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'add-reduce-margin'
export const describe = "Manually add or reduce margin for an isolated margin position"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Contract name.",
      
    },
    'margin': {
      type: 'string',
      description: "Margin amount. Positive to add, negative to reduce.\nMaximum 4 decimal places.\n",
      
    },
    'position-idx': {
      type: 'integer',
      description: "Position index. Required in hedge (two-way) mode.\n0: One-way mode\n1: Buy side of hedge mode\n2: Sell side of hedge mode\n",
      enum: ['0', '1', '2'],
    }
  },
  required: ['category', 'symbol', 'margin'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', demandOption: true, describe: "Contract name." })
  .option('margin', { type: 'string', demandOption: true, describe: "Margin amount. Positive to add, negative to reduce.\nMaximum 4 decimal places.\n" })
  .option('position-idx', { type: 'number', choices: ['0', '1', '2'], describe: "Position index. Required in hedge (two-way) mode.\n0: One-way mode\n1: Buy side of hedge mode\n2: Sell side of hedge mode\n" })
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
  path: '/v5/position/add-margin',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/position/add-margin',
    
    body: { category: argv['category'], symbol: argv['symbol'], margin: argv['margin'], positionIdx: argv['position-idx'] },
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
    operation: 'position add-reduce-margin',
    method: 'POST',
    path: '/v5/position/add-margin',
    params: argv,
  })
  return innerHandler(argv)
}
