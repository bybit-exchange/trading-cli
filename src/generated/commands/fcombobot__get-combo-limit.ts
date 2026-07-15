// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-combo-limit'
export const describe = "Validate combo bot input parameters and return allowable ranges"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'leverage': {
      type: 'string',
      description: "Position leverage multiplier as whole number (e.g. '5' means 5x). Must be >= 1.",
      
    },
    'init_margin': {
      type: 'string',
      description: "Initial investment amount in quote currency as decimal string (e.g. '1000' for 1000 USDT)",
      
    },
    'adjust_position_mode': {
      type: 'integer',
      description: "Position rebalancing trigger mode",
      enum: ['0', '1', '2', '3', '4', '5', '6'],
    },
    'adjust_position_percent': {
      type: 'string',
      description: "Rebalancing trigger threshold as whole-number percentage (e.g. '5' means 5%)",
      
    },
    'adjust_position_time_interval': {
      type: 'integer',
      description: "Rebalancing time interval in seconds",
      
    },
    'symbol_settings': {
      type: 'string',
      description: "Per-symbol portfolio configuration",
      
    },
    'sl_percent': {
      type: 'string',
      description: "Optional. Stop-loss as whole-number percentage (e.g. '20' means 20%)",
      
    },
    'tp_percent': {
      type: 'string',
      description: "Optional. Take-profit as whole-number percentage (e.g. '50' means 50%)",
      
    },
    'need_to_slippage': {
      type: 'boolean',
      description: "Whether to include slippage calculation",
      
    },
    'app_name': {
      type: 'string',
      description: "Request source application name",
      
    },
    'trailing_stop_percent': {
      type: 'string',
      description: "Optional. Trailing stop callback as whole-number percentage (e.g. '5' means 5%)",
      
    }
  },
  required: ['leverage', 'init_margin', 'adjust_position_mode', 'symbol_settings'],
} as const

export const builder = (yargs: any) => yargs
  .option('leverage', { type: 'string', demandOption: true, describe: "Position leverage multiplier as whole number (e.g. '5' means 5x). Must be >= 1." })
  .option('init_margin', { type: 'string', demandOption: true, describe: "Initial investment amount in quote currency as decimal string (e.g. '1000' for 1000 USDT)" })
  .option('adjust_position_mode', { type: 'number', choices: ['0', '1', '2', '3', '4', '5', '6'], demandOption: true, describe: "Position rebalancing trigger mode" })
  .option('adjust_position_percent', { type: 'string', describe: "Rebalancing trigger threshold as whole-number percentage (e.g. '5' means 5%)" })
  .option('adjust_position_time_interval', { type: 'number', describe: "Rebalancing time interval in seconds" })
  .option('symbol_settings', { type: 'string', demandOption: true, describe: "Per-symbol portfolio configuration" })
  .option('sl_percent', { type: 'string', describe: "Optional. Stop-loss as whole-number percentage (e.g. '20' means 20%)" })
  .option('tp_percent', { type: 'string', describe: "Optional. Take-profit as whole-number percentage (e.g. '50' means 50%)" })
  .option('need_to_slippage', { type: 'boolean', describe: "Whether to include slippage calculation" })
  .option('app_name', { type: 'string', describe: "Request source application name" })
  .option('trailing_stop_percent', { type: 'string', describe: "Optional. Trailing stop callback as whole-number percentage (e.g. '5' means 5%)" })
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
  path: '/v5/fcombobot/getlimit',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/fcombobot/getlimit',
    
    body: { leverage: argv['leverage'], init_margin: argv['init_margin'], adjust_position_mode: argv['adjust_position_mode'], adjust_position_percent: argv['adjust_position_percent'], adjust_position_time_interval: argv['adjust_position_time_interval'], symbol_settings: argv['symbol_settings'], sl_percent: argv['sl_percent'], tp_percent: argv['tp_percent'], need_to_slippage: argv['need_to_slippage'], app_name: argv['app_name'], trailing_stop_percent: argv['trailing_stop_percent'] },
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
    operation: 'fcombobot get-combo-limit',
    method: 'POST',
    path: '/v5/fcombobot/getlimit',
    params: argv,
  })
  return innerHandler(argv)
}
