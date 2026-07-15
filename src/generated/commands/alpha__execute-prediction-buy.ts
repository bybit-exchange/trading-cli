// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'execute-prediction-buy'
export const describe = "Buy prediction outcome tokens with USDC"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'token-id': {
      type: 'string',
      description: "Outcome token ID to buy (from getPredictionEventDetail).",
      
    },
    'amount': {
      type: 'string',
      description: "USDC amount to invest (positive decimal as string).",
      
    },
    'pay-token-code': {
      type: 'string',
      description: "Payment token code. Phase 1 fixed to \"USDC\".",
      
    },
    'order-type': {
      type: 'string',
      
      
    },
    'slippage': {
      type: 'string',
      description: "Maximum acceptable price slippage as decimal (e.g., \"0.05\" = 5% tolerance).",
      
    },
    'event-id': {
      type: 'string',
      description: "Event ID associated with the token.",
      
    }
  },
  required: ['token-id', 'amount', 'pay-token-code', 'order-type', 'slippage', 'event-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('token-id', { type: 'string', demandOption: true, describe: "Outcome token ID to buy (from getPredictionEventDetail)." })
  .option('amount', { type: 'string', demandOption: true, describe: "USDC amount to invest (positive decimal as string)." })
  .option('pay-token-code', { type: 'string', demandOption: true, describe: "Payment token code. Phase 1 fixed to \"USDC\"." })
  .option('order-type', { type: 'string', demandOption: true })
  .option('slippage', { type: 'string', demandOption: true, describe: "Maximum acceptable price slippage as decimal (e.g., \"0.05\" = 5% tolerance)." })
  .option('event-id', { type: 'string', demandOption: true, describe: "Event ID associated with the token." })
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
  path: '/v5/alpha/prediction/buy',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/prediction/buy',
    
    body: { tokenId: argv['token-id'], amount: argv['amount'], payTokenCode: argv['pay-token-code'], orderType: argv['order-type'], slippage: argv['slippage'], eventId: argv['event-id'] },
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
    operation: 'alpha execute-prediction-buy',
    method: 'POST',
    path: '/v5/alpha/prediction/buy',
    params: argv,
  })
  return innerHandler(argv)
}
