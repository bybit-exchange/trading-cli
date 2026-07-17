// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'execute-lpredeem'
export const describe = "Redeem (withdraw) liquidity from a position"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'position-id': {
      type: 'integer',
      description: "Position ID (from getLPPositionList).",
      
    },
    'pool-address': {
      type: 'string',
      description: "Pool contract address.",
      
    },
    'derc-ratio': {
      type: 'string',
      description: "Reduction ratio (0-1).\n- \"0.25\" = redeem 25%\n- \"0.5\" = redeem 50%\n- \"1\" = close entire position (redeem 100%)\n",
      
    },
    'receive-token-code': {
      type: 'string',
      description: "Token code for receiving the redeemed amount.",
      
    }
  },
  required: ['position-id', 'pool-address', 'derc-ratio'],
} as const

export const builder = (yargs: any) => yargs
  .option('position-id', { type: 'number', demandOption: true, describe: "Position ID (from getLPPositionList)." })
  .option('pool-address', { type: 'string', demandOption: true, describe: "Pool contract address." })
  .option('derc-ratio', { type: 'string', demandOption: true, describe: "Reduction ratio (0-1).\n- \"0.25\" = redeem 25%\n- \"0.5\" = redeem 50%\n- \"1\" = close entire position (redeem 100%)\n" })
  .option('receive-token-code', { type: 'string', describe: "Token code for receiving the redeemed amount." })
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
  path: '/v5/alpha/lp/redeem',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/lp/redeem',
    
    body: { positionId: argv['position-id'], poolAddress: argv['pool-address'], dercRatio: argv['derc-ratio'], receiveTokenCode: argv['receive-token-code'] },
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
    operation: 'alpha execute-lpredeem',
    method: 'POST',
    path: '/v5/alpha/lp/redeem',
    params: argv,
  })
  return innerHandler(argv)
}
