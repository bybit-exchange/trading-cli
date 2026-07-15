// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'small-asset-quote'
export const describe = "Small asset get quote"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Wallet type. Only supports eb_convert_uta (Unified wallet)",
      
    },
    'to-coin': {
      type: 'string',
      description: "Target currency. Each request supports one of: MNT, USDT, or USDC",
      
    },
    'from-coin-list': {
      type: 'string',
      description: "Source currency list, e.g. [\"BTC\",\"XRP\",\"ETH\"]. Up to 20 coins per transaction",
      
    }
  },
  required: ['account-type', 'to-coin', 'from-coin-list'],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', demandOption: true, describe: "Wallet type. Only supports eb_convert_uta (Unified wallet)" })
  .option('to-coin', { type: 'string', demandOption: true, describe: "Target currency. Each request supports one of: MNT, USDT, or USDC" })
  .option('from-coin-list', { type: 'string', demandOption: true, describe: "Source currency list, e.g. [\"BTC\",\"XRP\",\"ETH\"]. Up to 20 coins per transaction" })
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
  path: '/v5/asset/covert/get-quote',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/asset/covert/get-quote',
    
    body: { accountType: argv['account-type'], toCoin: argv['to-coin'], fromCoinList: argv['from-coin-list'] },
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
    operation: 'asset small-asset-quote',
    method: 'POST',
    path: '/v5/asset/covert/get-quote',
    params: argv,
  })
  return innerHandler(argv)
}
