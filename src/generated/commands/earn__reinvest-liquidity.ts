// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'reinvest-liquidity'
export const describe = "Reinvest Interest"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'product-id': {
      type: 'string',
      description: "Product ID",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID. Used for idempotency. Max 40 characters. Allowed characters: `a-z`, `A-Z`, `0-9`, `-`, `_`.\nOnce used, the same value cannot be reused — resubmission returns an error.\n",
      
    },
    'position-id': {
      type: 'string',
      description: "Position ID to reinvest",
      
    }
  },
  required: ['product-id', 'order-link-id', 'position-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'string', demandOption: true, describe: "Product ID" })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "User-defined order ID. Used for idempotency. Max 40 characters. Allowed characters: `a-z`, `A-Z`, `0-9`, `-`, `_`.\nOnce used, the same value cannot be reused — resubmission returns an error.\n" })
  .option('position-id', { type: 'string', demandOption: true, describe: "Position ID to reinvest" })
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
  path: '/v5/earn/liquidity-mining/reinvest',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/liquidity-mining/reinvest',
    
    body: { productId: argv['product-id'], orderLinkId: argv['order-link-id'], positionId: argv['position-id'] },
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
    operation: 'earn reinvest-liquidity',
    method: 'POST',
    path: '/v5/earn/liquidity-mining/reinvest',
    params: argv,
  })
  return innerHandler(argv)
}
