// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'ins-loan-association-uid'
export const describe = "Bind/Unbind UID"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'uid': {
      type: 'string',
      description: "The UID to bind or unbind.",
      
    },
    'operate': {
      type: 'string',
      description: "Operation type. `0`: Bind, `1`: Unbind.",
      enum: ['0', '1'],
    }
  },
  required: ['uid', 'operate'],
} as const

export const builder = (yargs: any) => yargs
  .option('uid', { type: 'string', demandOption: true, describe: "The UID to bind or unbind." })
  .option('operate', { type: 'string', choices: ['0', '1'], demandOption: true, describe: "Operation type. `0`: Bind, `1`: Unbind." })
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
  path: '/v5/ins-loan/association-uid',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/ins-loan/association-uid',
    
    body: { uid: argv['uid'], operate: argv['operate'] },
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
    operation: 'ins-loan ins-loan-association-uid',
    method: 'POST',
    path: '/v5/ins-loan/association-uid',
    params: argv,
  })
  return innerHandler(argv)
}
