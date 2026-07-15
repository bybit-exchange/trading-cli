// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'apply-quote'
export const describe = "Request a Quote"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'from-coin': {
      type: 'string',
      description: "Convert from coin (coin to sell)",
      
    },
    'from-coin-type': {
      type: 'string',
      description: "From coin type",
      enum: ['fiat', 'crypto'],
    },
    'to-coin': {
      type: 'string',
      description: "Convert to coin (coin to buy)",
      
    },
    'to-coin-type': {
      type: 'string',
      description: "To coin type",
      enum: ['fiat', 'crypto'],
    },
    'request-amount': {
      type: 'string',
      description: "Request coin amount (the amount you want to sell)",
      
    },
    'request-coin-type': {
      type: 'string',
      description: "Coin type you want to sell, defaults to fiat",
      enum: ['fiat', 'crypto'],
    }
  },
  required: ['from-coin', 'from-coin-type', 'to-coin', 'to-coin-type', 'request-amount'],
} as const

export const builder = (yargs: any) => yargs
  .option('from-coin', { type: 'string', demandOption: true, describe: "Convert from coin (coin to sell)" })
  .option('from-coin-type', { type: 'string', choices: ['fiat', 'crypto'], demandOption: true, describe: "From coin type" })
  .option('to-coin', { type: 'string', demandOption: true, describe: "Convert to coin (coin to buy)" })
  .option('to-coin-type', { type: 'string', choices: ['fiat', 'crypto'], demandOption: true, describe: "To coin type" })
  .option('request-amount', { type: 'string', demandOption: true, describe: "Request coin amount (the amount you want to sell)" })
  .option('request-coin-type', { type: 'string', choices: ['fiat', 'crypto'], describe: "Coin type you want to sell, defaults to fiat" })
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
  path: '/v5/fiat/quote-apply',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/fiat/quote-apply',
    
    body: { fromCoin: argv['from-coin'], fromCoinType: argv['from-coin-type'], toCoin: argv['to-coin'], toCoinType: argv['to-coin-type'], requestAmount: argv['request-amount'], requestCoinType: argv['request-coin-type'] },
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
    operation: 'fiat apply-quote',
    method: 'POST',
    path: '/v5/fiat/quote-apply',
    params: argv,
  })
  return innerHandler(argv)
}
