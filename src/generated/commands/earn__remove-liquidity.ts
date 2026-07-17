// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'remove-liquidity'
export const describe = "Remove Liquidity"
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
      description: "Position ID to redeem",
      
    },
    'remove-rate': {
      type: 'integer',
      description: "Redemption percentage (0~100); 0 or omitting means 100% full redemption; valid user-specified range is 1~100",
      
    },
    'remove-type': {
      type: 'string',
      description: "Redemption type:\n- `Normal` (default): proportional redemption of both coins\n- `SingleQuoteCoin`: redeem as quoteCoin only\n- `SingleBaseCoin`: redeem as baseCoin only\n",
      enum: ['Normal', 'SingleQuoteCoin', 'SingleBaseCoin'],
    }
  },
  required: ['product-id', 'order-link-id', 'position-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'string', demandOption: true, describe: "Product ID" })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "User-defined order ID. Used for idempotency. Max 40 characters. Allowed characters: `a-z`, `A-Z`, `0-9`, `-`, `_`.\nOnce used, the same value cannot be reused — resubmission returns an error.\n" })
  .option('position-id', { type: 'string', demandOption: true, describe: "Position ID to redeem" })
  .option('remove-rate', { type: 'number', describe: "Redemption percentage (0~100); 0 or omitting means 100% full redemption; valid user-specified range is 1~100" })
  .option('remove-type', { type: 'string', choices: ['Normal', 'SingleQuoteCoin', 'SingleBaseCoin'], describe: "Redemption type:\n- `Normal` (default): proportional redemption of both coins\n- `SingleQuoteCoin`: redeem as quoteCoin only\n- `SingleBaseCoin`: redeem as baseCoin only\n" })
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
  path: '/v5/earn/liquidity-mining/remove-liquidity',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/liquidity-mining/remove-liquidity',
    
    body: { productId: argv['product-id'], orderLinkId: argv['order-link-id'], positionId: argv['position-id'], removeRate: argv['remove-rate'], removeType: argv['remove-type'] },
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
    operation: 'earn remove-liquidity',
    method: 'POST',
    path: '/v5/earn/liquidity-mining/remove-liquidity',
    params: argv,
  })
  return innerHandler(argv)
}
