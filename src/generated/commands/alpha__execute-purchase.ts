// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'execute-purchase'
export const describe = "Execute a buy order to purchase on-chain tokens with USDT/USDC, returns order number"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'from-token-code': {
      type: 'string',
      description: "Payment token code (`CEX_<id>`, e.g. `CEX_1` for USDT). Must match the quote request.",
      
    },
    'from-token-amount': {
      type: 'string',
      description: "Payment amount (positive decimal as string). Must match the quote request.",
      
    },
    'to-token-code': {
      type: 'string',
      description: "Target on-chain token code (`DEX_<id>`). Must match the quote request.",
      
    },
    'slippage': {
      type: 'string',
      description: "Slippage tolerance as decimal.\n- `0.005` = 0.5%\n- `0.01` = 1%\n- `0.05` = 5%\n",
      
    },
    'quote-data': {
      type: 'string',
      description: "Base64-encoded quote data. **Must pass as-is from `/quote` response.**",
      
    },
    'gas': {
      type: 'string',
      description: "Estimated gas fee. **Must pass as-is from `/quote` response.**",
      
    },
    'quote-mode': {
      type: 'integer',
      description: "Quote mode. Must be consistent with the `/quote` request.\n- `0`: Auto\n- `1`: Price Priority\n- `2`: Success Rate Priority\n",
      enum: ['0', '1', '2'],
    },
    'correcting-code': {
      type: 'string',
      description: "MD5 checksum for data integrity. **Must pass as-is from `/quote` response.**",
      
    },
    'tenant': {
      type: 'string',
      description: "Optional tenant identifier.",
      
    }
  },
  required: ['from-token-code', 'from-token-amount', 'to-token-code', 'slippage', 'quote-data', 'gas', 'quote-mode', 'correcting-code'],
} as const

export const builder = (yargs: any) => yargs
  .option('from-token-code', { type: 'string', demandOption: true, describe: "Payment token code (`CEX_<id>`, e.g. `CEX_1` for USDT). Must match the quote request." })
  .option('from-token-amount', { type: 'string', demandOption: true, describe: "Payment amount (positive decimal as string). Must match the quote request." })
  .option('to-token-code', { type: 'string', demandOption: true, describe: "Target on-chain token code (`DEX_<id>`). Must match the quote request." })
  .option('slippage', { type: 'string', demandOption: true, describe: "Slippage tolerance as decimal.\n- `0.005` = 0.5%\n- `0.01` = 1%\n- `0.05` = 5%\n" })
  .option('quote-data', { type: 'string', demandOption: true, describe: "Base64-encoded quote data. **Must pass as-is from `/quote` response.**" })
  .option('gas', { type: 'string', demandOption: true, describe: "Estimated gas fee. **Must pass as-is from `/quote` response.**" })
  .option('quote-mode', { type: 'number', choices: ['0', '1', '2'], demandOption: true, describe: "Quote mode. Must be consistent with the `/quote` request.\n- `0`: Auto\n- `1`: Price Priority\n- `2`: Success Rate Priority\n" })
  .option('correcting-code', { type: 'string', demandOption: true, describe: "MD5 checksum for data integrity. **Must pass as-is from `/quote` response.**" })
  .option('tenant', { type: 'string', describe: "Optional tenant identifier." })
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
  path: '/v5/alpha/trade/purchase',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/trade/purchase',
    
    body: { fromTokenCode: argv['from-token-code'], fromTokenAmount: argv['from-token-amount'], toTokenCode: argv['to-token-code'], slippage: argv['slippage'], quoteData: argv['quote-data'], gas: argv['gas'], quoteMode: argv['quote-mode'], correctingCode: argv['correcting-code'], tenant: argv['tenant'] },
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
    operation: 'alpha execute-purchase',
    method: 'POST',
    path: '/v5/alpha/trade/purchase',
    params: argv,
  })
  return innerHandler(argv)
}
