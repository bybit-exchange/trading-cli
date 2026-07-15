// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-chase-order-strategy'
export const describe = "Create Chase Order strategy for dynamic price tracking"
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
      description: "Total quantity to execute.\nMust be in base currency (e.g., BTC for BTCUSDT).\nStrategy will chase price until this full size is filled.\n",
      
    },
    'strategy-type': {
      type: 'string',
      description: "Strategy type identifier",
      enum: ['chaseOrder'],
    },
    'chase-distance': {
      type: 'string',
      description: "Absolute price offset from best bid/ask.\n- Buy: order_price = ask - chaseDistance\n- Sell: order_price = bid + chaseDistance\n\nUse for low liquidity pairs with stable tick size.\nExample: \"0.001\" means 0.001 USDT offset from best price\n\n**Mutually exclusive with chasePercentE4** - choose ONE:\n- Fixed tick size markets → use chaseDistance\n- Percentage-based markets → use chasePercentE4\n\nIf both are provided, chaseDistance takes priority.\n",
      
    },
    'chase-percent-e4': {
      type: 'integer',
      description: "Percentage offset from best bid/ask (in basis points, 1/10000).\n- 100 = 1%, 50 = 0.5%, 10 = 0.1%\n- Buy: order_price = ask × (1 - chasePercentE4/10000)\n- Sell: order_price = bid × (1 + chasePercentE4/10000)\n\nUse for high liquidity pairs like BTC, ETH.\nRecommended range: 10-50 (0.1%-0.5%)\nMaximum value: 1000 (10%)\n\nLower = more aggressive = faster fill but worse price\nHigher = more conservative = better price but slower fill\n\n**Mutually exclusive with chaseDistance** - choose ONE based on your needs.\nIf both are provided, chaseDistance takes priority.\n",
      
    },
    'max-chase-price': {
      type: 'string',
      description: "Maximum acceptable price - for risk control.\nStrategy will PAUSE if market price reaches this level.\n\n- Buy side: Pause if price goes above maxChasePrice\n- Sell side: Pause if price goes below maxChasePrice\n\nThis prevents unlimited slippage in volatile markets.\nOptional but strongly recommended for price protection.\n\nExample: For buy order at 25000, set maxChasePrice to 26000\nmeans \"chase price up to 26000, then pause\"\n",
      
    },
    'trigger-price': {
      type: 'string',
      description: "Trigger price for conditional execution.\nStrategy will not start until market price reaches this level.\n\n- Buy side: starts when price drops to triggerPrice\n- Sell side: starts when price rises to triggerPrice\n\nLeave empty for immediate execution.\nUse for \"start chasing when price reaches X\" scenarios.\n",
      
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
  .option('size', { type: 'string', demandOption: true, describe: "Total quantity to execute.\nMust be in base currency (e.g., BTC for BTCUSDT).\nStrategy will chase price until this full size is filled.\n" })
  .option('strategy-type', { type: 'string', choices: ['chaseOrder'], demandOption: true, describe: "Strategy type identifier" })
  .option('chase-distance', { type: 'string', describe: "Absolute price offset from best bid/ask.\n- Buy: order_price = ask - chaseDistance\n- Sell: order_price = bid + chaseDistance\n\nUse for low liquidity pairs with stable tick size.\nExample: \"0.001\" means 0.001 USDT offset from best price\n\n**Mutually exclusive with chasePercentE4** - choose ONE:\n- Fixed tick size markets → use chaseDistance\n- Percentage-based markets → use chasePercentE4\n\nIf both are provided, chaseDistance takes priority.\n" })
  .option('chase-percent-e4', { type: 'number', describe: "Percentage offset from best bid/ask (in basis points, 1/10000).\n- 100 = 1%, 50 = 0.5%, 10 = 0.1%\n- Buy: order_price = ask × (1 - chasePercentE4/10000)\n- Sell: order_price = bid × (1 + chasePercentE4/10000)\n\nUse for high liquidity pairs like BTC, ETH.\nRecommended range: 10-50 (0.1%-0.5%)\nMaximum value: 1000 (10%)\n\nLower = more aggressive = faster fill but worse price\nHigher = more conservative = better price but slower fill\n\n**Mutually exclusive with chaseDistance** - choose ONE based on your needs.\nIf both are provided, chaseDistance takes priority.\n" })
  .option('max-chase-price', { type: 'string', describe: "Maximum acceptable price - for risk control.\nStrategy will PAUSE if market price reaches this level.\n\n- Buy side: Pause if price goes above maxChasePrice\n- Sell side: Pause if price goes below maxChasePrice\n\nThis prevents unlimited slippage in volatile markets.\nOptional but strongly recommended for price protection.\n\nExample: For buy order at 25000, set maxChasePrice to 26000\nmeans \"chase price up to 26000, then pause\"\n" })
  .option('trigger-price', { type: 'string', describe: "Trigger price for conditional execution.\nStrategy will not start until market price reaches this level.\n\n- Buy side: starts when price drops to triggerPrice\n- Sell side: starts when price rises to triggerPrice\n\nLeave empty for immediate execution.\nUse for \"start chasing when price reaches X\" scenarios.\n" })
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
    
    body: { category: argv['category'], symbol: argv['symbol'], side: argv['side'], size: argv['size'], strategyType: argv['strategy-type'], chaseDistance: argv['chase-distance'], chasePercentE4: argv['chase-percent-e4'], maxChasePrice: argv['max-chase-price'], triggerPrice: argv['trigger-price'], reduceOnly: argv['reduce-only'], positionIdx: argv['position-idx'], leverageType: argv['leverage-type'] },
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
    operation: 'strategy create-chase-order-strategy',
    method: 'POST',
    path: '/v5/strategy/create',
    params: argv,
  })
  return innerHandler(argv)
}
