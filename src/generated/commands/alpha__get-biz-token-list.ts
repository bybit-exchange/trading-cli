// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-biz-token-list'
export const describe = "Get on-chain tradable tokens with DEX token codes, risk flags, and order limits"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'token-tag': {
      type: 'integer',
      description: "Token tag filter.\n- `0`: All (no filter, default)\n- `1`: New token sniping\n- `2`: On-chain hot token\n",
      enum: ['0', '1', '2'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('token-tag', { type: 'number', choices: ['0', '1', '2'], describe: "Token tag filter.\n- `0`: All (no filter, default)\n- `1`: New token sniping\n- `2`: On-chain hot token\n" })
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
  path: '/v5/alpha/trade/biz-token-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/trade/biz-token-list',
    
    body: { tokenTag: argv['token-tag'] },
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
    operation: 'alpha get-biz-token-list',
    method: 'POST',
    path: '/v5/alpha/trade/biz-token-list',
    params: argv,
  })
  return innerHandler(argv)
}
