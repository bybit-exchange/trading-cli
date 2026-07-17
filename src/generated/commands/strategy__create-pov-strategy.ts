// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-pov-strategy'
export const describe = "Create POV (Percentage of Volume) strategy"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type for the trading pair.\n\n**POV restriction:** only USDT Perp / USDC Perp / Inverse Perp are\nsupported. Spot (`UTA_SPOT`) and value-based ordering are NOT supported.\n\nAllowed effective values for POV:\n- `UTA_USDT`            — USDT Perp\n- `UTA_USDC`            — USDC Perp\n- `UTA_INVERSE`         — Inverse Perp\n\nOther enum values (`UTA_SPOT`, `UTA_USDC_FUTURE`, `UTA_INVERSE_FUTURE`,\n`UTA_USDT_FUTURE`) are reserved for the shared strategy schema and\nwill be rejected for POV at validation time.\n",
      enum: ['UTA_USDT', 'UTA_USDC', 'UTA_USDC_FUTURE', 'UTA_SPOT', 'UTA_INVERSE', 'UTA_INVERSE_FUTURE', 'UTA_USDT_FUTURE'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol (e.g., BTCUSDT, ETHUSDT). Must be a perp symbol\nfor the specified category.\n",
      
    },
    'side': {
      type: 'string',
      description: "Order direction",
      enum: ['Buy', 'Sell'],
    },
    'size': {
      type: 'string',
      description: "**POV semantics:** acts as `maxQty` (maximum total filled quantity)\nin base coin. Optional.\n\nStop-condition rules:\n- When `interval > 0`, at least one of `size` / `duration` MUST be set.\n- When `interval = 0` (OneTime), `size` is ignored.\n",
      
    },
    'strategy-type': {
      type: 'string',
      description: "Strategy type identifier. Must be `pov` for this endpoint.",
      enum: ['pov'],
    },
    'duration': {
      type: 'integer',
      description: "**POV semantics:** acts as `maxDuration` (maximum total runtime in\nseconds). Optional.\n\nRange: [900, 86400] (15 minutes – 24 hours).\n\nStop-condition rules:\n- When `interval > 0`, at least one of `size` / `duration` MUST be set.\n- When `interval = 0` (OneTime), `duration` is ignored.\n",
      
    },
    'interval': {
      type: 'integer',
      description: "**POV semantics:** child-order frequency in seconds.\n\n- `0` → OneTime mode: place exactly one child order, then terminate\n- non-zero → range [5, 3600]; must be ≤ `duration` (when set)\n\nNumber of child orders ≈ `duration / interval` (subject to live\nvolume / liquidity).\n",
      
    },
    'pov-params': {
      type: 'string',
      description: "POV-specific configuration. Required when `strategyType=pov`.\n",
      
    },
    'reduce-only': {
      type: 'boolean',
      description: "Position reduction only flag. If `true`, child orders can only reduce\nan existing position, never increase it.\n",
      
    },
    'position-idx': {
      type: 'integer',
      description: "Position index for hedge mode.\n- 0: One-way mode\n- 1: Hedge mode - Buy side (long)\n- 2: Hedge mode - Sell side (short)\n",
      enum: ['0', '1', '2'],
    }
  },
  required: ['category', 'symbol', 'side', 'strategy-type', 'pov-params'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['UTA_USDT', 'UTA_USDC', 'UTA_USDC_FUTURE', 'UTA_SPOT', 'UTA_INVERSE', 'UTA_INVERSE_FUTURE', 'UTA_USDT_FUTURE'], demandOption: true, describe: "Product type for the trading pair.\n\n**POV restriction:** only USDT Perp / USDC Perp / Inverse Perp are\nsupported. Spot (`UTA_SPOT`) and value-based ordering are NOT supported.\n\nAllowed effective values for POV:\n- `UTA_USDT`            — USDT Perp\n- `UTA_USDC`            — USDC Perp\n- `UTA_INVERSE`         — Inverse Perp\n\nOther enum values (`UTA_SPOT`, `UTA_USDC_FUTURE`, `UTA_INVERSE_FUTURE`,\n`UTA_USDT_FUTURE`) are reserved for the shared strategy schema and\nwill be rejected for POV at validation time.\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol (e.g., BTCUSDT, ETHUSDT). Must be a perp symbol\nfor the specified category.\n" })
  .option('side', { type: 'string', choices: ['Buy', 'Sell'], demandOption: true, describe: "Order direction" })
  .option('size', { type: 'string', describe: "**POV semantics:** acts as `maxQty` (maximum total filled quantity)\nin base coin. Optional.\n\nStop-condition rules:\n- When `interval > 0`, at least one of `size` / `duration` MUST be set.\n- When `interval = 0` (OneTime), `size` is ignored.\n" })
  .option('strategy-type', { type: 'string', choices: ['pov'], demandOption: true, describe: "Strategy type identifier. Must be `pov` for this endpoint." })
  .option('duration', { type: 'number', describe: "**POV semantics:** acts as `maxDuration` (maximum total runtime in\nseconds). Optional.\n\nRange: [900, 86400] (15 minutes – 24 hours).\n\nStop-condition rules:\n- When `interval > 0`, at least one of `size` / `duration` MUST be set.\n- When `interval = 0` (OneTime), `duration` is ignored.\n" })
  .option('interval', { type: 'number', describe: "**POV semantics:** child-order frequency in seconds.\n\n- `0` → OneTime mode: place exactly one child order, then terminate\n- non-zero → range [5, 3600]; must be ≤ `duration` (when set)\n\nNumber of child orders ≈ `duration / interval` (subject to live\nvolume / liquidity).\n" })
  .option('pov-params', { type: 'string', demandOption: true, describe: "POV-specific configuration. Required when `strategyType=pov`.\n" })
  .option('reduce-only', { type: 'boolean', describe: "Position reduction only flag. If `true`, child orders can only reduce\nan existing position, never increase it.\n" })
  .option('position-idx', { type: 'number', choices: ['0', '1', '2'], describe: "Position index for hedge mode.\n- 0: One-way mode\n- 1: Hedge mode - Buy side (long)\n- 2: Hedge mode - Sell side (short)\n" })
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
  path: '/v5/strategy/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/strategy/create',
    
    body: { category: argv['category'], symbol: argv['symbol'], side: argv['side'], size: argv['size'], strategyType: argv['strategy-type'], duration: argv['duration'], interval: argv['interval'], povParams: argv['pov-params'], reduceOnly: argv['reduce-only'], positionIdx: argv['position-idx'] },
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
    operation: 'strategy create-pov-strategy',
    method: 'POST',
    path: '/v5/strategy/create',
    params: argv,
  })
  return innerHandler(argv)
}
