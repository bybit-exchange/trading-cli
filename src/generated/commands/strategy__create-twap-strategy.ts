// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-twap-strategy'
export const describe = "Create TWAP (Time-Weighted Average Price) strategy"
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
      description: "Total quantity to execute across all orders.\nMust be in base currency (e.g., BTC for BTCUSDT).\nWill be split into smaller orders over the duration.\n",
      
    },
    'strategy-type': {
      type: 'string',
      description: "Strategy type identifier",
      enum: ['twap'],
    },
    'duration': {
      type: 'integer',
      description: "Total execution time in seconds.\nThe strategy will split orders evenly across this duration.\nRange: [300, 86400] (5 minutes to 24 hours)\n\n**IMPORTANT:** duration must be divisible by interval.\nExample: duration=600, interval=30 → creates 20 orders\nFor limit orders: recommend ≥300 seconds to allow time for fills\n",
      
    },
    'interval': {
      type: 'integer',
      description: "Time interval between orders in seconds.\nIf not specified, defaults to 30 seconds.\nMinimum: 5 seconds\n\n**IMPORTANT:** duration must be divisible by interval.\nExample: duration=600, interval=30 → creates 20 orders\nNumber of orders = duration / interval\n",
      
    },
    'is-random': {
      type: 'boolean',
      description: "Randomize order timing to avoid detection.\nIf true, actual intervals will vary around the specified interval.\nRecommended: true for anti-pattern detection\n",
      
    },
    'trigger-price': {
      type: 'string',
      description: "Trigger price for conditional execution.\nStrategy will not start until market price reaches this level.\n- Buy side: starts when price drops to triggerPrice\n- Sell side: starts when price rises to triggerPrice\nLeave empty for immediate execution.\n",
      
    },
    'max-chase-price': {
      type: 'string',
      description: "Maximum price protection for limit orders.\nStrategy will stop if price moves beyond this level.\n- Buy side: stop if price exceeds maxChasePrice\n- Sell side: stop if price falls below maxChasePrice\nRequired for price protection on volatile markets.\n",
      
    },
    'chase-distance': {
      type: 'string',
      description: "Absolute price distance from best bid/ask for limit orders.\n- Buy: order price = ask price - chaseDistance\n- Sell: order price = bid price + chaseDistance\nUse this for low liquidity pairs with stable tick sizes.\nMutually exclusive with chasePercentE4.\n",
      
    },
    'chase-percent-e4': {
      type: 'integer',
      description: "Percentage distance from best bid/ask (in basis points, 1/10000).\n- 100 = 1%, 50 = 0.5%, 10 = 0.1%\n- Buy: order price = ask price * (1 - chasePercentE4/10000)\n- Sell: order price = bid price * (1 + chasePercentE4/10000)\nUse this for high liquidity pairs. Recommended: 10-100 (0.1%-1%)\nMutually exclusive with chaseDistance.\n",
      
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
  required: ['category', 'symbol', 'side', 'size', 'strategy-type', 'duration'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['UTA_USDT', 'UTA_USDC', 'UTA_USDC_FUTURE', 'UTA_SPOT', 'UTA_INVERSE', 'UTA_INVERSE_FUTURE', 'UTA_USDT_FUTURE'], demandOption: true, describe: "Product type for the trading pair.\nDetermines which market/account type to use.\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol (e.g., BTCUSDT, ETHUSDT).\nMust be a valid symbol for the specified category.\n" })
  .option('side', { type: 'string', choices: ['Buy', 'Sell'], demandOption: true, describe: "Order direction" })
  .option('size', { type: 'string', demandOption: true, describe: "Total quantity to execute across all orders.\nMust be in base currency (e.g., BTC for BTCUSDT).\nWill be split into smaller orders over the duration.\n" })
  .option('strategy-type', { type: 'string', choices: ['twap'], demandOption: true, describe: "Strategy type identifier" })
  .option('duration', { type: 'number', demandOption: true, describe: "Total execution time in seconds.\nThe strategy will split orders evenly across this duration.\nRange: [300, 86400] (5 minutes to 24 hours)\n\n**IMPORTANT:** duration must be divisible by interval.\nExample: duration=600, interval=30 → creates 20 orders\nFor limit orders: recommend ≥300 seconds to allow time for fills\n" })
  .option('interval', { type: 'number', describe: "Time interval between orders in seconds.\nIf not specified, defaults to 30 seconds.\nMinimum: 5 seconds\n\n**IMPORTANT:** duration must be divisible by interval.\nExample: duration=600, interval=30 → creates 20 orders\nNumber of orders = duration / interval\n" })
  .option('is-random', { type: 'boolean', describe: "Randomize order timing to avoid detection.\nIf true, actual intervals will vary around the specified interval.\nRecommended: true for anti-pattern detection\n" })
  .option('trigger-price', { type: 'string', describe: "Trigger price for conditional execution.\nStrategy will not start until market price reaches this level.\n- Buy side: starts when price drops to triggerPrice\n- Sell side: starts when price rises to triggerPrice\nLeave empty for immediate execution.\n" })
  .option('max-chase-price', { type: 'string', describe: "Maximum price protection for limit orders.\nStrategy will stop if price moves beyond this level.\n- Buy side: stop if price exceeds maxChasePrice\n- Sell side: stop if price falls below maxChasePrice\nRequired for price protection on volatile markets.\n" })
  .option('chase-distance', { type: 'string', describe: "Absolute price distance from best bid/ask for limit orders.\n- Buy: order price = ask price - chaseDistance\n- Sell: order price = bid price + chaseDistance\nUse this for low liquidity pairs with stable tick sizes.\nMutually exclusive with chasePercentE4.\n" })
  .option('chase-percent-e4', { type: 'number', describe: "Percentage distance from best bid/ask (in basis points, 1/10000).\n- 100 = 1%, 50 = 0.5%, 10 = 0.1%\n- Buy: order price = ask price * (1 - chasePercentE4/10000)\n- Sell: order price = bid price * (1 + chasePercentE4/10000)\nUse this for high liquidity pairs. Recommended: 10-100 (0.1%-1%)\nMutually exclusive with chaseDistance.\n" })
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
    
    body: { category: argv['category'], symbol: argv['symbol'], side: argv['side'], size: argv['size'], strategyType: argv['strategy-type'], duration: argv['duration'], interval: argv['interval'], isRandom: argv['is-random'], triggerPrice: argv['trigger-price'], maxChasePrice: argv['max-chase-price'], chaseDistance: argv['chase-distance'], chasePercentE4: argv['chase-percent-e4'], reduceOnly: argv['reduce-only'], positionIdx: argv['position-idx'], leverageType: argv['leverage-type'] },
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
    operation: 'strategy create-twap-strategy',
    method: 'POST',
    path: '/v5/strategy/create',
    params: argv,
  })
  return innerHandler(argv)
}
