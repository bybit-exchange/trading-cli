// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-prediction-order-estimate'
export const describe = "Estimate buy or sell order fill amount and fees before execution"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'token-id': {
      type: 'string',
      description: "Outcome token ID (from getPredictionEventDetail or getPredictionMarketList).",
      
    },
    'side': {
      type: 'string',
      
      
    },
    'event-id': {
      type: 'string',
      description: "Event ID associated with this token.",
      
    },
    'amount': {
      type: 'string',
      description: "For BUY: USDC amount to invest (e.g., \"100\").\nFor SELL: number of shares to sell (e.g., \"50\").\n",
      
    },
    'order-type': {
      type: 'string',
      
      
    },
    'pay-token-code': {
      type: 'string',
      description: "Payment token code. Required for BUY. Phase 1 fixed to \"USDC\".",
      
    }
  },
  required: ['token-id', 'side', 'event-id', 'amount', 'order-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('token-id', { type: 'string', demandOption: true, describe: "Outcome token ID (from getPredictionEventDetail or getPredictionMarketList)." })
  .option('side', { type: 'string', demandOption: true })
  .option('event-id', { type: 'string', demandOption: true, describe: "Event ID associated with this token." })
  .option('amount', { type: 'string', demandOption: true, describe: "For BUY: USDC amount to invest (e.g., \"100\").\nFor SELL: number of shares to sell (e.g., \"50\").\n" })
  .option('order-type', { type: 'string', demandOption: true })
  .option('pay-token-code', { type: 'string', describe: "Payment token code. Required for BUY. Phase 1 fixed to \"USDC\"." })
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
  path: '/v5/alpha/prediction/order-estimate',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/prediction/order-estimate',
    
    body: { tokenId: argv['token-id'], side: argv['side'], eventId: argv['event-id'], amount: argv['amount'], orderType: argv['order-type'], payTokenCode: argv['pay-token-code'] },
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
    operation: 'alpha get-prediction-order-estimate',
    method: 'POST',
    path: '/v5/alpha/prediction/order-estimate',
    params: argv,
  })
  return innerHandler(argv)
}
