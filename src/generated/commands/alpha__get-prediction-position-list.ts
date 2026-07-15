// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-prediction-position-list'
export const describe = "Get user's current open prediction market positions"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'limit': {
      type: 'integer',
      description: "Number of records per page.",
      
    },
    'page-index': {
      type: 'integer',
      description: "Page number starting from 1.",
      
    },
    'direction': {
      type: 'string',
      description: "Pagination cursor direction.",
      enum: ['prev', 'next'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('limit', { type: 'number', describe: "Number of records per page." })
  .option('page-index', { type: 'number', describe: "Page number starting from 1." })
  .option('direction', { type: 'string', choices: ['prev', 'next'], describe: "Pagination cursor direction." })
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
  path: '/v5/alpha/prediction/position-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/prediction/position-list',
    
    body: { limit: argv['limit'], pageIndex: argv['page-index'], direction: argv['direction'] },
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
    operation: 'alpha get-prediction-position-list',
    method: 'POST',
    path: '/v5/alpha/prediction/position-list',
    params: argv,
  })
  return innerHandler(argv)
}
