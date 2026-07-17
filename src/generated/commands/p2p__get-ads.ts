// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-ads'
export const describe = "Get Ads"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'token-id': {
      type: 'string',
      description: "Token ID. E.g. USDT, ETH, BTC",
      
    },
    'currency-id': {
      type: 'string',
      description: "Currency ID. E.g. HKD, USD, EUR",
      
    },
    'side': {
      type: 'string',
      description: "0: buy; 1: sell",
      enum: ['0', '1'],
    },
    'page': {
      type: 'string',
      description: "Page number. Default value is 1",
      
    },
    'size': {
      type: 'string',
      description: "Page size. Default value is 10, max is 30",
      
    }
  },
  required: ['token-id', 'currency-id', 'side'],
} as const

export const builder = (yargs: any) => yargs
  .option('token-id', { type: 'string', demandOption: true, describe: "Token ID. E.g. USDT, ETH, BTC" })
  .option('currency-id', { type: 'string', demandOption: true, describe: "Currency ID. E.g. HKD, USD, EUR" })
  .option('side', { type: 'string', choices: ['0', '1'], demandOption: true, describe: "0: buy; 1: sell" })
  .option('page', { type: 'string', describe: "Page number. Default value is 1" })
  .option('size', { type: 'string', describe: "Page size. Default value is 10, max is 30" })
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
  path: '/v5/p2p/item/online',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/p2p/item/online',
    
    body: { tokenId: argv['token-id'], currencyId: argv['currency-id'], side: argv['side'], page: argv['page'], size: argv['size'] },
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
    operation: 'p2p get-ads',
    method: 'POST',
    path: '/v5/p2p/item/online',
    params: argv,
  })
  return innerHandler(argv)
}
