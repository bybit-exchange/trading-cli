// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'rec-aurora-creation-aiparams'
export const describe = "Get creation-page AI strategy recommendations"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'biz_type': {
      type: 'integer',
      description: "Strategy business type",
      enum: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair, e.g. BTCUSDT",
      
    }
  },
  required: ['biz_type', 'symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('biz_type', { type: 'number', choices: ['0', '1', '2', '3', '4', '5', '6', '7', '8'], demandOption: true, describe: "Strategy business type" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair, e.g. BTCUSDT" })
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
  path: '/v5/aurora/creation',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/aurora/creation',
    
    body: { biz_type: argv['biz_type'], symbol: argv['symbol'] },
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
    operation: 'aurora rec-aurora-creation-aiparams',
    method: 'POST',
    path: '/v5/aurora/creation',
    params: argv,
  })
  return innerHandler(argv)
}
