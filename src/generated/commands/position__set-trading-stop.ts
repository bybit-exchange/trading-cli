// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'set-trading-stop'
export const describe = "Set take profit, stop loss, and trailing stop for a position"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type.",
      enum: ['linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Contract name.",
      
    },
    'take-profit': {
      type: 'string',
      description: "Take profit price. Set to \"0\" to cancel.",
      
    },
    'stop-loss': {
      type: 'string',
      description: "Stop loss price. Set to \"0\" to cancel.",
      
    },
    'trailing-stop': {
      type: 'string',
      description: "Trailing stop distance (price gap, not percentage). Set to \"0\" to cancel.",
      
    },
    'tp-trigger-by': {
      type: 'string',
      description: "Price type that triggers take profit.",
      enum: ['MarkPrice', 'IndexPrice', 'LastPrice'],
    },
    'sl-trigger-by': {
      type: 'string',
      description: "Price type that triggers stop loss.",
      enum: ['MarkPrice', 'IndexPrice', 'LastPrice'],
    },
    'active-price': {
      type: 'string',
      description: "Activation price for trailing stop.",
      
    },
    'tpsl-mode': {
      type: 'string',
      description: "TP/SL mode.\nFull: TP/SL applies to the entire position.\nPartial: TP/SL applies to a partial quantity.\n",
      enum: ['Full', 'Partial'],
    },
    'tp-size': {
      type: 'string',
      description: "Take profit size (Partial mode only). Must equal slSize.",
      
    },
    'sl-size': {
      type: 'string',
      description: "Stop loss size (Partial mode only). Must equal tpSize.",
      
    },
    'tp-limit-price': {
      type: 'string',
      description: "Limit order price when take profit is triggered (Partial mode with Limit order only).",
      
    },
    'sl-limit-price': {
      type: 'string',
      description: "Limit order price when stop loss is triggered (Partial mode with Limit order only).",
      
    },
    'tp-order-type': {
      type: 'string',
      description: "Order type when take profit is triggered. Full mode supports Market only.",
      enum: ['Market', 'Limit'],
    },
    'sl-order-type': {
      type: 'string',
      description: "Order type when stop loss is triggered. Full mode supports Market only.",
      enum: ['Market', 'Limit'],
    },
    'position-idx': {
      type: 'integer',
      description: "Position index.\n0: One-way mode\n1: Buy side of hedge mode\n2: Sell side of hedge mode\n",
      enum: ['0', '1', '2'],
    }
  },
  required: ['category', 'symbol', 'tpsl-mode', 'position-idx'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', demandOption: true, describe: "Contract name." })
  .option('take-profit', { type: 'string', describe: "Take profit price. Set to \"0\" to cancel." })
  .option('stop-loss', { type: 'string', describe: "Stop loss price. Set to \"0\" to cancel." })
  .option('trailing-stop', { type: 'string', describe: "Trailing stop distance (price gap, not percentage). Set to \"0\" to cancel." })
  .option('tp-trigger-by', { type: 'string', choices: ['MarkPrice', 'IndexPrice', 'LastPrice'], describe: "Price type that triggers take profit." })
  .option('sl-trigger-by', { type: 'string', choices: ['MarkPrice', 'IndexPrice', 'LastPrice'], describe: "Price type that triggers stop loss." })
  .option('active-price', { type: 'string', describe: "Activation price for trailing stop." })
  .option('tpsl-mode', { type: 'string', choices: ['Full', 'Partial'], demandOption: true, describe: "TP/SL mode.\nFull: TP/SL applies to the entire position.\nPartial: TP/SL applies to a partial quantity.\n" })
  .option('tp-size', { type: 'string', describe: "Take profit size (Partial mode only). Must equal slSize." })
  .option('sl-size', { type: 'string', describe: "Stop loss size (Partial mode only). Must equal tpSize." })
  .option('tp-limit-price', { type: 'string', describe: "Limit order price when take profit is triggered (Partial mode with Limit order only)." })
  .option('sl-limit-price', { type: 'string', describe: "Limit order price when stop loss is triggered (Partial mode with Limit order only)." })
  .option('tp-order-type', { type: 'string', choices: ['Market', 'Limit'], describe: "Order type when take profit is triggered. Full mode supports Market only." })
  .option('sl-order-type', { type: 'string', choices: ['Market', 'Limit'], describe: "Order type when stop loss is triggered. Full mode supports Market only." })
  .option('position-idx', { type: 'number', choices: ['0', '1', '2'], demandOption: true, describe: "Position index.\n0: One-way mode\n1: Buy side of hedge mode\n2: Sell side of hedge mode\n" })
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
  path: '/v5/position/trading-stop',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/position/trading-stop',
    
    body: { category: argv['category'], symbol: argv['symbol'], takeProfit: argv['take-profit'], stopLoss: argv['stop-loss'], trailingStop: argv['trailing-stop'], tpTriggerBy: argv['tp-trigger-by'], slTriggerBy: argv['sl-trigger-by'], activePrice: argv['active-price'], tpslMode: argv['tpsl-mode'], tpSize: argv['tp-size'], slSize: argv['sl-size'], tpLimitPrice: argv['tp-limit-price'], slLimitPrice: argv['sl-limit-price'], tpOrderType: argv['tp-order-type'], slOrderType: argv['sl-order-type'], positionIdx: argv['position-idx'] },
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
    operation: 'position set-trading-stop',
    method: 'POST',
    path: '/v5/position/trading-stop',
    params: argv,
  })
  return innerHandler(argv)
}
