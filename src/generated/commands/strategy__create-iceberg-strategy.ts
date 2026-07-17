// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-iceberg-strategy'
export const describe = "Create Iceberg strategy to hide large order size"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type for the trading pair.\nDetermines which market/account type to use.\n",
      enum: ['UTA_USDT', 'UTA_USDC', 'UTA_USDC_FUTURE', 'UTA_SPOT', 'UTA_INVERSE', 'UTA_INVERSE_FUTURE', 'UTA_USDT_FUTURE'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol (e.g., BTCUSDT, ETHUSDT).\nMust be a valid symbol for the specified category.\n",
      
    },
    'side': {
      type: 'string',
      description: "Order direction",
      enum: ['Buy', 'Sell'],
    },
    'size': {
      type: 'string',
      description: "Total quantity to execute across all child orders.\nMust be in base currency (e.g., BTC for BTCUSDT).\nWill be split into multiple smaller orders.\n",
      
    },
    'strategy-type': {
      type: 'string',
      description: "Strategy type identifier",
      enum: ['iceberg'],
    },
    'sub-size': {
      type: 'string',
      description: "Size of each child order (visible order size).\nNumber of child orders will be: size / subSize\n\nRecommended: 5%-20% of total size\n- Too small: more orders, slower execution, higher fees\n- Too large: less stealth, reveals more of your intent\n\nExample: size=100, subSize=10 → 10 child orders of 10 each\n\nMutually exclusive with orderCount - if both provided, subSize takes precedence.\n",
      
    },
    'order-count': {
      type: 'integer',
      description: "Number of child orders to create.\nSize of each child order will be: size / orderCount\n\nExample: size=100, orderCount=5 → 5 child orders of 20 each\n\nMutually exclusive with subSize - if both provided, subSize takes precedence.\n",
      
    },
    'limit-price': {
      type: 'string',
      description: "Fixed limit price for all child orders.\nAll child orders will use this exact price.\n\nUse when you want a specific execution price and are willing to wait.\nMutually exclusive with chase parameters.\n\nCannot be used together with chaseDistance or chasePercentE4.\n",
      
    },
    'chase-distance': {
      type: 'string',
      description: "Absolute price offset from best bid/ask for each child order.\n- Buy: order_price = ask - chaseDistance\n- Sell: order_price = bid + chaseDistance\n\nSpecial value \"-1\": Use best bid/ask directly (taker order, immediate fill)\n\nUse for low liquidity pairs.\nMutually exclusive with chasePercentE4 and limitPrice.\n",
      
    },
    'chase-percent-e4': {
      type: 'integer',
      description: "Percentage offset from best bid/ask (in basis points, 1/10000).\n- 100 = 1%, 50 = 0.5%, 10 = 0.1%\n- Buy: order_price = ask * (1 - chasePercentE4/10000)\n- Sell: order_price = bid * (1 + chasePercentE4/10000)\n\nRecommended: 50-100 (0.5%-1%) for balance between fill rate and price\nRange: 0-999 (0%-9.99%)\n\nUse for high liquidity pairs.\nMutually exclusive with chaseDistance and limitPrice.\n",
      
    },
    'max-chase-price': {
      type: 'string',
      description: "Maximum acceptable price protection.\nStrategy will pause if market price exceeds this level.\n\n- Buy side: Pause if price goes above maxChasePrice\n- Sell side: Pause if price goes below maxChasePrice\n\nStrongly recommended when using chase pricing.\n",
      
    },
    'post-only': {
      type: 'integer',
      description: "Post-only flag for maker-only orders.\n- 0: Allow taker execution (can match immediately)\n- 1: Maker-only (order will be canceled if it would match immediately)\n\npostOnly=1 benefits:\n- Earn maker fee rebates (negative fees)\n- Ensure you're adding liquidity, not taking it\n\nNote: postOnly=1 orders may not fill if market is moving fast.\n",
      enum: ['0', '1'],
    },
    'reduce-only': {
      type: 'boolean',
      description: "Position reduction only flag.\nIf true, order can only reduce existing position, not increase it.\nRequired: true when closing positions\n",
      
    },
    'position-idx': {
      type: 'integer',
      description: "Position index for hedge mode.\n- 0: One-way mode (single position)\n- 1: Hedge mode - Buy side (long position)\n- 2: Hedge mode - Sell side (short position)\nOnly applicable for derivatives (futures/perpetual).\n",
      enum: ['0', '1', '2'],
    },
    'leverage-type': {
      type: 'integer',
      description: "Leverage type for spot trading.\n- 0: Normal spot trading (no leverage)\n- 1: Spot margin (borrow to trade)\nOnly applicable for category=UTA_SPOT\n",
      enum: ['0', '1'],
    }
  },
  required: ['category', 'symbol', 'side', 'size', 'strategy-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['UTA_USDT', 'UTA_USDC', 'UTA_USDC_FUTURE', 'UTA_SPOT', 'UTA_INVERSE', 'UTA_INVERSE_FUTURE', 'UTA_USDT_FUTURE'], demandOption: true, describe: "Product type for the trading pair.\nDetermines which market/account type to use.\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol (e.g., BTCUSDT, ETHUSDT).\nMust be a valid symbol for the specified category.\n" })
  .option('side', { type: 'string', choices: ['Buy', 'Sell'], demandOption: true, describe: "Order direction" })
  .option('size', { type: 'string', demandOption: true, describe: "Total quantity to execute across all child orders.\nMust be in base currency (e.g., BTC for BTCUSDT).\nWill be split into multiple smaller orders.\n" })
  .option('strategy-type', { type: 'string', choices: ['iceberg'], demandOption: true, describe: "Strategy type identifier" })
  .option('sub-size', { type: 'string', describe: "Size of each child order (visible order size).\nNumber of child orders will be: size / subSize\n\nRecommended: 5%-20% of total size\n- Too small: more orders, slower execution, higher fees\n- Too large: less stealth, reveals more of your intent\n\nExample: size=100, subSize=10 → 10 child orders of 10 each\n\nMutually exclusive with orderCount - if both provided, subSize takes precedence.\n" })
  .option('order-count', { type: 'number', describe: "Number of child orders to create.\nSize of each child order will be: size / orderCount\n\nExample: size=100, orderCount=5 → 5 child orders of 20 each\n\nMutually exclusive with subSize - if both provided, subSize takes precedence.\n" })
  .option('limit-price', { type: 'string', describe: "Fixed limit price for all child orders.\nAll child orders will use this exact price.\n\nUse when you want a specific execution price and are willing to wait.\nMutually exclusive with chase parameters.\n\nCannot be used together with chaseDistance or chasePercentE4.\n" })
  .option('chase-distance', { type: 'string', describe: "Absolute price offset from best bid/ask for each child order.\n- Buy: order_price = ask - chaseDistance\n- Sell: order_price = bid + chaseDistance\n\nSpecial value \"-1\": Use best bid/ask directly (taker order, immediate fill)\n\nUse for low liquidity pairs.\nMutually exclusive with chasePercentE4 and limitPrice.\n" })
  .option('chase-percent-e4', { type: 'number', describe: "Percentage offset from best bid/ask (in basis points, 1/10000).\n- 100 = 1%, 50 = 0.5%, 10 = 0.1%\n- Buy: order_price = ask * (1 - chasePercentE4/10000)\n- Sell: order_price = bid * (1 + chasePercentE4/10000)\n\nRecommended: 50-100 (0.5%-1%) for balance between fill rate and price\nRange: 0-999 (0%-9.99%)\n\nUse for high liquidity pairs.\nMutually exclusive with chaseDistance and limitPrice.\n" })
  .option('max-chase-price', { type: 'string', describe: "Maximum acceptable price protection.\nStrategy will pause if market price exceeds this level.\n\n- Buy side: Pause if price goes above maxChasePrice\n- Sell side: Pause if price goes below maxChasePrice\n\nStrongly recommended when using chase pricing.\n" })
  .option('post-only', { type: 'number', choices: ['0', '1'], describe: "Post-only flag for maker-only orders.\n- 0: Allow taker execution (can match immediately)\n- 1: Maker-only (order will be canceled if it would match immediately)\n\npostOnly=1 benefits:\n- Earn maker fee rebates (negative fees)\n- Ensure you're adding liquidity, not taking it\n\nNote: postOnly=1 orders may not fill if market is moving fast.\n" })
  .option('reduce-only', { type: 'boolean', describe: "Position reduction only flag.\nIf true, order can only reduce existing position, not increase it.\nRequired: true when closing positions\n" })
  .option('position-idx', { type: 'number', choices: ['0', '1', '2'], describe: "Position index for hedge mode.\n- 0: One-way mode (single position)\n- 1: Hedge mode - Buy side (long position)\n- 2: Hedge mode - Sell side (short position)\nOnly applicable for derivatives (futures/perpetual).\n" })
  .option('leverage-type', { type: 'number', choices: ['0', '1'], describe: "Leverage type for spot trading.\n- 0: Normal spot trading (no leverage)\n- 1: Spot margin (borrow to trade)\nOnly applicable for category=UTA_SPOT\n" })
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
  path: '/v5/strategy/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/strategy/create',
    
    body: { category: argv['category'], symbol: argv['symbol'], side: argv['side'], size: argv['size'], strategyType: argv['strategy-type'], subSize: argv['sub-size'], orderCount: argv['order-count'], limitPrice: argv['limit-price'], chaseDistance: argv['chase-distance'], chasePercentE4: argv['chase-percent-e4'], maxChasePrice: argv['max-chase-price'], postOnly: argv['post-only'], reduceOnly: argv['reduce-only'], positionIdx: argv['position-idx'], leverageType: argv['leverage-type'] },
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
    operation: 'strategy create-iceberg-strategy',
    method: 'POST',
    path: '/v5/strategy/create',
    params: argv,
  })
  return innerHandler(argv)
}
