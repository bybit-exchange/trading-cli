// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-combo-bot'
export const describe = "Create a new futures combo bot with multi-symbol portfolio and rebalancing"
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
      description: "Rebalancing trigger threshold as whole-number percentage (e.g. '5' means rebalance when allocation drifts by 5%). Required when mode includes percentage.",
      
    },
    'adjust_position_time_interval': {
      type: 'integer',
      description: "Rebalancing time interval in seconds (required when mode includes time)",
      
    },
    'symbol_settings': {
      type: 'string',
      description: "Per-symbol portfolio configuration (at least one entry required)",
      
    },
    'sl_percent': {
      type: 'string',
      description: "Optional. Stop-loss as whole-number percentage of total margin (e.g. '20' means close when loss reaches 20%)",
      
    },
    'tp_percent': {
      type: 'string',
      description: "Optional. Take-profit as whole-number percentage of total margin (e.g. '50' means close when profit reaches 50%)",
      
    },
    'source': {
      type: 'integer',
      description: "Source page where the bot was created",
      enum: ['0', '1', '2'],
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
    'followed_bot_id': {
      type: 'integer',
      description: "Optional. Bot ID being copied from rank list. Set to 0 if not copying.",
      
    },
    'init_bonus': {
      type: 'string',
      description: "Optional. Initial bonus amount in quote currency (decimal string, e.g. '50')",
      
    },
    'trailing_stop_percent': {
      type: 'string',
      description: "Optional. Trailing stop callback as whole-number percentage (e.g. '5' means 5%)",
      
    },
    'channel': {
      type: 'string',
      description: "Optional. Source page identifier",
      
    }
  },
  required: ['leverage', 'init_margin', 'adjust_position_mode', 'symbol_settings'],
} as const

export const builder = (yargs: any) => yargs
  .option('leverage', { type: 'string', demandOption: true, describe: "Position leverage multiplier as whole number (e.g. '5' means 5x). Must be >= 1." })
  .option('init_margin', { type: 'string', demandOption: true, describe: "Initial investment amount in quote currency as decimal string (e.g. '1000' for 1000 USDT)" })
  .option('adjust_position_mode', { type: 'number', choices: ['0', '1', '2', '3', '4', '5', '6'], demandOption: true, describe: "Position rebalancing trigger mode" })
  .option('adjust_position_percent', { type: 'string', describe: "Rebalancing trigger threshold as whole-number percentage (e.g. '5' means rebalance when allocation drifts by 5%). Required when mode includes percentage." })
  .option('adjust_position_time_interval', { type: 'number', describe: "Rebalancing time interval in seconds (required when mode includes time)" })
  .option('symbol_settings', { type: 'string', demandOption: true, describe: "Per-symbol portfolio configuration (at least one entry required)" })
  .option('sl_percent', { type: 'string', describe: "Optional. Stop-loss as whole-number percentage of total margin (e.g. '20' means close when loss reaches 20%)" })
  .option('tp_percent', { type: 'string', describe: "Optional. Take-profit as whole-number percentage of total margin (e.g. '50' means close when profit reaches 50%)" })
  .option('source', { type: 'number', choices: ['0', '1', '2'], describe: "Source page where the bot was created" })
  .option('block_source', { type: 'number', choices: ['0', '1', '2', '3', '4'], describe: "Block source for bot creation" })
  .option('create_type', { type: 'number', choices: ['0', '1', '2', '3'], describe: "How the bot was created" })
  .option('followed_bot_id', { type: 'number', describe: "Optional. Bot ID being copied from rank list. Set to 0 if not copying." })
  .option('init_bonus', { type: 'string', describe: "Optional. Initial bonus amount in quote currency (decimal string, e.g. '50')" })
  .option('trailing_stop_percent', { type: 'string', describe: "Optional. Trailing stop callback as whole-number percentage (e.g. '5' means 5%)" })
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
  path: '/v5/fcombobot/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/fcombobot/create',
    
    body: { leverage: argv['leverage'], init_margin: argv['init_margin'], adjust_position_mode: argv['adjust_position_mode'], adjust_position_percent: argv['adjust_position_percent'], adjust_position_time_interval: argv['adjust_position_time_interval'], symbol_settings: argv['symbol_settings'], sl_percent: argv['sl_percent'], tp_percent: argv['tp_percent'], source: argv['source'], block_source: argv['block_source'], create_type: argv['create_type'], followed_bot_id: argv['followed_bot_id'], init_bonus: argv['init_bonus'], trailing_stop_percent: argv['trailing_stop_percent'], channel: argv['channel'] },
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
    operation: 'fcombobot create-combo-bot',
    method: 'POST',
    path: '/v5/fcombobot/create',
    params: argv,
  })
  return innerHandler(argv)
}
