// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-grid-bot'
export const describe = "Create a new spot grid trading bot"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. \"BTCUSDT\".",
      
    },
    'max_price': {
      type: 'string',
      description: "Upper bound of the grid price range (decimal string).",
      
    },
    'min_price': {
      type: 'string',
      description: "Lower bound of the grid price range (decimal string).",
      
    },
    'total_investment': {
      type: 'string',
      description: "Total investment amount in quote token as decimal string (e.g. '1000' for 1000 USDT).",
      
    },
    'cell_number': {
      type: 'integer',
      description: "Number of grid intervals. Must be >= 2.",
      
    },
    'followed_grid_id': {
      type: 'integer',
      description: "Grid ID to follow (copy trade). Set to 0 if not following.",
      
    },
    'source': {
      type: 'integer',
      description: "Source page where the bot was created",
      enum: ['1', '2'],
    },
    'entry_price': {
      type: 'string',
      description: "Optional. Entry trigger price (decimal string).",
      
    },
    'stop_loss_price': {
      type: 'string',
      description: "Optional. Stop-loss trigger price (decimal string).",
      
    },
    'take_profit_price': {
      type: 'string',
      description: "Optional. Take-profit trigger price (decimal string).",
      
    },
    'tools-discovery-parameter': {
      type: 'string',
      description: "Optional. Recommended parameters from ToolDiscovery. Pass only when redirected from ToolDiscovery.",
      
    },
    'base_investment': {
      type: 'string',
      description: "Optional. Investment amount in base token as decimal string (e.g. '0.5' for 0.5 BTC). Used when invest_mode includes base (1 or 2).",
      
    },
    'quote_investment': {
      type: 'string',
      description: "Optional. Investment amount in quote token as decimal string (e.g. '500' for 500 USDT). Used when invest_mode includes quote (0 or 2).",
      
    },
    'invest_mode': {
      type: 'integer',
      description: "Investment mode",
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
    'ts_percent': {
      type: 'string',
      description: "Optional. Trailing stop callback as decimal ratio, range [0, 0.99] (e.g. '0.05' means 5%, '0.99' means 99%).",
      
    },
    'enable_trailing': {
      type: 'boolean',
      description: "Optional. Enable grid trailing (auto-shift). Requires cell_number >= 5.",
      
    },
    'limit_up_price': {
      type: 'string',
      description: "Optional. Upper limit price for grid trailing (decimal string).",
      
    },
    'channel': {
      type: 'string',
      description: "Optional. Source page channel identifier.",
      
    }
  },
  required: ['symbol', 'max_price', 'min_price', 'total_investment', 'cell_number'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol in uppercase, e.g. \"BTCUSDT\"." })
  .option('max_price', { type: 'string', demandOption: true, describe: "Upper bound of the grid price range (decimal string)." })
  .option('min_price', { type: 'string', demandOption: true, describe: "Lower bound of the grid price range (decimal string)." })
  .option('total_investment', { type: 'string', demandOption: true, describe: "Total investment amount in quote token as decimal string (e.g. '1000' for 1000 USDT)." })
  .option('cell_number', { type: 'number', demandOption: true, describe: "Number of grid intervals. Must be >= 2." })
  .option('followed_grid_id', { type: 'number', describe: "Grid ID to follow (copy trade). Set to 0 if not following." })
  .option('source', { type: 'number', choices: ['1', '2'], describe: "Source page where the bot was created" })
  .option('entry_price', { type: 'string', describe: "Optional. Entry trigger price (decimal string)." })
  .option('stop_loss_price', { type: 'string', describe: "Optional. Stop-loss trigger price (decimal string)." })
  .option('take_profit_price', { type: 'string', describe: "Optional. Take-profit trigger price (decimal string)." })
  .option('tools-discovery-parameter', { type: 'string', describe: "Optional. Recommended parameters from ToolDiscovery. Pass only when redirected from ToolDiscovery." })
  .option('base_investment', { type: 'string', describe: "Optional. Investment amount in base token as decimal string (e.g. '0.5' for 0.5 BTC). Used when invest_mode includes base (1 or 2)." })
  .option('quote_investment', { type: 'string', describe: "Optional. Investment amount in quote token as decimal string (e.g. '500' for 500 USDT). Used when invest_mode includes quote (0 or 2)." })
  .option('invest_mode', { type: 'number', choices: ['0', '1', '2'], describe: "Investment mode" })
  .option('block_source', { type: 'number', choices: ['0', '1', '2', '3', '4'], describe: "Block source for bot creation" })
  .option('create_type', { type: 'number', choices: ['0', '1', '2', '3'], describe: "How the bot was created" })
  .option('ts_percent', { type: 'string', describe: "Optional. Trailing stop callback as decimal ratio, range [0, 0.99] (e.g. '0.05' means 5%, '0.99' means 99%)." })
  .option('enable_trailing', { type: 'boolean', describe: "Optional. Enable grid trailing (auto-shift). Requires cell_number >= 5." })
  .option('limit_up_price', { type: 'string', describe: "Optional. Upper limit price for grid trailing (decimal string)." })
  .option('channel', { type: 'string', describe: "Optional. Source page channel identifier." })
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
  path: '/v5/grid/create-grid',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/grid/create-grid',
    
    body: { symbol: argv['symbol'], max_price: argv['max_price'], min_price: argv['min_price'], total_investment: argv['total_investment'], cell_number: argv['cell_number'], followed_grid_id: argv['followed_grid_id'], source: argv['source'], entry_price: argv['entry_price'], stop_loss_price: argv['stop_loss_price'], take_profit_price: argv['take_profit_price'], toolsDiscoveryParameter: argv['tools-discovery-parameter'], base_investment: argv['base_investment'], quote_investment: argv['quote_investment'], invest_mode: argv['invest_mode'], block_source: argv['block_source'], create_type: argv['create_type'], ts_percent: argv['ts_percent'], enable_trailing: argv['enable_trailing'], limit_up_price: argv['limit_up_price'], channel: argv['channel'] },
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
    operation: 'grid create-grid-bot',
    method: 'POST',
    path: '/v5/grid/create-grid',
    params: argv,
  })
  return innerHandler(argv)
}
