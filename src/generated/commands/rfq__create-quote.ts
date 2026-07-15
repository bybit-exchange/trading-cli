// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-quote'
export const describe = "Create Quote"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'rfq-id': {
      type: 'string',
      description: "The inquiry ID of the RFQ to quote against.",
      
    },
    'quote-link-id': {
      type: 'string',
      description: "Custom quote identifier (1-32 characters, letters and numbers only, case-sensitive).\n",
      
    },
    'anonymous': {
      type: 'boolean',
      description: "Whether to hide the quoter's identity. Defaults to false.",
      
    },
    'expire-in': {
      type: 'integer',
      description: "Quote duration in seconds. Range [10, 120]. Default 60.",
      
    },
    'quote-buy-list': {
      type: 'string',
      description: "Buy direction quote legs. Maker execution matches the leg direction.\nAt least one of quoteBuyList or quoteSellList is required.\n",
      
    },
    'quote-sell-list': {
      type: 'string',
      description: "Sell direction quote legs. Maker execution is opposite to the leg direction.\nAt least one of quoteBuyList or quoteSellList is required.\n",
      
    }
  },
  required: ['rfq-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('rfq-id', { type: 'string', demandOption: true, describe: "The inquiry ID of the RFQ to quote against." })
  .option('quote-link-id', { type: 'string', describe: "Custom quote identifier (1-32 characters, letters and numbers only, case-sensitive).\n" })
  .option('anonymous', { type: 'boolean', describe: "Whether to hide the quoter's identity. Defaults to false." })
  .option('expire-in', { type: 'number', describe: "Quote duration in seconds. Range [10, 120]. Default 60." })
  .option('quote-buy-list', { type: 'string', describe: "Buy direction quote legs. Maker execution matches the leg direction.\nAt least one of quoteBuyList or quoteSellList is required.\n" })
  .option('quote-sell-list', { type: 'string', describe: "Sell direction quote legs. Maker execution is opposite to the leg direction.\nAt least one of quoteBuyList or quoteSellList is required.\n" })
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
  path: '/v5/rfq/create-quote',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/rfq/create-quote',
    
    body: { rfqId: argv['rfq-id'], quoteLinkId: argv['quote-link-id'], anonymous: argv['anonymous'], expireIn: argv['expire-in'], quoteBuyList: argv['quote-buy-list'], quoteSellList: argv['quote-sell-list'] },
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
    operation: 'rfq create-quote',
    method: 'POST',
    path: '/v5/rfq/create-quote',
    params: argv,
  })
  return innerHandler(argv)
}
