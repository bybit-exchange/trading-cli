// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-lporder-list'
export const describe = "Get LP order history with status and execution details"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-type': {
      type: 'integer',
      description: "Filter by order type.\n- `0`: All (default)\n- `1`: Stake\n- `2`: Redeem\n",
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
      description: "Query last N days.",
      
    },
    'limit': {
      type: 'integer',
      description: "Results per page.",
      
    },
    'page-index': {
      type: 'integer',
      description: "Page number (1-based).",
      
    },
    'pool-address': {
      type: 'string',
      description: "Filter by pool address.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-type', { type: 'number', choices: ['0', '1', '2'], describe: "Filter by order type.\n- `0`: All (default)\n- `1`: Stake\n- `2`: Redeem\n" })
  .option('token-code', { type: 'string', describe: "Filter by token code." })
  .option('order-status', { type: 'string', describe: "Filter by order status (multiple values allowed).\n- `1`: Processing\n- `2`: Success\n- `3`: Failed\n" })
  .option('days', { type: 'number', describe: "Query last N days." })
  .option('limit', { type: 'number', describe: "Results per page." })
  .option('page-index', { type: 'number', describe: "Page number (1-based)." })
  .option('pool-address', { type: 'string', describe: "Filter by pool address." })
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
  path: '/v5/alpha/lp/order-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/lp/order-list',
    
    body: { orderType: argv['order-type'], tokenCode: argv['token-code'], orderStatus: argv['order-status'], days: argv['days'], limit: argv['limit'], pageIndex: argv['page-index'], poolAddress: argv['pool-address'] },
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
    operation: 'alpha get-lporder-list',
    method: 'POST',
    path: '/v5/alpha/lp/order-list',
    params: argv,
  })
  return innerHandler(argv)
}
