// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'execute-prediction-sell'
export const describe = "Sell prediction outcome token shares for USDC"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'token-id': {
      type: 'string',
      description: "Outcome token ID to sell (from getPredictionPositionList).",
      
    },
    'size': {
      type: 'string',
      description: "Number of shares to sell (positive decimal as string).",
      
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
      
    },
    'to-token-code': {
      type: 'string',
      description: "Destination token code. Phase 1 fixed to \"USDC\".",
      
    }
  },
  required: ['token-id', 'size', 'order-type', 'slippage', 'event-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('token-id', { type: 'string', demandOption: true, describe: "Outcome token ID to sell (from getPredictionPositionList)." })
  .option('size', { type: 'string', demandOption: true, describe: "Number of shares to sell (positive decimal as string)." })
  .option('order-type', { type: 'string', demandOption: true })
  .option('slippage', { type: 'string', demandOption: true, describe: "Maximum acceptable price slippage as decimal (e.g., \"0.05\" = 5% tolerance)." })
  .option('event-id', { type: 'string', demandOption: true, describe: "Event ID associated with the token." })
  .option('to-token-code', { type: 'string', describe: "Destination token code. Phase 1 fixed to \"USDC\"." })
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
  path: '/v5/alpha/prediction/sell',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/prediction/sell',
    
    body: { tokenId: argv['token-id'], size: argv['size'], orderType: argv['order-type'], slippage: argv['slippage'], eventId: argv['event-id'], toTokenCode: argv['to-token-code'] },
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
    operation: 'alpha execute-prediction-sell',
    method: 'POST',
    path: '/v5/alpha/prediction/sell',
    params: argv,
  })
  return innerHandler(argv)
}
