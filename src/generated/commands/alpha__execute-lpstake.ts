// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'execute-lpstake'
export const describe = "Stake tokens into an LP pool"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'position-id': {
      type: 'integer',
      description: "Position ID. Use `0` to create a new position, or provide an existing position ID to add liquidity.\n",
      
    },
    'pool-address': {
      type: 'string',
      description: "Pool contract address (from getLPPoolInfo).",
      
    },
    'pay-token-amount': {
      type: 'string',
      description: "Payment token amount (positive decimal as string).",
      
    },
    'pay-token-code': {
      type: 'string',
      description: "Payment token code (e.g., \"CEX_1\" for USDT).",
      
    },
    'range-upper': {
      type: 'string',
      description: "Range order - upper limit. Use this OR priceUpper, not both.",
      
    },
    'range-lower': {
      type: 'string',
      description: "Range order - lower limit. Use this OR priceLower, not both.",
      
    },
    'price-upper': {
      type: 'string',
      description: "Price order - upper limit (price priority). Use this OR rangeUpper, not both.",
      
    },
    'price-lower': {
      type: 'string',
      description: "Price order - lower limit (price priority). Use this OR rangeLower, not both.",
      
    }
  },
  required: ['position-id', 'pool-address', 'pay-token-amount', 'pay-token-code'],
} as const

export const builder = (yargs: any) => yargs
  .option('position-id', { type: 'number', demandOption: true, describe: "Position ID. Use `0` to create a new position, or provide an existing position ID to add liquidity.\n" })
  .option('pool-address', { type: 'string', demandOption: true, describe: "Pool contract address (from getLPPoolInfo)." })
  .option('pay-token-amount', { type: 'string', demandOption: true, describe: "Payment token amount (positive decimal as string)." })
  .option('pay-token-code', { type: 'string', demandOption: true, describe: "Payment token code (e.g., \"CEX_1\" for USDT)." })
  .option('range-upper', { type: 'string', describe: "Range order - upper limit. Use this OR priceUpper, not both." })
  .option('range-lower', { type: 'string', describe: "Range order - lower limit. Use this OR priceLower, not both." })
  .option('price-upper', { type: 'string', describe: "Price order - upper limit (price priority). Use this OR rangeUpper, not both." })
  .option('price-lower', { type: 'string', describe: "Price order - lower limit (price priority). Use this OR rangeLower, not both." })
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
  path: '/v5/alpha/lp/stake',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/alpha/lp/stake',
    
    body: { positionId: argv['position-id'], poolAddress: argv['pool-address'], payTokenAmount: argv['pay-token-amount'], payTokenCode: argv['pay-token-code'], rangeUpper: argv['range-upper'], rangeLower: argv['range-lower'], priceUpper: argv['price-upper'], priceLower: argv['price-lower'] },
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
    operation: 'alpha execute-lpstake',
    method: 'POST',
    path: '/v5/alpha/lp/stake',
    params: argv,
  })
  return innerHandler(argv)
}
