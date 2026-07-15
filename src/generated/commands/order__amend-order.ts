// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'amend-order'
export const describe = "Amend Order"
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
    'order-id': {
      type: 'string',
      description: "System-generated order ID. Either `orderId` or `orderLinkId` is required.",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User-defined order ID. Either `orderId` or `orderLinkId` is required.",
      
    },
    'order-iv': {
      type: 'string',
      description: "Implied volatility (option only). Pass actual value, e.g., \"0.1\" for 10%.",
      
    },
    'trigger-price': {
      type: 'string',
      description: "Modified trigger price for conditional orders.\n- Futures: ensure trigger > market price if expecting rise, else trigger < market price\n- Spot: used for stop-loss/take-profit orders\n",
      
    },
    'qty': {
      type: 'string',
      description: "Modified order quantity. Omit if unchanged.",
      
    },
    'price': {
      type: 'string',
      description: "Modified order price. Omit if unchanged.",
      
    },
    'tpsl-mode': {
      type: 'string',
      description: "TP/SL mode (linear/inverse only).\n- `Full`: entire position (market orders only)\n- `Partial`: partial position (supports limit orders)\n",
      enum: ['Full', 'Partial'],
    },
    'take-profit': {
      type: 'string',
      description: "Modified take-profit price. Pass \"0\" to cancel existing TP.",
      
    },
    'stop-loss': {
      type: 'string',
      description: "Modified stop-loss price. Pass \"0\" to cancel existing SL.",
      
    },
    'tp-trigger-by': {
      type: 'string',
      description: "Take-profit trigger price type. Required if modifying TP without prior setting.",
      enum: ['LastPrice', 'IndexPrice', 'MarkPrice'],
    },
    'sl-trigger-by': {
      type: 'string',
      description: "Stop-loss trigger price type. Required if modifying SL without prior setting.",
      enum: ['LastPrice', 'IndexPrice', 'MarkPrice'],
    },
    'trigger-by': {
      type: 'string',
      description: "Trigger price type for conditional orders.",
      enum: ['LastPrice', 'IndexPrice', 'MarkPrice'],
    },
    'tp-limit-price': {
      type: 'string',
      description: "Limit price after take-profit triggers (Partial mode only).",
      
    },
    'sl-limit-price': {
      type: 'string',
      description: "Limit price after stop-loss triggers (Partial mode only).",
      
    }
  },
  required: ['category', 'symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot', 'linear', 'inverse', 'option'], demandOption: true, describe: "Product type." })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair or contract name." })
  .option('order-id', { type: 'string', describe: "System-generated order ID. Either `orderId` or `orderLinkId` is required." })
  .option('order-link-id', { type: 'string', describe: "User-defined order ID. Either `orderId` or `orderLinkId` is required." })
  .option('order-iv', { type: 'string', describe: "Implied volatility (option only). Pass actual value, e.g., \"0.1\" for 10%." })
  .option('trigger-price', { type: 'string', describe: "Modified trigger price for conditional orders.\n- Futures: ensure trigger > market price if expecting rise, else trigger < market price\n- Spot: used for stop-loss/take-profit orders\n" })
  .option('qty', { type: 'string', describe: "Modified order quantity. Omit if unchanged." })
  .option('price', { type: 'string', describe: "Modified order price. Omit if unchanged." })
  .option('tpsl-mode', { type: 'string', choices: ['Full', 'Partial'], describe: "TP/SL mode (linear/inverse only).\n- `Full`: entire position (market orders only)\n- `Partial`: partial position (supports limit orders)\n" })
  .option('take-profit', { type: 'string', describe: "Modified take-profit price. Pass \"0\" to cancel existing TP." })
  .option('stop-loss', { type: 'string', describe: "Modified stop-loss price. Pass \"0\" to cancel existing SL." })
  .option('tp-trigger-by', { type: 'string', choices: ['LastPrice', 'IndexPrice', 'MarkPrice'], describe: "Take-profit trigger price type. Required if modifying TP without prior setting." })
  .option('sl-trigger-by', { type: 'string', choices: ['LastPrice', 'IndexPrice', 'MarkPrice'], describe: "Stop-loss trigger price type. Required if modifying SL without prior setting." })
  .option('trigger-by', { type: 'string', choices: ['LastPrice', 'IndexPrice', 'MarkPrice'], describe: "Trigger price type for conditional orders." })
  .option('tp-limit-price', { type: 'string', describe: "Limit price after take-profit triggers (Partial mode only)." })
  .option('sl-limit-price', { type: 'string', describe: "Limit price after stop-loss triggers (Partial mode only)." })
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
  path: '/v5/order/amend',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/order/amend',
    
    body: { category: argv['category'], symbol: argv['symbol'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], orderIv: argv['order-iv'], triggerPrice: argv['trigger-price'], qty: argv['qty'], price: argv['price'], tpslMode: argv['tpsl-mode'], takeProfit: argv['take-profit'], stopLoss: argv['stop-loss'], tpTriggerBy: argv['tp-trigger-by'], slTriggerBy: argv['sl-trigger-by'], triggerBy: argv['trigger-by'], tpLimitPrice: argv['tp-limit-price'], slLimitPrice: argv['sl-limit-price'] },
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
    operation: 'order amend-order',
    method: 'POST',
    path: '/v5/order/amend',
    params: argv,
  })
  return innerHandler(argv)
}
