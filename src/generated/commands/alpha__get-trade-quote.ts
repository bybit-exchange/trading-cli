// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-trade-quote'
export const describe = "Get estimated price, fees, slippage, and gas for an on-chain token trade"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'trade-type': {
      type: 'integer',
      description: "Trade type.\n- `1`: Purchase (buy on-chain token with payment token)\n- `2`: Redeem (sell on-chain token for payment token)\n",
      enum: ['1', '2'],
    },
    'from-token-code': {
      type: 'string',
      description: "Source token code. Format: `CEX_<id>` or `DEX_<id>`.\n- Purchase: CEX token code (e.g. `CEX_1` for USDT). Get from `getPayTokenList`.\n- Redeem: DEX token code (e.g. `DEX_123`). Get from `getBizTokenList` or `getAssetList`.\n",
      
    },
    'from-token-amount': {
      type: 'string',
      description: "Amount to pay (string-formatted positive decimal for precision). Must be greater than 0.",
      
    },
    'to-token-code': {
      type: 'string',
      description: "Target token code. Format: `CEX_<id>` or `DEX_<id>`.\n- Purchase: DEX token code (e.g. `DEX_123`). Get from `getBizTokenList`.\n- Redeem: CEX token code (e.g. `CEX_1` for USDT). Get from `getPayTokenList`.\n",
      
    },
    'quote-mode': {
      type: 'integer',
      description: "Quote mode.\n- `0`: Auto (default) - system selects optimal mode\n- `1`: Price Priority - best price, may have higher failure rate\n- `2`: Success Rate Priority - guaranteed execution, price may be slightly worse\n",
      enum: ['0', '1', '2'],
    }
  },
  required: ['trade-type', 'from-token-code', 'from-token-amount', 'to-token-code'],
} as const

export const builder = (yargs: any) => yargs
  .option('trade-type', { type: 'number', choices: ['1', '2'], demandOption: true, describe: "Trade type.\n- `1`: Purchase (buy on-chain token with payment token)\n- `2`: Redeem (sell on-chain token for payment token)\n" })
  .option('from-token-code', { type: 'string', demandOption: true, describe: "Source token code. Format: `CEX_<id>` or `DEX_<id>`.\n- Purchase: CEX token code (e.g. `CEX_1` for USDT). Get from `getPayTokenList`.\n- Redeem: DEX token code (e.g. `DEX_123`). Get from `getBizTokenList` or `getAssetList`.\n" })
  .option('from-token-amount', { type: 'string', demandOption: true, describe: "Amount to pay (string-formatted positive decimal for precision). Must be greater than 0." })
  .option('to-token-code', { type: 'string', demandOption: true, describe: "Target token code. Format: `CEX_<id>` or `DEX_<id>`.\n- Purchase: DEX token code (e.g. `DEX_123`). Get from `getBizTokenList`.\n- Redeem: CEX token code (e.g. `CEX_1` for USDT). Get from `getPayTokenList`.\n" })
  .option('quote-mode', { type: 'number', choices: ['0', '1', '2'], describe: "Quote mode.\n- `0`: Auto (default) - system selects optimal mode\n- `1`: Price Priority - best price, may have higher failure rate\n- `2`: Success Rate Priority - guaranteed execution, price may be slightly worse\n" })
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
  path: '/v5/alpha/trade/quote',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/trade/quote',
    
    body: { tradeType: argv['trade-type'], fromTokenCode: argv['from-token-code'], fromTokenAmount: argv['from-token-amount'], toTokenCode: argv['to-token-code'], quoteMode: argv['quote-mode'] },
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
    operation: 'alpha get-trade-quote',
    method: 'POST',
    path: '/v5/alpha/trade/quote',
    params: argv,
  })
  return innerHandler(argv)
}
