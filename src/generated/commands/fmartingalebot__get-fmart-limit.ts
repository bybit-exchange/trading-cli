// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-fmart-limit'
export const describe = "Validate Martingale bot input parameters and return allowable ranges"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Trading pair symbol (e.g. BTCUSDT)",
      
    },
    'martingale_mode': {
      type: 'string',
      description: "Martingale strategy direction",
      enum: ['F_MART_MODE_MARTINGALE_MODE_UNKNOWN_UNSPECIFIED', 'F_MART_MODE_MARTINGALE_MODE_LONG', 'F_MART_MODE_MARTINGALE_MODE_SHORT'],
    },
    'leverage': {
      type: 'string',
      description: "Position leverage multiplier as whole number (e.g. '5' means 5x). Must be >= 1.",
      
    },
    'price_float_percent': {
      type: 'string',
      description: "Price movement trigger as whole-number percentage (e.g. '1.5' means 1.5%)",
      
    },
    'add_position_percent': {
      type: 'string',
      description: "Position add scaling as whole-number percentage of base position (e.g. '100' means 1x)",
      
    },
    'add_position_num': {
      type: 'integer',
      description: "Maximum number of position adds per round",
      
    },
    'init_margin': {
      type: 'string',
      description: "Initial investment amount in quote currency as decimal string (e.g. '1000' for 1000 USDT)",
      
    },
    'round_tp_percent': {
      type: 'string',
      description: "Single round take-profit as whole-number percentage (e.g. '3' means 3%)",
      
    },
    'sl_percent': {
      type: 'string',
      description: "Optional. Stop-loss as whole-number percentage (e.g. '20' means 20%)",
      
    },
    'entry_price': {
      type: 'string',
      description: "Optional. Entry trigger price as absolute price (decimal string, e.g. '25000')",
      
    },
    'need_to_slippage': {
      type: 'boolean',
      description: "Whether to include slippage calculation",
      
    },
    'app_name': {
      type: 'string',
      description: "Request source application name",
      
    }
  },
  required: ['symbol', 'martingale_mode', 'leverage'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol (e.g. BTCUSDT)" })
  .option('martingale_mode', { type: 'string', choices: ['F_MART_MODE_MARTINGALE_MODE_UNKNOWN_UNSPECIFIED', 'F_MART_MODE_MARTINGALE_MODE_LONG', 'F_MART_MODE_MARTINGALE_MODE_SHORT'], demandOption: true, describe: "Martingale strategy direction" })
  .option('leverage', { type: 'string', demandOption: true, describe: "Position leverage multiplier as whole number (e.g. '5' means 5x). Must be >= 1." })
  .option('price_float_percent', { type: 'string', describe: "Price movement trigger as whole-number percentage (e.g. '1.5' means 1.5%)" })
  .option('add_position_percent', { type: 'string', describe: "Position add scaling as whole-number percentage of base position (e.g. '100' means 1x)" })
  .option('add_position_num', { type: 'number', describe: "Maximum number of position adds per round" })
  .option('init_margin', { type: 'string', describe: "Initial investment amount in quote currency as decimal string (e.g. '1000' for 1000 USDT)" })
  .option('round_tp_percent', { type: 'string', describe: "Single round take-profit as whole-number percentage (e.g. '3' means 3%)" })
  .option('sl_percent', { type: 'string', describe: "Optional. Stop-loss as whole-number percentage (e.g. '20' means 20%)" })
  .option('entry_price', { type: 'string', describe: "Optional. Entry trigger price as absolute price (decimal string, e.g. '25000')" })
  .option('need_to_slippage', { type: 'boolean', describe: "Whether to include slippage calculation" })
  .option('app_name', { type: 'string', describe: "Request source application name" })
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
  path: '/v5/fmartingalebot/getlimit',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/fmartingalebot/getlimit',
    
    body: { symbol: argv['symbol'], martingale_mode: argv['martingale_mode'], leverage: argv['leverage'], price_float_percent: argv['price_float_percent'], add_position_percent: argv['add_position_percent'], add_position_num: argv['add_position_num'], init_margin: argv['init_margin'], round_tp_percent: argv['round_tp_percent'], sl_percent: argv['sl_percent'], entry_price: argv['entry_price'], need_to_slippage: argv['need_to_slippage'], app_name: argv['app_name'] },
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
    operation: 'fmartingalebot get-fmart-limit',
    method: 'POST',
    path: '/v5/fmartingalebot/getlimit',
    params: argv,
  })
  return innerHandler(argv)
}
