// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'add-liquidity'
export const describe = "Add Liquidity"
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
    'quote-account-type': {
      type: 'string',
      description: "Source account type for quoteCoin; required when injecting quoteCoin",
      enum: ['FUND', 'UNIFIED'],
    },
    'base-account-type': {
      type: 'string',
      description: "Source account type for baseCoin; required when injecting baseCoin",
      enum: ['FUND', 'UNIFIED'],
    },
    'quote-amount': {
      type: 'string',
      description: "Amount of quoteCoin to inject (decimal string); at least one of `quoteAmount`/`baseAmount` is required",
      
    },
    'base-amount': {
      type: 'string',
      description: "Amount of baseCoin to inject (decimal string); at least one of `quoteAmount`/`baseAmount` is required",
      
    },
    'leverage': {
      type: 'string',
      description: "Leverage multiplier; defaults to `\"1\"` (no leverage)",
      
    }
  },
  required: ['product-id', 'order-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('product-id', { type: 'string', demandOption: true, describe: "Product ID" })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "User-defined order ID. Used for idempotency. Max 40 characters. Allowed characters: `a-z`, `A-Z`, `0-9`, `-`, `_`.\nOnce used, the same value cannot be reused — resubmission returns an error.\n" })
  .option('quote-account-type', { type: 'string', choices: ['FUND', 'UNIFIED'], describe: "Source account type for quoteCoin; required when injecting quoteCoin" })
  .option('base-account-type', { type: 'string', choices: ['FUND', 'UNIFIED'], describe: "Source account type for baseCoin; required when injecting baseCoin" })
  .option('quote-amount', { type: 'string', describe: "Amount of quoteCoin to inject (decimal string); at least one of `quoteAmount`/`baseAmount` is required" })
  .option('base-amount', { type: 'string', describe: "Amount of baseCoin to inject (decimal string); at least one of `quoteAmount`/`baseAmount` is required" })
  .option('leverage', { type: 'string', describe: "Leverage multiplier; defaults to `\"1\"` (no leverage)" })
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
  path: '/v5/earn/liquidity-mining/add-liquidity',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/liquidity-mining/add-liquidity',
    
    body: { productId: argv['product-id'], orderLinkId: argv['order-link-id'], quoteAccountType: argv['quote-account-type'], baseAccountType: argv['base-account-type'], quoteAmount: argv['quote-amount'], baseAmount: argv['base-amount'], leverage: argv['leverage'] },
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
    operation: 'earn add-liquidity',
    method: 'POST',
    path: '/v5/earn/liquidity-mining/add-liquidity',
    params: argv,
  })
  return innerHandler(argv)
}
