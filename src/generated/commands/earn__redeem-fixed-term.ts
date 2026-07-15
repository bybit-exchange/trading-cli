// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'redeem-fixed-term'
export const describe = "Redeem Fixed Term Position"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-id': {
      type: 'string',
      description: "Product ID",
      
    },
    'category': {
      type: 'string',
      description: "Product category",
      enum: ['FixedTermSaving', 'FundPool', 'FundPoolPremium'],
    },
    'position-id': {
      type: 'string',
      description: "Position ID",
      
    }
  },
  required: ['product-id', 'category', 'position-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'string', demandOption: true, describe: "Product ID" })
  .option('category', { type: 'string', choices: ['FixedTermSaving', 'FundPool', 'FundPoolPremium'], demandOption: true, describe: "Product category" })
  .option('position-id', { type: 'string', demandOption: true, describe: "Position ID" })
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
  path: '/v5/earn/fixed-term/redeem',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/fixed-term/redeem',
    
    body: { productId: argv['product-id'], category: argv['category'], positionId: argv['position-id'] },
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
    operation: 'earn redeem-fixed-term',
    method: 'POST',
    path: '/v5/earn/fixed-term/redeem',
    params: argv,
  })
  return innerHandler(argv)
}
