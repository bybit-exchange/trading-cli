// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'pre-check-order'
export const describe = "Pre-check Order"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type. Only futures (linear) and options are supported.",
      enum: ['linear', 'option'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair or contract name.",
      
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
      description: "Order quantity.",
      
    },
    'price': {
      type: 'string',
      description: "Order price. Required for limit orders.",
      
    },
    'is-leverage': {
      type: 'integer',
      description: "Leverage flag.",
      enum: ['0', '1'],
    },
    'time-in-force': {
      type: 'string',
      description: "Time-in-force strategy.",
      enum: ['GTC', 'IOC', 'FOK', 'PostOnly'],
    },
    'position-idx': {
      type: 'integer',
      description: "Position index for hedge mode.",
      enum: ['0', '1', '2'],
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID. Required for options.",
      
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
      description: "TP trigger price type.",
      enum: ['LastPrice', 'IndexPrice', 'MarkPrice'],
    },
    'sl-trigger-by': {
      type: 'string',
      description: "SL trigger price type.",
      enum: ['LastPrice', 'IndexPrice', 'MarkPrice'],
    },
    'reduce-only': {
      type: 'boolean',
      description: "Reduce-only flag.",
      
    },
    'tpsl-mode': {
      type: 'string',
      description: "TP/SL mode.",
      enum: ['Full', 'Partial'],
    },
    'tp-limit-price': {
      type: 'string',
      description: "Limit price after TP triggers.",
      
    },
    'sl-limit-price': {
      type: 'string',
      description: "Limit price after SL triggers.",
      
    },
    'tp-order-type': {
      type: 'string',
      description: "TP order type.",
      enum: ['Market', 'Limit'],
    },
    'sl-order-type': {
      type: 'string',
      description: "SL order type.",
      enum: ['Market', 'Limit'],
    },
    'order-iv': {
      type: 'string',
      description: "Implied volatility (option only).",
      
    }
  },
  required: ['category', 'symbol', 'side', 'order-type', 'qty'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'option'], demandOption: true, describe: "Product type. Only futures (linear) and options are supported." })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair or contract name." })
  .option('side', { type: 'string', choices: ['Buy', 'Sell'], demandOption: true, describe: "Order direction." })
  .option('order-type', { type: 'string', choices: ['Market', 'Limit'], demandOption: true, describe: "Order type." })
  .option('qty', { type: 'string', demandOption: true, describe: "Order quantity." })
  .option('price', { type: 'string', describe: "Order price. Required for limit orders." })
  .option('is-leverage', { type: 'number', choices: ['0', '1'], describe: "Leverage flag." })
  .option('time-in-force', { type: 'string', choices: ['GTC', 'IOC', 'FOK', 'PostOnly'], describe: "Time-in-force strategy." })
  .option('position-idx', { type: 'number', choices: ['0', '1', '2'], describe: "Position index for hedge mode." })
  .option('order-link-id', { type: 'string', describe: "User-defined order ID. Required for options." })
  .option('take-profit', { type: 'string', describe: "Take-profit price." })
  .option('stop-loss', { type: 'string', describe: "Stop-loss price." })
  .option('tp-trigger-by', { type: 'string', choices: ['LastPrice', 'IndexPrice', 'MarkPrice'], describe: "TP trigger price type." })
  .option('sl-trigger-by', { type: 'string', choices: ['LastPrice', 'IndexPrice', 'MarkPrice'], describe: "SL trigger price type." })
  .option('reduce-only', { type: 'boolean', describe: "Reduce-only flag." })
  .option('tpsl-mode', { type: 'string', choices: ['Full', 'Partial'], describe: "TP/SL mode." })
  .option('tp-limit-price', { type: 'string', describe: "Limit price after TP triggers." })
  .option('sl-limit-price', { type: 'string', describe: "Limit price after SL triggers." })
  .option('tp-order-type', { type: 'string', choices: ['Market', 'Limit'], describe: "TP order type." })
  .option('sl-order-type', { type: 'string', choices: ['Market', 'Limit'], describe: "SL order type." })
  .option('order-iv', { type: 'string', describe: "Implied volatility (option only)." })
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
  path: '/v5/order/pre-check',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/order/pre-check',
    
    body: { category: argv['category'], symbol: argv['symbol'], side: argv['side'], orderType: argv['order-type'], qty: argv['qty'], price: argv['price'], isLeverage: argv['is-leverage'], timeInForce: argv['time-in-force'], positionIdx: argv['position-idx'], orderLinkId: argv['order-link-id'], takeProfit: argv['take-profit'], stopLoss: argv['stop-loss'], tpTriggerBy: argv['tp-trigger-by'], slTriggerBy: argv['sl-trigger-by'], reduceOnly: argv['reduce-only'], tpslMode: argv['tpsl-mode'], tpLimitPrice: argv['tp-limit-price'], slLimitPrice: argv['sl-limit-price'], tpOrderType: argv['tp-order-type'], slOrderType: argv['sl-order-type'], orderIv: argv['order-iv'] },
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
    operation: 'order pre-check-order',
    method: 'POST',
    path: '/v5/order/pre-check',
    params: argv,
  })
  return innerHandler(argv)
}
