// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'modify-earn-position'
export const describe = "Modify Earn Position"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product category; currently only `OnChain` is supported",
      enum: ['OnChain'],
    },
    'product-id': {
      type: 'integer',
      description: "Product ID, obtained from `GET /v5/earn/product`",
      
    },
    'position-id': {
      type: 'integer',
      description: "Position ID, obtained from `GET /v5/earn/position`",
      
    },
    'auto-reinvest': {
      type: 'integer',
      description: "`0` to disable auto-reinvest; `1` to enable",
      enum: ['0', '1'],
    }
  },
  required: ['category', 'product-id', 'position-id', 'auto-reinvest'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['OnChain'], demandOption: true, describe: "Product category; currently only `OnChain` is supported" })
  .option('product-id', { type: 'number', demandOption: true, describe: "Product ID, obtained from `GET /v5/earn/product`" })
  .option('position-id', { type: 'number', demandOption: true, describe: "Position ID, obtained from `GET /v5/earn/position`" })
  .option('auto-reinvest', { type: 'number', choices: ['0', '1'], demandOption: true, describe: "`0` to disable auto-reinvest; `1` to enable" })
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
  path: '/v5/earn/position/modify',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/position/modify',
    
    body: { category: argv['category'], productId: argv['product-id'], positionId: argv['position-id'], autoReinvest: argv['auto-reinvest'] },
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
    operation: 'earn modify-earn-position',
    method: 'POST',
    path: '/v5/earn/position/modify',
    params: argv,
  })
  return innerHandler(argv)
}
