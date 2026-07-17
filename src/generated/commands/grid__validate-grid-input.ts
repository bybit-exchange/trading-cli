// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'validate-grid-input'
export const describe = "Validate spot grid bot parameters before creation"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. \"BTCUSDT\".",
      
    },
    'cell_number': {
      type: 'integer',
      description: "Number of grid intervals. Must be >= 2.",
      
    },
    'min_price': {
      type: 'string',
      description: "Lower bound of the grid price range (decimal string).",
      
    },
    'max_price': {
      type: 'string',
      description: "Upper bound of the grid price range (decimal string). Must be greater than min_price.",
      
    },
    'total_investment': {
      type: 'string',
      description: "Total investment amount in quote token as decimal string (e.g. '1000' for 1000 USDT).",
      
    },
    'stop_loss': {
      type: 'string',
      description: "Optional. Stop-loss as absolute price (decimal string, e.g. '18000').",
      
    },
    'take_profit': {
      type: 'string',
      description: "Optional. Take-profit as absolute price (decimal string, e.g. '35000').",
      
    },
    'entry_price': {
      type: 'string',
      description: "Optional. Entry trigger as absolute price (decimal string, e.g. '25000').",
      
    },
    'base_investment': {
      type: 'string',
      description: "Optional. Investment amount in base token as decimal string (e.g. '0.5' for 0.5 BTC). Used when invest_mode is 1 or 2.",
      
    },
    'quote_investment': {
      type: 'string',
      description: "Optional. Investment amount in quote token as decimal string (e.g. '500' for 500 USDT). Used when invest_mode is 0 or 2.",
      
    },
    'invest_mode': {
      type: 'integer',
      description: "Investment mode",
      enum: ['0', '1', '2'],
    },
    'ts_percent': {
      type: 'string',
      description: "Optional. Trailing stop callback as decimal ratio, range [0, 0.99] (e.g. '0.05' means 5%, '0.99' means 99%).",
      
    },
    'enable_trailing': {
      type: 'boolean',
      description: "Optional. Whether to enable grid trailing (auto-shift). Requires cell_number >= 5.",
      
    },
    'limit_up_price': {
      type: 'string',
      description: "Optional. Upper limit price for grid trailing (decimal string).",
      
    }
  },
  required: ['symbol', 'cell_number', 'min_price', 'max_price', 'total_investment'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol in uppercase, e.g. \"BTCUSDT\"." })
  .option('cell_number', { type: 'number', demandOption: true, describe: "Number of grid intervals. Must be >= 2." })
  .option('min_price', { type: 'string', demandOption: true, describe: "Lower bound of the grid price range (decimal string)." })
  .option('max_price', { type: 'string', demandOption: true, describe: "Upper bound of the grid price range (decimal string). Must be greater than min_price." })
  .option('total_investment', { type: 'string', demandOption: true, describe: "Total investment amount in quote token as decimal string (e.g. '1000' for 1000 USDT)." })
  .option('stop_loss', { type: 'string', describe: "Optional. Stop-loss as absolute price (decimal string, e.g. '18000')." })
  .option('take_profit', { type: 'string', describe: "Optional. Take-profit as absolute price (decimal string, e.g. '35000')." })
  .option('entry_price', { type: 'string', describe: "Optional. Entry trigger as absolute price (decimal string, e.g. '25000')." })
  .option('base_investment', { type: 'string', describe: "Optional. Investment amount in base token as decimal string (e.g. '0.5' for 0.5 BTC). Used when invest_mode is 1 or 2." })
  .option('quote_investment', { type: 'string', describe: "Optional. Investment amount in quote token as decimal string (e.g. '500' for 500 USDT). Used when invest_mode is 0 or 2." })
  .option('invest_mode', { type: 'number', choices: ['0', '1', '2'], describe: "Investment mode" })
  .option('ts_percent', { type: 'string', describe: "Optional. Trailing stop callback as decimal ratio, range [0, 0.99] (e.g. '0.05' means 5%, '0.99' means 99%)." })
  .option('enable_trailing', { type: 'boolean', describe: "Optional. Whether to enable grid trailing (auto-shift). Requires cell_number >= 5." })
  .option('limit_up_price', { type: 'string', describe: "Optional. Upper limit price for grid trailing (decimal string)." })
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
  path: '/v5/grid/validate-input',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/grid/validate-input',
    
    body: { symbol: argv['symbol'], cell_number: argv['cell_number'], min_price: argv['min_price'], max_price: argv['max_price'], total_investment: argv['total_investment'], stop_loss: argv['stop_loss'], take_profit: argv['take_profit'], entry_price: argv['entry_price'], base_investment: argv['base_investment'], quote_investment: argv['quote_investment'], invest_mode: argv['invest_mode'], ts_percent: argv['ts_percent'], enable_trailing: argv['enable_trailing'], limit_up_price: argv['limit_up_price'] },
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
    operation: 'grid validate-grid-input',
    method: 'POST',
    path: '/v5/grid/validate-input',
    params: argv,
  })
  return innerHandler(argv)
}
