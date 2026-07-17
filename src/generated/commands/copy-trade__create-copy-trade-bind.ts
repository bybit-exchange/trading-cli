// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-copy-trade-bind'
export const describe = "Create Copy Trading Classic Follow Binding"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'leader-mark': {
      type: 'string',
      description: "Exact leader identifier used by CopyTrade follow-binding flows.\nThis value must come from a leader discovery or detail API; it should not be inferred from display name alone.\n",
      
    },
    'investment-e8': {
      type: 'string',
      description: "Investment amount in e8 precision.\n\nConstraints:\n- Must be a base-10 integer string\n- Must be at least `100000000` (1 USDT)\n- Must represent a whole-number USDT amount, so the value must be divisible by `100000000`\n\nExample: `10000000000` means 100 USDT.\n",
      
    }
  },
  required: ['leader-mark', 'investment-e8'],
} as const

export const builder = (yargs: any) => yargs
  .option('leader-mark', { type: 'string', demandOption: true, describe: "Exact leader identifier used by CopyTrade follow-binding flows.\nThis value must come from a leader discovery or detail API; it should not be inferred from display name alone.\n" })
  .option('investment-e8', { type: 'string', demandOption: true, describe: "Investment amount in e8 precision.\n\nConstraints:\n- Must be a base-10 integer string\n- Must be at least `100000000` (1 USDT)\n- Must represent a whole-number USDT amount, so the value must be divisible by `100000000`\n\nExample: `10000000000` means 100 USDT.\n" })
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
  path: '/v5/copy-trade/private/follower/trade-setting/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/copy-trade/private/follower/trade-setting/create',
    
    body: { leaderMark: argv['leader-mark'], investmentE8: argv['investment-e8'] },
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
    operation: 'copy-trade create-copy-trade-bind',
    method: 'POST',
    path: '/v5/copy-trade/private/follower/trade-setting/create',
    params: argv,
  })
  return innerHandler(argv)
}
