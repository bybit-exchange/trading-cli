// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'execute-quote'
export const describe = "Execute Quote"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'rfq-id': {
      type: 'string',
      description: "The inquiry ID of the RFQ.",
      
    },
    'quote-id': {
      type: 'string',
      description: "The quote ID to execute.",
      
    },
    'quote-side': {
      type: 'string',
      description: "Direction of the quote to execute. Maker execution matches the leg direction;\ntaker direction is opposite.\n",
      enum: ['Buy', 'Sell'],
    }
  },
  required: ['rfq-id', 'quote-id', 'quote-side'],
} as const

export const builder = (yargs: any) => yargs
  .option('rfq-id', { type: 'string', demandOption: true, describe: "The inquiry ID of the RFQ." })
  .option('quote-id', { type: 'string', demandOption: true, describe: "The quote ID to execute." })
  .option('quote-side', { type: 'string', choices: ['Buy', 'Sell'], demandOption: true, describe: "Direction of the quote to execute. Maker execution matches the leg direction;\ntaker direction is opposite.\n" })
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
  path: '/v5/rfq/execute-quote',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/rfq/execute-quote',
    
    body: { rfqId: argv['rfq-id'], quoteId: argv['quote-id'], quoteSide: argv['quote-side'] },
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
    operation: 'rfq execute-quote',
    method: 'POST',
    path: '/v5/rfq/execute-quote',
    params: argv,
  })
  return innerHandler(argv)
}
