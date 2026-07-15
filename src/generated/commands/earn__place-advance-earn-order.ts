// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'place-advance-earn-order'
export const describe = "Place Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product category",
      enum: ['DualAssets', 'SmartLeverage', 'DoubleWin', 'DiscountBuy'],
    },
    'product-id': {
      type: 'integer',
      description: "Product ID",
      
    },
    'order-type': {
      type: 'string',
      description: "Order type. `Stake`: subscribe/open position. `Redeem`: close position (SmartLeverage/DoubleWin only). `DiscountBuy` only supports `Stake`.",
      enum: ['Stake', 'Redeem'],
    },
    'amount': {
      type: 'string',
      description: "Order amount (decimal string), unit is coin. Not required for DoubleWin Redeem orders",
      
    },
    'account-type': {
      type: 'string',
      description: "Account type",
      enum: ['FUND', 'UNIFIED'],
    },
    'coin': {
      type: 'string',
      description: "Coin name. e.g., `USDT` for BuyLow, `BTC` for SellHigh, `USDT` for DiscountBuy",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID. Used for idempotency. Once used for a given category, the same value cannot be reused — resubmission returns an error.\nMax length by category: `DualAssets` and `SmartLeverage` max **36 characters**; `DoubleWin` max **64 characters**; `DiscountBuy` max **40 characters**.\nAllowed characters: `a-z`, `A-Z`, `0-9`, `-`, `_`.\n",
      
    },
    'dual-assets-extra': {
      type: 'string',
      
      
    },
    'interest-card': {
      type: 'string',
      
      
    },
    'smart-leverage-stake-extra': {
      type: 'string',
      
      
    },
    'smart-leverage-redeem-extra': {
      type: 'string',
      
      
    },
    'double-win-stake-extra': {
      type: 'string',
      
      
    },
    'double-win-redeem-extra': {
      type: 'string',
      
      
    },
    'discount-buy-extra': {
      type: 'string',
      
      
    }
  },
  required: ['category', 'product-id', 'order-type', 'amount', 'account-type', 'coin', 'order-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['DualAssets', 'SmartLeverage', 'DoubleWin', 'DiscountBuy'], demandOption: true, describe: "Product category" })
  .option('product-id', { type: 'number', demandOption: true, describe: "Product ID" })
  .option('order-type', { type: 'string', choices: ['Stake', 'Redeem'], demandOption: true, describe: "Order type. `Stake`: subscribe/open position. `Redeem`: close position (SmartLeverage/DoubleWin only). `DiscountBuy` only supports `Stake`." })
  .option('amount', { type: 'string', demandOption: true, describe: "Order amount (decimal string), unit is coin. Not required for DoubleWin Redeem orders" })
  .option('account-type', { type: 'string', choices: ['FUND', 'UNIFIED'], demandOption: true, describe: "Account type" })
  .option('coin', { type: 'string', demandOption: true, describe: "Coin name. e.g., `USDT` for BuyLow, `BTC` for SellHigh, `USDT` for DiscountBuy" })
  .option('order-link-id', { type: 'string', demandOption: true, describe: "User-defined order ID. Used for idempotency. Once used for a given category, the same value cannot be reused — resubmission returns an error.\nMax length by category: `DualAssets` and `SmartLeverage` max **36 characters**; `DoubleWin` max **64 characters**; `DiscountBuy` max **40 characters**.\nAllowed characters: `a-z`, `A-Z`, `0-9`, `-`, `_`.\n" })
  .option('dual-assets-extra', { type: 'string' })
  .option('interest-card', { type: 'string' })
  .option('smart-leverage-stake-extra', { type: 'string' })
  .option('smart-leverage-redeem-extra', { type: 'string' })
  .option('double-win-stake-extra', { type: 'string' })
  .option('double-win-redeem-extra', { type: 'string' })
  .option('discount-buy-extra', { type: 'string' })
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
  path: '/v5/earn/advance/place-order',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/advance/place-order',
    
    body: { category: argv['category'], productId: argv['product-id'], orderType: argv['order-type'], amount: argv['amount'], accountType: argv['account-type'], coin: argv['coin'], orderLinkId: argv['order-link-id'], dualAssetsExtra: argv['dual-assets-extra'], interestCard: argv['interest-card'], smartLeverageStakeExtra: argv['smart-leverage-stake-extra'], smartLeverageRedeemExtra: argv['smart-leverage-redeem-extra'], doubleWinStakeExtra: argv['double-win-stake-extra'], doubleWinRedeemExtra: argv['double-win-redeem-extra'], discountBuyExtra: argv['discount-buy-extra'] },
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
    operation: 'earn place-advance-earn-order',
    method: 'POST',
    path: '/v5/earn/advance/place-order',
    params: argv,
  })
  return innerHandler(argv)
}
