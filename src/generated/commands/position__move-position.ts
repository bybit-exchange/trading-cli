// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'move-position'
export const describe = "Move positions between UIDs via block trade"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'from-uid': {
      type: 'string',
      description: "Source UID. Must be a unified trading account. Futures positions must be in one-way mode.",
      
    },
    'to-uid': {
      type: 'string',
      description: "Target UID. Must be a unified trading account. Futures positions must be in one-way mode.",
      
    },
    'list': {
      type: 'string',
      description: "Array of position move legs. Maximum 25 per request.",
      
    }
  },
  required: ['from-uid', 'to-uid', 'list'],
} as const

export const builder = (yargs: any) => yargs
  .option('from-uid', { type: 'string', demandOption: true, describe: "Source UID. Must be a unified trading account. Futures positions must be in one-way mode." })
  .option('to-uid', { type: 'string', demandOption: true, describe: "Target UID. Must be a unified trading account. Futures positions must be in one-way mode." })
  .option('list', { type: 'string', demandOption: true, describe: "Array of position move legs. Maximum 25 per request." })
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
  path: '/v5/position/move-positions',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/position/move-positions',
    
    body: { fromUid: argv['from-uid'], toUid: argv['to-uid'], list: argv['list'] },
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
    operation: 'position move-position',
    method: 'POST',
    path: '/v5/position/move-positions',
    params: argv,
  })
  return innerHandler(argv)
}
