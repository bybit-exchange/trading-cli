// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'set-mmp'
export const describe = "Set MMP"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'base-coin': {
      type: 'string',
      description: "Base coin for MMP (e.g., ETH, BTC).",
      
    },
    'window': {
      type: 'string',
      description: "Time window in milliseconds.",
      
    },
    'frozen-period': {
      type: 'string',
      description: "Freeze duration in milliseconds. \"0\" keeps frozen until manual reset.",
      
    },
    'qty-limit': {
      type: 'string',
      description: "Execution quantity limit. Positive number, max 2 decimal places.",
      
    },
    'delta-limit': {
      type: 'string',
      description: "Delta limit. Positive number, max 2 decimal places.",
      
    }
  },
  required: ['base-coin', 'window', 'frozen-period', 'qty-limit', 'delta-limit'],
} as const

export const builder = (yargs: any) => yargs
  .option('base-coin', { type: 'string', demandOption: true, describe: "Base coin for MMP (e.g., ETH, BTC)." })
  .option('window', { type: 'string', demandOption: true, describe: "Time window in milliseconds." })
  .option('frozen-period', { type: 'string', demandOption: true, describe: "Freeze duration in milliseconds. \"0\" keeps frozen until manual reset." })
  .option('qty-limit', { type: 'string', demandOption: true, describe: "Execution quantity limit. Positive number, max 2 decimal places." })
  .option('delta-limit', { type: 'string', demandOption: true, describe: "Delta limit. Positive number, max 2 decimal places." })
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
  path: '/v5/account/mmp-modify',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/account/mmp-modify',
    
    body: { baseCoin: argv['base-coin'], window: argv['window'], frozenPeriod: argv['frozen-period'], qtyLimit: argv['qty-limit'], deltaLimit: argv['delta-limit'] },
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
    operation: 'account set-mmp',
    method: 'POST',
    path: '/v5/account/mmp-modify',
    params: argv,
  })
  return innerHandler(argv)
}
