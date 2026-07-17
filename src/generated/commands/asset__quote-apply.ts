// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'quote-apply'
export const describe = "Apply quote"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'request-id': {
      type: 'string',
      description: "Customised request ID, max 36 characters (optional, for idempotency)",
      
    },
    'account-type': {
      type: 'string',
      description: "Wallet type (required)",
      
    },
    'from-coin': {
      type: 'string',
      description: "Convert from coin (coin to sell), required",
      
    },
    'from-coin-type': {
      type: 'string',
      description: "From coin type. Default: crypto",
      
    },
    'to-coin': {
      type: 'string',
      description: "Convert to coin (coin to buy), required",
      
    },
    'to-coin-type': {
      type: 'string',
      description: "To coin type. Default: crypto",
      
    },
    'request-amount': {
      type: 'string',
      description: "Request coin amount (the amount you want to sell), required",
      
    },
    'request-coin': {
      type: 'string',
      description: "Request coin, same as fromCoin, required",
      
    },
    'param-type': {
      type: 'string',
      description: "Extended parameter type. opFrom: mainly used for API broker user",
      
    },
    'param-value': {
      type: 'string',
      description: "Broker ID, mainly used for API broker user",
      
    }
  },
  required: ['account-type', 'from-coin', 'to-coin', 'request-amount', 'request-coin'],
} as const

export const builder = (yargs: any) => yargs
  .option('request-id', { type: 'string', describe: "Customised request ID, max 36 characters (optional, for idempotency)" })
  .option('account-type', { type: 'string', demandOption: true, describe: "Wallet type (required)" })
  .option('from-coin', { type: 'string', demandOption: true, describe: "Convert from coin (coin to sell), required" })
  .option('from-coin-type', { type: 'string', describe: "From coin type. Default: crypto" })
  .option('to-coin', { type: 'string', demandOption: true, describe: "Convert to coin (coin to buy), required" })
  .option('to-coin-type', { type: 'string', describe: "To coin type. Default: crypto" })
  .option('request-amount', { type: 'string', demandOption: true, describe: "Request coin amount (the amount you want to sell), required" })
  .option('request-coin', { type: 'string', demandOption: true, describe: "Request coin, same as fromCoin, required" })
  .option('param-type', { type: 'string', describe: "Extended parameter type. opFrom: mainly used for API broker user" })
  .option('param-value', { type: 'string', describe: "Broker ID, mainly used for API broker user" })
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
  path: '/v5/asset/exchange/quote-apply',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/asset/exchange/quote-apply',
    
    body: { requestId: argv['request-id'], accountType: argv['account-type'], fromCoin: argv['from-coin'], fromCoinType: argv['from-coin-type'], toCoin: argv['to-coin'], toCoinType: argv['to-coin-type'], requestAmount: argv['request-amount'], requestCoin: argv['request-coin'], paramType: argv['param-type'], paramValue: argv['param-value'] },
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
    operation: 'asset quote-apply',
    method: 'POST',
    path: '/v5/asset/exchange/quote-apply',
    params: argv,
  })
  return innerHandler(argv)
}
