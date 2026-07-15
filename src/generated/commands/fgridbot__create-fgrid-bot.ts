// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-fgrid-bot'
export const describe = "Create a new futures grid trading bot with specified parameters"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Trading pair symbol (e.g. BTCUSDT)",
      
    },
    'grid_mode': {
      type: 'integer',
      description: "Grid strategy direction",
      enum: ['0', '1', '2', '3'],
    },
    'min_price': {
      type: 'string',
      description: "Lower price bound of the grid range",
      
    },
    'max_price': {
      type: 'string',
      description: "Upper price bound of the grid range",
      
    },
    'cell_number': {
      type: 'integer',
      description: "Number of grid levels (minimum 2)",
      
    },
    'leverage': {
      type: 'string',
      description: "Position leverage multiplier as whole number (e.g. '5' means 5x leverage). Must be >= 1.",
      
    },
    'grid_type': {
      type: 'integer',
      description: "Grid spacing type",
      enum: ['0', '1', '2'],
    },
    'total_investment': {
      type: 'string',
      description: "Initial investment amount in quote currency as decimal string (e.g. '1000' for 1000 USDT)",
      
    },
    'take_profit_per': {
      type: 'string',
      description: "Optional. Take-profit as whole-number percentage (e.g. '20' means 20%). Used when tp_sl_type includes percentage-based TP.",
      
    },
    'stop_loss_per': {
      type: 'string',
      description: "Optional. Stop-loss as whole-number percentage (e.g. '10' means 10%). Used when tp_sl_type includes percentage-based SL.",
      
    },
    'entry_price': {
      type: 'string',
      description: "Optional. Trigger price for delayed entry",
      
    },
    'source': {
      type: 'integer',
      description: "Source page where the bot was created",
      enum: ['0', '1', '2', '3'],
    },
    'followed_grid_id': {
      type: 'integer',
      description: "Optional. Grid ID being copied. Set to 0 if not copying.",
      
    },
    'tools-discovery-parameter': {
      type: 'string',
      description: "Parameters from ToolDiscovery recommendation",
      
    },
    'stop_loss_price': {
      type: 'string',
      description: "Optional. Stop-loss trigger price (absolute price as decimal string, e.g. '25000'). Used when tp_sl_type includes price-based SL.",
      
    },
    'take_profit_price': {
      type: 'string',
      description: "Optional. Take-profit trigger price (absolute price as decimal string, e.g. '35000'). Used when tp_sl_type includes price-based TP.",
      
    },
    'tp_sl_type': {
      type: 'integer',
      description: "Take-profit / stop-loss trigger mode",
      enum: ['0', '1', '2', '3', '4'],
    },
    'block_source': {
      type: 'integer',
      description: "Block source for bot creation",
      enum: ['0', '1', '2', '3', '4'],
    },
    'create_type': {
      type: 'integer',
      description: "How the bot was created",
      enum: ['0', '1', '2', '3'],
    },
    'init_bonus': {
      type: 'string',
      description: "Optional. Initial bonus amount in quote currency (decimal string, e.g. '50')",
      
    },
    'business_remark': {
      type: 'string',
      description: "Optional. Business remark for tracking",
      
    },
    'trailing_stop_per': {
      type: 'string',
      description: "Optional. Trailing stop exit as whole-number percentage (e.g. '5' means 5%)",
      
    },
    'move_up_price': {
      type: 'string',
      description: "Optional. Move-up price for grid shifting",
      
    },
    'move_down_price': {
      type: 'string',
      description: "Optional. Move-down price for grid shifting",
      
    },
    'channel': {
      type: 'string',
      description: "Optional. Source page identifier",
      
    }
  },
  required: ['symbol', 'grid_mode', 'min_price', 'max_price', 'cell_number', 'leverage', 'grid_type', 'total_investment'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol (e.g. BTCUSDT)" })
  .option('grid_mode', { type: 'number', choices: ['0', '1', '2', '3'], demandOption: true, describe: "Grid strategy direction" })
  .option('min_price', { type: 'string', demandOption: true, describe: "Lower price bound of the grid range" })
  .option('max_price', { type: 'string', demandOption: true, describe: "Upper price bound of the grid range" })
  .option('cell_number', { type: 'number', demandOption: true, describe: "Number of grid levels (minimum 2)" })
  .option('leverage', { type: 'string', demandOption: true, describe: "Position leverage multiplier as whole number (e.g. '5' means 5x leverage). Must be >= 1." })
  .option('grid_type', { type: 'number', choices: ['0', '1', '2'], demandOption: true, describe: "Grid spacing type" })
  .option('total_investment', { type: 'string', demandOption: true, describe: "Initial investment amount in quote currency as decimal string (e.g. '1000' for 1000 USDT)" })
  .option('take_profit_per', { type: 'string', describe: "Optional. Take-profit as whole-number percentage (e.g. '20' means 20%). Used when tp_sl_type includes percentage-based TP." })
  .option('stop_loss_per', { type: 'string', describe: "Optional. Stop-loss as whole-number percentage (e.g. '10' means 10%). Used when tp_sl_type includes percentage-based SL." })
  .option('entry_price', { type: 'string', describe: "Optional. Trigger price for delayed entry" })
  .option('source', { type: 'number', choices: ['0', '1', '2', '3'], describe: "Source page where the bot was created" })
  .option('followed_grid_id', { type: 'number', describe: "Optional. Grid ID being copied. Set to 0 if not copying." })
  .option('tools-discovery-parameter', { type: 'string', describe: "Parameters from ToolDiscovery recommendation" })
  .option('stop_loss_price', { type: 'string', describe: "Optional. Stop-loss trigger price (absolute price as decimal string, e.g. '25000'). Used when tp_sl_type includes price-based SL." })
  .option('take_profit_price', { type: 'string', describe: "Optional. Take-profit trigger price (absolute price as decimal string, e.g. '35000'). Used when tp_sl_type includes price-based TP." })
  .option('tp_sl_type', { type: 'number', choices: ['0', '1', '2', '3', '4'], describe: "Take-profit / stop-loss trigger mode" })
  .option('block_source', { type: 'number', choices: ['0', '1', '2', '3', '4'], describe: "Block source for bot creation" })
  .option('create_type', { type: 'number', choices: ['0', '1', '2', '3'], describe: "How the bot was created" })
  .option('init_bonus', { type: 'string', describe: "Optional. Initial bonus amount in quote currency (decimal string, e.g. '50')" })
  .option('business_remark', { type: 'string', describe: "Optional. Business remark for tracking" })
  .option('trailing_stop_per', { type: 'string', describe: "Optional. Trailing stop exit as whole-number percentage (e.g. '5' means 5%)" })
  .option('move_up_price', { type: 'string', describe: "Optional. Move-up price for grid shifting" })
  .option('move_down_price', { type: 'string', describe: "Optional. Move-down price for grid shifting" })
  .option('channel', { type: 'string', describe: "Optional. Source page identifier" })
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
  path: '/v5/fgridbot/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/fgridbot/create',
    
    body: { symbol: argv['symbol'], grid_mode: argv['grid_mode'], min_price: argv['min_price'], max_price: argv['max_price'], cell_number: argv['cell_number'], leverage: argv['leverage'], grid_type: argv['grid_type'], total_investment: argv['total_investment'], take_profit_per: argv['take_profit_per'], stop_loss_per: argv['stop_loss_per'], entry_price: argv['entry_price'], source: argv['source'], followed_grid_id: argv['followed_grid_id'], toolsDiscoveryParameter: argv['tools-discovery-parameter'], stop_loss_price: argv['stop_loss_price'], take_profit_price: argv['take_profit_price'], tp_sl_type: argv['tp_sl_type'], block_source: argv['block_source'], create_type: argv['create_type'], init_bonus: argv['init_bonus'], business_remark: argv['business_remark'], trailing_stop_per: argv['trailing_stop_per'], move_up_price: argv['move_up_price'], move_down_price: argv['move_down_price'], channel: argv['channel'] },
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
    operation: 'fgridbot create-fgrid-bot',
    method: 'POST',
    path: '/v5/fgridbot/create',
    params: argv,
  })
  return innerHandler(argv)
}
