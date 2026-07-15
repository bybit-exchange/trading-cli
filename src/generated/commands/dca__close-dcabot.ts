// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'close-dcabot'
export const describe = "Close a running DCA bot with a specified settlement mode"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'bot_id': {
      type: 'integer',
      description: "DCA bot ID to close.",
      
    },
    'close_mode': {
      type: 'integer',
      description: "Asset settlement mode on close",
      enum: ['1', '2', '3'],
    }
  },
  required: ['bot_id', 'close_mode'],
} as const

export const builder = (yargs: any) => yargs
  .option('bot_id', { type: 'number', demandOption: true, describe: "DCA bot ID to close." })
  .option('close_mode', { type: 'number', choices: ['1', '2', '3'], demandOption: true, describe: "Asset settlement mode on close" })
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
  path: '/v5/dca/close-bot',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/dca/close-bot',
    
    body: { bot_id: argv['bot_id'], close_mode: argv['close_mode'] },
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
    operation: 'dca close-dcabot',
    method: 'POST',
    path: '/v5/dca/close-bot',
    params: argv,
  })
  return innerHandler(argv)
}
