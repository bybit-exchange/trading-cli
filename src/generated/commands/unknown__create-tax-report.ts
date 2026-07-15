// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-tax-report'
export const describe = "Create tax report file"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'start-time': {
      type: 'integer',
      description: "Tax report start time (Unix timestamp, seconds)",
      
    },
    'end-time': {
      type: 'integer',
      description: "Tax report end time (Unix timestamp, seconds).\nThe interval from startTime must not exceed 2 months.\n",
      
    },
    'type': {
      type: 'string',
      description: "Tax report file type",
      enum: ['TRADE', 'P&amp;L', 'EARN', 'DEPOSIT&amp;WITHDRAWAL', 'BONUS', 'AIRDROP'],
    },
    'number': {
      type: 'string',
      description: "Sub-category number, used in combination with type",
      
    }
  },
  required: ['start-time', 'end-time', 'type', 'number'],
} as const

export const builder = (yargs: any) => yargs
  .option('start-time', { type: 'number', demandOption: true, describe: "Tax report start time (Unix timestamp, seconds)" })
  .option('end-time', { type: 'number', demandOption: true, describe: "Tax report end time (Unix timestamp, seconds).\nThe interval from startTime must not exceed 2 months.\n" })
  .option('type', { type: 'string', choices: ['TRADE', 'P&amp;L', 'EARN', 'DEPOSIT&amp;WITHDRAWAL', 'BONUS', 'AIRDROP'], demandOption: true, describe: "Tax report file type" })
  .option('number', { type: 'string', demandOption: true, describe: "Sub-category number, used in combination with type" })
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
  path: '/fht/compliance/tax/v3/private/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/fht/compliance/tax/v3/private/create',
    
    body: { startTime: argv['start-time'], endTime: argv['end-time'], type: argv['type'], number: argv['number'] },
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
    operation: 'unknown create-tax-report',
    method: 'POST',
    path: '/fht/compliance/tax/v3/private/create',
    params: argv,
  })
  return innerHandler(argv)
}
