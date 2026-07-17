// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-prediction-price-history'
export const describe = "Get historical price chart data for prediction tokens"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'token-ids': {
      type: 'string',
      description: "Option 1 — List of outcome token IDs. Maximum 20. Mutually exclusive with eventId.",
      
    },
    'event-id': {
      type: 'string',
      description: "Option 2 — Event ID to get price history for all tokens in the event.",
      
    },
    'interval': {
      type: 'string',
      
      
    },
    'fidelity': {
      type: 'integer',
      description: "Minutes between data points. 0 means auto (system default).",
      
    }
  },
  required: ['interval'],
} as const

export const builder = (yargs: any) => yargs
  .option('token-ids', { type: 'string', describe: "Option 1 — List of outcome token IDs. Maximum 20. Mutually exclusive with eventId." })
  .option('event-id', { type: 'string', describe: "Option 2 — Event ID to get price history for all tokens in the event." })
  .option('interval', { type: 'string', demandOption: true })
  .option('fidelity', { type: 'number', describe: "Minutes between data points. 0 means auto (system default)." })
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
  path: '/v5/alpha/prediction/price-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/prediction/price-history',
    
    body: { tokenIds: argv['token-ids'], eventId: argv['event-id'], interval: argv['interval'], fidelity: argv['fidelity'] },
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
    operation: 'alpha get-prediction-price-history',
    method: 'POST',
    path: '/v5/alpha/prediction/price-history',
    params: argv,
  })
  return innerHandler(argv)
}
