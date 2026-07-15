// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'cancel-quote'
export const describe = "Cancel Quote"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'quote-id': {
      type: 'string',
      description: "System-assigned quote ID. Highest priority if multiple identifiers are provided.\n",
      
    },
    'rfq-id': {
      type: 'string',
      description: "Inquiry ID. Lowest priority. When used alone, cancels all quotes for the specified RFQ.\n",
      
    },
    'quote-link-id': {
      type: 'string',
      description: "Custom quote ID set during quote creation. Medium priority.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('quote-id', { type: 'string', describe: "System-assigned quote ID. Highest priority if multiple identifiers are provided.\n" })
  .option('rfq-id', { type: 'string', describe: "Inquiry ID. Lowest priority. When used alone, cancels all quotes for the specified RFQ.\n" })
  .option('quote-link-id', { type: 'string', describe: "Custom quote ID set during quote creation. Medium priority." })
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
  path: '/v5/rfq/cancel-quote',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/rfq/cancel-quote',
    
    body: { quoteId: argv['quote-id'], rfqId: argv['rfq-id'], quoteLinkId: argv['quote-link-id'] },
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
    operation: 'rfq cancel-quote',
    method: 'POST',
    path: '/v5/rfq/cancel-quote',
    params: argv,
  })
  return innerHandler(argv)
}
