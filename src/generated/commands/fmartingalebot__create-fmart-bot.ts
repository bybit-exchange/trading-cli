// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-fmart-bot'
export const describe = "Create a new futures Martingale bot with DCA averaging strategy"
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
      description: "Price movement percentage to trigger a position add, as whole number (e.g. '1.5' means add when price moves 1.5% against the position)",
      
    },
    'add_position_percent': {
      type: 'string',
      description: "Position add scaling as whole-number percentage of base position size (e.g. '100' means each add equals 1x the base position; '200' means 2x)",
      
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
      description: "Single round take-profit as whole-number percentage (e.g. '3' means close the round when profit reaches 3%)",
      
    },
    'auto_cycle_toggle': {
      type: 'string',
      description: "Auto-cycle toggle for repeating rounds",
      enum: ['AUTO_CYCLE_TOGGLE_AUTO_CYCLE_TOGGLE_UNKNOWN_UNSPECIFIED', 'AUTO_CYCLE_TOGGLE_AUTO_CYCLE_TOGGLE_ENABLE', 'AUTO_CYCLE_TOGGLE_AUTO_CYCLE_TOGGLE_DISABLE'],
    },
    'sl_percent': {
      type: 'string',
      description: "Optional. Stop-loss as whole-number percentage of total margin (e.g. '20' means close when loss reaches 20%). Empty string if not set.",
      
    },
    'entry_price': {
      type: 'string',
      description: "Optional. Entry trigger price as absolute price (decimal string, e.g. '25000'). Empty string if not set.",
      
    },
    'source': {
      type: 'string',
      description: "Source page where the bot was created",
      enum: ['F_MART_SOURCE_UNSPECIFIED', 'F_MART_SOURCE_TRADING_BOT_PAGE', 'F_MART_SOURCE_DERIVATIVES_PAGE'],
    },
    'followed_bot_id': {
      type: 'integer',
      description: "Optional. Bot ID being copied from rank list. Set to 0 if not copying.",
      
    },
    'block_source': {
      type: 'string',
      description: "Block source for bot creation",
      enum: ['BLOCK_SOURCE_UNSPECIFIED', 'BLOCK_SOURCE_MAIN_PAGE_CREATE_BLOCK', 'BLOCK_SOURCE_AI_CREATE_BLOCK', 'BLOCK_SOURCE_RANK_LIST', 'BLOCK_SOURCE_PAGE_AI_BLOCK'],
    },
    'create_type': {
      type: 'string',
      description: "How the bot was created",
      enum: ['CREATE_TYPE_UNSPECIFIED', 'CREATE_TYPE_COPY', 'CREATE_TYPE_AUTO', 'CREATE_TYPE_MANUAL'],
    },
    'init_bonus': {
      type: 'string',
      description: "Optional. Initial bonus amount in quote currency (decimal string, e.g. '50')",
      
    },
    'channel': {
      type: 'string',
      description: "Optional. Source page identifier",
      
    }
  },
  required: ['symbol', 'martingale_mode', 'leverage', 'price_float_percent', 'add_position_percent', 'add_position_num', 'init_margin', 'round_tp_percent'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol (e.g. BTCUSDT)" })
  .option('martingale_mode', { type: 'string', choices: ['F_MART_MODE_MARTINGALE_MODE_UNKNOWN_UNSPECIFIED', 'F_MART_MODE_MARTINGALE_MODE_LONG', 'F_MART_MODE_MARTINGALE_MODE_SHORT'], demandOption: true, describe: "Martingale strategy direction" })
  .option('leverage', { type: 'string', demandOption: true, describe: "Position leverage multiplier as whole number (e.g. '5' means 5x). Must be >= 1." })
  .option('price_float_percent', { type: 'string', demandOption: true, describe: "Price movement percentage to trigger a position add, as whole number (e.g. '1.5' means add when price moves 1.5% against the position)" })
  .option('add_position_percent', { type: 'string', demandOption: true, describe: "Position add scaling as whole-number percentage of base position size (e.g. '100' means each add equals 1x the base position; '200' means 2x)" })
  .option('add_position_num', { type: 'number', demandOption: true, describe: "Maximum number of position adds per round" })
  .option('init_margin', { type: 'string', demandOption: true, describe: "Initial investment amount in quote currency as decimal string (e.g. '1000' for 1000 USDT)" })
  .option('round_tp_percent', { type: 'string', demandOption: true, describe: "Single round take-profit as whole-number percentage (e.g. '3' means close the round when profit reaches 3%)" })
  .option('auto_cycle_toggle', { type: 'string', choices: ['AUTO_CYCLE_TOGGLE_AUTO_CYCLE_TOGGLE_UNKNOWN_UNSPECIFIED', 'AUTO_CYCLE_TOGGLE_AUTO_CYCLE_TOGGLE_ENABLE', 'AUTO_CYCLE_TOGGLE_AUTO_CYCLE_TOGGLE_DISABLE'], describe: "Auto-cycle toggle for repeating rounds" })
  .option('sl_percent', { type: 'string', describe: "Optional. Stop-loss as whole-number percentage of total margin (e.g. '20' means close when loss reaches 20%). Empty string if not set." })
  .option('entry_price', { type: 'string', describe: "Optional. Entry trigger price as absolute price (decimal string, e.g. '25000'). Empty string if not set." })
  .option('source', { type: 'string', choices: ['F_MART_SOURCE_UNSPECIFIED', 'F_MART_SOURCE_TRADING_BOT_PAGE', 'F_MART_SOURCE_DERIVATIVES_PAGE'], describe: "Source page where the bot was created" })
  .option('followed_bot_id', { type: 'number', describe: "Optional. Bot ID being copied from rank list. Set to 0 if not copying." })
  .option('block_source', { type: 'string', choices: ['BLOCK_SOURCE_UNSPECIFIED', 'BLOCK_SOURCE_MAIN_PAGE_CREATE_BLOCK', 'BLOCK_SOURCE_AI_CREATE_BLOCK', 'BLOCK_SOURCE_RANK_LIST', 'BLOCK_SOURCE_PAGE_AI_BLOCK'], describe: "Block source for bot creation" })
  .option('create_type', { type: 'string', choices: ['CREATE_TYPE_UNSPECIFIED', 'CREATE_TYPE_COPY', 'CREATE_TYPE_AUTO', 'CREATE_TYPE_MANUAL'], describe: "How the bot was created" })
  .option('init_bonus', { type: 'string', describe: "Optional. Initial bonus amount in quote currency (decimal string, e.g. '50')" })
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
  path: '/v5/fmartingalebot/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/fmartingalebot/create',
    
    body: { symbol: argv['symbol'], martingale_mode: argv['martingale_mode'], leverage: argv['leverage'], price_float_percent: argv['price_float_percent'], add_position_percent: argv['add_position_percent'], add_position_num: argv['add_position_num'], init_margin: argv['init_margin'], round_tp_percent: argv['round_tp_percent'], auto_cycle_toggle: argv['auto_cycle_toggle'], sl_percent: argv['sl_percent'], entry_price: argv['entry_price'], source: argv['source'], followed_bot_id: argv['followed_bot_id'], block_source: argv['block_source'], create_type: argv['create_type'], init_bonus: argv['init_bonus'], channel: argv['channel'] },
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
    operation: 'fmartingalebot create-fmart-bot',
    method: 'POST',
    path: '/v5/fmartingalebot/create',
    params: argv,
  })
  return innerHandler(argv)
}
