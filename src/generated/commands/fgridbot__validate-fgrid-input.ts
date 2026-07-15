// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'validate-fgrid-input'
export const describe = "Validate futures grid bot input parameters and return allowable ranges"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Trading pair symbol (e.g. BTCUSDT)",
      
    },
    'cell_number': {
      type: 'integer',
      description: "Number of grid levels (minimum 2)",
      
    },
    'min_price': {
      type: 'string',
      description: "Lower price bound of the grid range",
      
    },
    'max_price': {
      type: 'string',
      description: "Upper price bound of the grid range",
      
    },
    'leverage': {
      type: 'string',
      description: "Position leverage, must be >= 1 (e.g. '5')",
      
    },
    'grid_type': {
      type: 'integer',
      description: "Grid spacing type",
      enum: ['0', '1', '2'],
    },
    'grid_mode': {
      type: 'integer',
      description: "Grid strategy direction",
      enum: ['0', '1', '2', '3'],
    },
    'stop_loss_price': {
      type: 'string',
      description: "Optional. Stop-loss trigger price (absolute price as decimal string, e.g. '25000')",
      
    },
    'take_profit_price': {
      type: 'string',
      description: "Optional. Take-profit trigger price (absolute price as decimal string, e.g. '35000')",
      
    },
    'tp_sl_type': {
      type: 'integer',
      description: "Take-profit / stop-loss trigger mode",
      enum: ['0', '1', '2', '3', '4'],
    },
    'entry_price': {
      type: 'string',
      description: "Optional. Entry trigger price for delayed activation",
      
    },
    'stop_loss_per': {
      type: 'string',
      description: "Optional. Stop-loss as whole-number percentage (e.g. '10' means 10%). Used when tp_sl_type includes percentage-based SL.",
      
    },
    'take_profit_per': {
      type: 'string',
      description: "Optional. Take-profit as whole-number percentage (e.g. '20' means 20%). Used when tp_sl_type includes percentage-based TP.",
      
    },
    'trailing_stop_per': {
      type: 'string',
      description: "Optional. Trailing stop callback as whole-number percentage (e.g. '5' means 5%)",
      
    },
    'init_margin': {
      type: 'string',
      description: "Optional. Initial margin amount in quote currency (decimal string, e.g. '1000')",
      
    },
    'move_up_price': {
      type: 'string',
      description: "Optional. Move-up price for grid shifting",
      
    },
    'move_down_price': {
      type: 'string',
      description: "Optional. Move-down price for grid shifting",
      
    }
  },
  required: ['symbol', 'cell_number', 'min_price', 'max_price', 'leverage', 'grid_type', 'grid_mode'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol (e.g. BTCUSDT)" })
  .option('cell_number', { type: 'number', demandOption: true, describe: "Number of grid levels (minimum 2)" })
  .option('min_price', { type: 'string', demandOption: true, describe: "Lower price bound of the grid range" })
  .option('max_price', { type: 'string', demandOption: true, describe: "Upper price bound of the grid range" })
  .option('leverage', { type: 'string', demandOption: true, describe: "Position leverage, must be >= 1 (e.g. '5')" })
  .option('grid_type', { type: 'number', choices: ['0', '1', '2'], demandOption: true, describe: "Grid spacing type" })
  .option('grid_mode', { type: 'number', choices: ['0', '1', '2', '3'], demandOption: true, describe: "Grid strategy direction" })
  .option('stop_loss_price', { type: 'string', describe: "Optional. Stop-loss trigger price (absolute price as decimal string, e.g. '25000')" })
  .option('take_profit_price', { type: 'string', describe: "Optional. Take-profit trigger price (absolute price as decimal string, e.g. '35000')" })
  .option('tp_sl_type', { type: 'number', choices: ['0', '1', '2', '3', '4'], describe: "Take-profit / stop-loss trigger mode" })
  .option('entry_price', { type: 'string', describe: "Optional. Entry trigger price for delayed activation" })
  .option('stop_loss_per', { type: 'string', describe: "Optional. Stop-loss as whole-number percentage (e.g. '10' means 10%). Used when tp_sl_type includes percentage-based SL." })
  .option('take_profit_per', { type: 'string', describe: "Optional. Take-profit as whole-number percentage (e.g. '20' means 20%). Used when tp_sl_type includes percentage-based TP." })
  .option('trailing_stop_per', { type: 'string', describe: "Optional. Trailing stop callback as whole-number percentage (e.g. '5' means 5%)" })
  .option('init_margin', { type: 'string', describe: "Optional. Initial margin amount in quote currency (decimal string, e.g. '1000')" })
  .option('move_up_price', { type: 'string', describe: "Optional. Move-up price for grid shifting" })
  .option('move_down_price', { type: 'string', describe: "Optional. Move-down price for grid shifting" })
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
  path: '/v5/fgridbot/validate',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/fgridbot/validate',
    
    body: { symbol: argv['symbol'], cell_number: argv['cell_number'], min_price: argv['min_price'], max_price: argv['max_price'], leverage: argv['leverage'], grid_type: argv['grid_type'], grid_mode: argv['grid_mode'], stop_loss_price: argv['stop_loss_price'], take_profit_price: argv['take_profit_price'], tp_sl_type: argv['tp_sl_type'], entry_price: argv['entry_price'], stop_loss_per: argv['stop_loss_per'], take_profit_per: argv['take_profit_per'], trailing_stop_per: argv['trailing_stop_per'], init_margin: argv['init_margin'], move_up_price: argv['move_up_price'], move_down_price: argv['move_down_price'] },
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
    operation: 'fgridbot validate-fgrid-input',
    method: 'POST',
    path: '/v5/fgridbot/validate',
    params: argv,
  })
  return innerHandler(argv)
}
