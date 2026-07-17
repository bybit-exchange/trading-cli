// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'update-ad'
export const describe = "Update / Relist Ad"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'id': {
      type: 'string',
      description: "Advertisement ID",
      
    },
    'price-type': {
      type: 'string',
      description: "Ad pricing model. 0: fixed rate; 1: variable rate",
      enum: ['0', '1'],
    },
    'premium': {
      type: 'string',
      description: "The premium applied to the reference price",
      
    },
    'price': {
      type: 'string',
      description: "Price per token, in currency",
      
    },
    'min-amount': {
      type: 'string',
      description: "Min transaction amount in currency",
      
    },
    'max-amount': {
      type: 'string',
      description: "Max transaction amount in currency",
      
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
      description: "Payment method type ID (max 5 items)",
      
    },
    'action-type': {
      type: 'string',
      description: "Operation type. MODIFY: modify ad; ACTIVE: reonline adv",
      enum: ['MODIFY', 'ACTIVE'],
    },
    'quantity': {
      type: 'string',
      description: "Number of tokens in an advertisement",
      
    },
    'payment-period': {
      type: 'string',
      description: "Payment period (unit minutes)",
      
    }
  },
  required: ['id', 'price-type', 'premium', 'price', 'min-amount', 'max-amount', 'remark', 'trading-preference-set', 'payment-ids', 'action-type', 'quantity', 'payment-period'],
} as const

export const builder = (yargs: any) => yargs
  .option('id', { type: 'string', demandOption: true, describe: "Advertisement ID" })
  .option('price-type', { type: 'string', choices: ['0', '1'], demandOption: true, describe: "Ad pricing model. 0: fixed rate; 1: variable rate" })
  .option('premium', { type: 'string', demandOption: true, describe: "The premium applied to the reference price" })
  .option('price', { type: 'string', demandOption: true, describe: "Price per token, in currency" })
  .option('min-amount', { type: 'string', demandOption: true, describe: "Min transaction amount in currency" })
  .option('max-amount', { type: 'string', demandOption: true, describe: "Max transaction amount in currency" })
  .option('remark', { type: 'string', demandOption: true, describe: "Advertisement description (max length 900)" })
  .option('trading-preference-set', { type: 'string', demandOption: true })
  .option('payment-ids', { type: 'string', demandOption: true, describe: "Payment method type ID (max 5 items)" })
  .option('action-type', { type: 'string', choices: ['MODIFY', 'ACTIVE'], demandOption: true, describe: "Operation type. MODIFY: modify ad; ACTIVE: reonline adv" })
  .option('quantity', { type: 'string', demandOption: true, describe: "Number of tokens in an advertisement" })
  .option('payment-period', { type: 'string', demandOption: true, describe: "Payment period (unit minutes)" })
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
  path: '/v5/p2p/item/update',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/p2p/item/update',
    
    body: { id: argv['id'], priceType: argv['price-type'], premium: argv['premium'], price: argv['price'], minAmount: argv['min-amount'], maxAmount: argv['max-amount'], remark: argv['remark'], tradingPreferenceSet: argv['trading-preference-set'], paymentIds: argv['payment-ids'], actionType: argv['action-type'], quantity: argv['quantity'], paymentPeriod: argv['payment-period'] },
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
    operation: 'p2p update-ad',
    method: 'POST',
    path: '/v5/p2p/item/update',
    params: argv,
  })
  return innerHandler(argv)
}
