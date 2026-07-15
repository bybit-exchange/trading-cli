// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'post-ad'
export const describe = "Post Ad"
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
      description: "Buying or selling the token. 0: buy; 1: sell",
      enum: ['0', '1'],
    },
    'price-type': {
      type: 'string',
      description: "Ad pricing model. 0: fixed rate; 1: variable rate",
      enum: ['0', '1'],
    },
    'premium': {
      type: 'string',
      description: "The premium applied to the reference price. E.g. a value of 130 means 130% of the reference price",
      
    },
    'price': {
      type: 'string',
      description: "Price",
      
    },
    'min-amount': {
      type: 'string',
      description: "Min transaction amount",
      
    },
    'max-amount': {
      type: 'string',
      description: "Max transaction amount",
      
    },
    'remark': {
      type: 'string',
      description: "Advertisement description (max length 900)",
      
    },
    'trading-preference-set': {
      type: 'string',
      
      
    },
    'payment-ids': {
      type: 'string',
      description: "Payment method type ID (max 5 items). Use Get User Payment to get id of a payment method added to your account.",
      
    },
    'quantity': {
      type: 'string',
      description: "Amount of tokens in an advertisement",
      
    },
    'payment-period': {
      type: 'string',
      description: "Payment period (unit minutes)",
      
    },
    'item-type': {
      type: 'string',
      description: "ORIGIN: original P2P advertisement; BULK: bulk advertisement",
      enum: ['ORIGIN', 'BULK'],
    }
  },
  required: ['token-id', 'currency-id', 'side', 'price-type', 'premium', 'price', 'min-amount', 'max-amount', 'remark', 'trading-preference-set', 'payment-ids', 'quantity', 'payment-period', 'item-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('token-id', { type: 'string', demandOption: true, describe: "Token ID. E.g. USDT, ETH, BTC" })
  .option('currency-id', { type: 'string', demandOption: true, describe: "Currency ID. E.g. HKD, USD, EUR" })
  .option('side', { type: 'string', choices: ['0', '1'], demandOption: true, describe: "Buying or selling the token. 0: buy; 1: sell" })
  .option('price-type', { type: 'string', choices: ['0', '1'], demandOption: true, describe: "Ad pricing model. 0: fixed rate; 1: variable rate" })
  .option('premium', { type: 'string', demandOption: true, describe: "The premium applied to the reference price. E.g. a value of 130 means 130% of the reference price" })
  .option('price', { type: 'string', demandOption: true, describe: "Price" })
  .option('min-amount', { type: 'string', demandOption: true, describe: "Min transaction amount" })
  .option('max-amount', { type: 'string', demandOption: true, describe: "Max transaction amount" })
  .option('remark', { type: 'string', demandOption: true, describe: "Advertisement description (max length 900)" })
  .option('trading-preference-set', { type: 'string', demandOption: true })
  .option('payment-ids', { type: 'string', demandOption: true, describe: "Payment method type ID (max 5 items). Use Get User Payment to get id of a payment method added to your account." })
  .option('quantity', { type: 'string', demandOption: true, describe: "Amount of tokens in an advertisement" })
  .option('payment-period', { type: 'string', demandOption: true, describe: "Payment period (unit minutes)" })
  .option('item-type', { type: 'string', choices: ['ORIGIN', 'BULK'], demandOption: true, describe: "ORIGIN: original P2P advertisement; BULK: bulk advertisement" })
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
  path: '/v5/p2p/item/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/p2p/item/create',
    
    body: { tokenId: argv['token-id'], currencyId: argv['currency-id'], side: argv['side'], priceType: argv['price-type'], premium: argv['premium'], price: argv['price'], minAmount: argv['min-amount'], maxAmount: argv['max-amount'], remark: argv['remark'], tradingPreferenceSet: argv['trading-preference-set'], paymentIds: argv['payment-ids'], quantity: argv['quantity'], paymentPeriod: argv['payment-period'], itemType: argv['item-type'] },
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
    operation: 'p2p post-ad',
    method: 'POST',
    path: '/v5/p2p/item/create',
    params: argv,
  })
  return innerHandler(argv)
}
