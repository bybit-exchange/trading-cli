// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-order'
export const describe = "Create Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['spot', 'linear', 'inverse', 'option'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair or contract name.",
      
    },
    'is-leverage': {
      type: 'integer',
      description: "Whether to borrow (spot margin).\n- `0`: spot trading (default)\n- `1`: margin trading\n",
      enum: ['0', '1'],
    },
    'side': {
      type: 'string',
      description: "Order direction.",
      enum: ['Buy', 'Sell'],
    },
    'order-type': {
      type: 'string',
      description: "Order type.",
      enum: ['Market', 'Limit'],
    },
    'qty': {
      type: 'string',
      description: "Order quantity (positive number as string).\n- Spot: base coin quantity for limit orders; for market orders, see `marketUnit`\n- Linear/Inverse: contract quantity in base coin\n- Options: contract quantity\n",
      
    },
    'market-unit': {
      type: 'string',
      description: "Unit for spot market order quantity.\n- `baseCoin`: qty is in base coin\n- `quoteCoin`: qty is in quote coin\n",
      enum: ['baseCoin', 'quoteCoin'],
    },
    'slippage-tolerance-type': {
      type: 'string',
      description: "Market order slippage tolerance type.",
      enum: ['TickSize', 'Percent'],
    },
    'slippage-tolerance': {
      type: 'string',
      description: "Slippage tolerance value.\n- TickSize: integer 1-10000\n- Percent: 0.01-10, max 2 decimal places\n",
      
    },
    'price': {
      type: 'string',
      description: "Order price. Required for limit orders; ignored for market orders.",
      
    },
    'trigger-direction': {
      type: 'integer',
      description: "Conditional order trigger direction.\n- `1`: triggered when market price rises to triggerPrice\n- `2`: triggered when market price falls to triggerPrice\n",
      enum: ['1', '2'],
    },
    'order-filter': {
      type: 'string',
      description: "Order type filter (spot only).\n- `Order`: normal order (default)\n- `tpslOrder`: TP/SL order\n- `StopOrder`: conditional order\n",
      enum: ['Order', 'tpslOrder', 'StopOrder'],
    },
    'trigger-price': {
      type: 'string',
      description: "Trigger price for conditional or TP/SL orders.",
      
    },
    'trigger-by': {
      type: 'string',
      description: "Price type used to trigger conditional orders.",
      enum: ['LastPrice', 'IndexPrice', 'MarkPrice'],
    },
    'order-iv': {
      type: 'string',
      description: "Implied volatility for option orders. e.g., \"0.1\" means 10%.",
      
    },
    'time-in-force': {
      type: 'string',
      description: "Time-in-force strategy.\n- `GTC`: Good Till Cancel (default for limit orders)\n- `IOC`: Immediate or Cancel (default for market orders)\n- `FOK`: Fill or Kill\n- `PostOnly`: maker-only\n- `RPI`: Retail Price Improvement\n",
      enum: ['GTC', 'IOC', 'FOK', 'PostOnly', 'RPI'],
    },
    'position-idx': {
      type: 'integer',
      description: "Position index (required for hedge mode in linear/inverse).\n- `0`: one-way mode\n- `1`: buy-side (hedge mode)\n- `2`: sell-side (hedge mode)\n",
      enum: ['0', '1', '2'],
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID. Max 36 characters. Required for options.",
      
    },
    'take-profit': {
      type: 'string',
      description: "Take-profit price.",
      
    },
    'stop-loss': {
      type: 'string',
      description: "Stop-loss price.",
      
    },
    'tp-trigger-by': {
      type: 'string',
      description: "Price type to trigger take-profit.",
      enum: ['LastPrice', 'IndexPrice', 'MarkPrice'],
    },
    'sl-trigger-by': {
      type: 'string',
      description: "Price type to trigger stop-loss.",
      enum: ['LastPrice', 'IndexPrice', 'MarkPrice'],
    },
    'reduce-only': {
      type: 'boolean',
      description: "Reduce-only flag. Valid for futures and options.",
      
    },
    'close-on-trigger': {
      type: 'boolean',
      description: "Close-on-trigger flag. Valid for linear/inverse futures.",
      
    },
    'smp-type': {
      type: 'string',
      description: "Self-match prevention execution type.",
      
    },
    'mmp': {
      type: 'boolean',
      description: "Market maker protection flag. Valid for options only.",
      
    },
    'tpsl-mode': {
      type: 'string',
      description: "TP/SL mode.\n- `Full`: entire position TP/SL (market orders only)\n- `Partial`: partial position TP/SL (supports limit orders)\n",
      enum: ['Full', 'Partial'],
    },
    'tp-limit-price': {
      type: 'string',
      description: "Limit price when take-profit is triggered (Partial mode).",
      
    },
    'sl-limit-price': {
      type: 'string',
      description: "Limit price when stop-loss is triggered (Partial mode).",
      
    },
    'tp-order-type': {
      type: 'string',
      description: "Order type for take-profit.",
      enum: ['Market', 'Limit'],
    },
    'sl-order-type': {
      type: 'string',
      description: "Order type for stop-loss.",
      enum: ['Market', 'Limit'],
    },
    'bbo-side-type': {
      type: 'string',
      description: "BBO side type for futures.",
      enum: ['Queue', 'Counterparty'],
    },
    'bbo-level': {
      type: 'string',
      description: "BBO level for futures.",
      enum: ['1', '2', '3', '4', '5'],
    },
    'rpi-taker-access': {
      type: 'boolean',
      description: "Whether OpenAPI orders can take RPI orders.\n- `true`: allows taking RPI orders\n- `false`: does not allow taking RPI orders (default)\n",
      
    }
  },
  required: ['category', 'symbol', 'side', 'order-type', 'qty'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair or contract name." })
  .option('is-leverage', { type: 'number', choices: ['0', '1'], describe: "Whether to borrow (spot margin).\n- `0`: spot trading (default)\n- `1`: margin trading\n" })
  .option('side', { type: 'string', choices: ['Buy', 'Sell'], demandOption: true, describe: "Order direction." })
  .option('order-type', { type: 'string', choices: ['Market', 'Limit'], demandOption: true, describe: "Order type." })
  .option('qty', { type: 'string', demandOption: true, describe: "Order quantity (positive number as string).\n- Spot: base coin quantity for limit orders; for market orders, see `marketUnit`\n- Linear/Inverse: contract quantity in base coin\n- Options: contract quantity\n" })
  .option('market-unit', { type: 'string', choices: ['baseCoin', 'quoteCoin'], describe: "Unit for spot market order quantity.\n- `baseCoin`: qty is in base coin\n- `quoteCoin`: qty is in quote coin\n" })
  .option('slippage-tolerance-type', { type: 'string', choices: ['TickSize', 'Percent'], describe: "Market order slippage tolerance type." })
  .option('slippage-tolerance', { type: 'string', describe: "Slippage tolerance value.\n- TickSize: integer 1-10000\n- Percent: 0.01-10, max 2 decimal places\n" })
  .option('price', { type: 'string', describe: "Order price. Required for limit orders; ignored for market orders." })
  .option('trigger-direction', { type: 'number', choices: ['1', '2'], describe: "Conditional order trigger direction.\n- `1`: triggered when market price rises to triggerPrice\n- `2`: triggered when market price falls to triggerPrice\n" })
  .option('order-filter', { type: 'string', choices: ['Order', 'tpslOrder', 'StopOrder'], describe: "Order type filter (spot only).\n- `Order`: normal order (default)\n- `tpslOrder`: TP/SL order\n- `StopOrder`: conditional order\n" })
  .option('trigger-price', { type: 'string', describe: "Trigger price for conditional or TP/SL orders." })
  .option('trigger-by', { type: 'string', choices: ['LastPrice', 'IndexPrice', 'MarkPrice'], describe: "Price type used to trigger conditional orders." })
  .option('order-iv', { type: 'string', describe: "Implied volatility for option orders. e.g., \"0.1\" means 10%." })
  .option('time-in-force', { type: 'string', choices: ['GTC', 'IOC', 'FOK', 'PostOnly', 'RPI'], describe: "Time-in-force strategy.\n- `GTC`: Good Till Cancel (default for limit orders)\n- `IOC`: Immediate or Cancel (default for market orders)\n- `FOK`: Fill or Kill\n- `PostOnly`: maker-only\n- `RPI`: Retail Price Improvement\n" })
  .option('position-idx', { type: 'number', choices: ['0', '1', '2'], describe: "Position index (required for hedge mode in linear/inverse).\n- `0`: one-way mode\n- `1`: buy-side (hedge mode)\n- `2`: sell-side (hedge mode)\n" })
  .option('order-link-id', { type: 'string', describe: "User-defined order ID. Max 36 characters. Required for options." })
  .option('take-profit', { type: 'string', describe: "Take-profit price." })
  .option('stop-loss', { type: 'string', describe: "Stop-loss price." })
  .option('tp-trigger-by', { type: 'string', choices: ['LastPrice', 'IndexPrice', 'MarkPrice'], describe: "Price type to trigger take-profit." })
  .option('sl-trigger-by', { type: 'string', choices: ['LastPrice', 'IndexPrice', 'MarkPrice'], describe: "Price type to trigger stop-loss." })
  .option('reduce-only', { type: 'boolean', describe: "Reduce-only flag. Valid for futures and options." })
  .option('close-on-trigger', { type: 'boolean', describe: "Close-on-trigger flag. Valid for linear/inverse futures." })
  .option('smp-type', { type: 'string', describe: "Self-match prevention execution type." })
  .option('mmp', { type: 'boolean', describe: "Market maker protection flag. Valid for options only." })
  .option('tpsl-mode', { type: 'string', choices: ['Full', 'Partial'], describe: "TP/SL mode.\n- `Full`: entire position TP/SL (market orders only)\n- `Partial`: partial position TP/SL (supports limit orders)\n" })
  .option('tp-limit-price', { type: 'string', describe: "Limit price when take-profit is triggered (Partial mode)." })
  .option('sl-limit-price', { type: 'string', describe: "Limit price when stop-loss is triggered (Partial mode)." })
  .option('tp-order-type', { type: 'string', choices: ['Market', 'Limit'], describe: "Order type for take-profit." })
  .option('sl-order-type', { type: 'string', choices: ['Market', 'Limit'], describe: "Order type for stop-loss." })
  .option('bbo-side-type', { type: 'string', choices: ['Queue', 'Counterparty'], describe: "BBO side type for futures." })
  .option('bbo-level', { type: 'string', choices: ['1', '2', '3', '4', '5'], describe: "BBO level for futures." })
  .option('rpi-taker-access', { type: 'boolean', describe: "Whether OpenAPI orders can take RPI orders.\n- `true`: allows taking RPI orders\n- `false`: does not allow taking RPI orders (default)\n" })
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
  path: '/v5/order/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/order/create',
    
    body: { category: argv['category'], symbol: argv['symbol'], isLeverage: argv['is-leverage'], side: argv['side'], orderType: argv['order-type'], qty: argv['qty'], marketUnit: argv['market-unit'], slippageToleranceType: argv['slippage-tolerance-type'], slippageTolerance: argv['slippage-tolerance'], price: argv['price'], triggerDirection: argv['trigger-direction'], orderFilter: argv['order-filter'], triggerPrice: argv['trigger-price'], triggerBy: argv['trigger-by'], orderIv: argv['order-iv'], timeInForce: argv['time-in-force'], positionIdx: argv['position-idx'], orderLinkId: argv['order-link-id'], takeProfit: argv['take-profit'], stopLoss: argv['stop-loss'], tpTriggerBy: argv['tp-trigger-by'], slTriggerBy: argv['sl-trigger-by'], reduceOnly: argv['reduce-only'], closeOnTrigger: argv['close-on-trigger'], smpType: argv['smp-type'], mmp: argv['mmp'], tpslMode: argv['tpsl-mode'], tpLimitPrice: argv['tp-limit-price'], slLimitPrice: argv['sl-limit-price'], tpOrderType: argv['tp-order-type'], slOrderType: argv['sl-order-type'], bboSideType: argv['bbo-side-type'], bboLevel: argv['bbo-level'], rpiTakerAccess: argv['rpi-taker-access'] },
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
    operation: 'order create-order',
    method: 'POST',
    path: '/v5/order/create',
    params: argv,
  })
  return innerHandler(argv)
}
