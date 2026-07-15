// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'switch-position-mode'
export const describe = "Switch position mode between one-way and hedge mode"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type. Only `linear` is supported in the parameter, though it affects both USDT perpetual and inverse futures positions.",
      enum: ['linear'],
    },
    'symbol': {
      type: 'string',
      description: "Contract name. Either symbol or coin must be provided.\nsymbol takes priority over coin.\n",
      
    },
    'coin': {
      type: 'string',
      description: "Settlement coin. Either symbol or coin must be provided.\nWhen used, all inactive contracts under this settlement coin switch modes.\n",
      
    },
    'mode': {
      type: 'integer',
      description: "Position mode.\n0: One-way mode (merges buy/sell into net position)\n3: Hedge mode (separate buy and sell positions)\n",
      enum: ['0', '3'],
    }
  },
  required: ['category', 'mode'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear'], demandOption: true, describe: "Product type. Only `linear` is supported in the parameter, though it affects both USDT perpetual and inverse futures positions." })
  .option('symbol', { type: 'string', describe: "Contract name. Either symbol or coin must be provided.\nsymbol takes priority over coin.\n" })
  .option('coin', { type: 'string', describe: "Settlement coin. Either symbol or coin must be provided.\nWhen used, all inactive contracts under this settlement coin switch modes.\n" })
  .option('mode', { type: 'number', choices: ['0', '3'], demandOption: true, describe: "Position mode.\n0: One-way mode (merges buy/sell into net position)\n3: Hedge mode (separate buy and sell positions)\n" })
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
  path: '/v5/position/switch-mode',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/position/switch-mode',
    
    body: { category: argv['category'], symbol: argv['symbol'], coin: argv['coin'], mode: argv['mode'] },
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
    operation: 'position switch-position-mode',
    method: 'POST',
    path: '/v5/position/switch-mode',
    params: argv,
  })
  return innerHandler(argv)
}
