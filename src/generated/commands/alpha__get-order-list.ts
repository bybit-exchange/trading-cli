// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-order-list'
export const describe = "Get trade order history with status, fees, and execution details"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'trade-type': {
      type: 'integer',
      description: "Filter by trade type.\n- `0`: All (default)\n- `1`: Purchase (buy)\n- `2`: Redeem (sell)\n",
      enum: ['0', '1', '2'],
    },
    'token-code': {
      type: 'string',
      description: "Filter by token code.",
      
    },
    'order-status': {
      type: 'string',
      description: "Filter by order status (multiple values allowed).\n- `1`: Processing\n- `2`: Success\n- `3`: Failed\n",
      
    },
    'days': {
      type: 'integer',
      description: "Query last N days. Maximum 90. `0` means use system default (90 days).",
      
    },
    'limit': {
      type: 'integer',
      description: "Results per page.",
      
    },
    'page-index': {
      type: 'integer',
      description: "Page number (1-based).",
      
    },
    'direction': {
      type: 'string',
      description: "Pagination direction.",
      enum: ['prev', 'next'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('trade-type', { type: 'number', choices: ['0', '1', '2'], describe: "Filter by trade type.\n- `0`: All (default)\n- `1`: Purchase (buy)\n- `2`: Redeem (sell)\n" })
  .option('token-code', { type: 'string', describe: "Filter by token code." })
  .option('order-status', { type: 'string', describe: "Filter by order status (multiple values allowed).\n- `1`: Processing\n- `2`: Success\n- `3`: Failed\n" })
  .option('days', { type: 'number', describe: "Query last N days. Maximum 90. `0` means use system default (90 days)." })
  .option('limit', { type: 'number', describe: "Results per page." })
  .option('page-index', { type: 'number', describe: "Page number (1-based)." })
  .option('direction', { type: 'string', choices: ['prev', 'next'], describe: "Pagination direction." })
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
  path: '/v5/alpha/trade/order-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/trade/order-list',
    
    body: { tradeType: argv['trade-type'], tokenCode: argv['token-code'], orderStatus: argv['order-status'], days: argv['days'], limit: argv['limit'], pageIndex: argv['page-index'], direction: argv['direction'] },
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
    operation: 'alpha get-order-list',
    method: 'POST',
    path: '/v5/alpha/trade/order-list',
    params: argv,
  })
  return innerHandler(argv)
}
