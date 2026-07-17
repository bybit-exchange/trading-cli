// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-rfq'
export const describe = "Create RFQ"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'counterparties': {
      type: 'string',
      description: "List of counterparty deskCodes to receive the RFQ.",
      
    },
    'rfq-link-id': {
      type: 'string',
      description: "Custom RFQ identifier (1-32 characters, letters and numbers only).\nExpires after three months and is reusable afterward.\n",
      
    },
    'anonymous': {
      type: 'boolean',
      description: "Whether the inquiry hides the inquirer's identity. Defaults to false.",
      
    },
    'strategy-type': {
      type: 'string',
      description: "Strategy type label. Use \"custom\" for custom inquiries or a system combination type\n(e.g., FundingRate, CarryTrade). Defaults to \"custom\".\n",
      
    },
    'list': {
      type: 'string',
      description: "Array of leg objects defining the combination trade.\nMaximum length is determined by the Get RFQ Config endpoint (maxLegs).\n",
      
    }
  },
  required: ['counterparties', 'list'],
} as const

export const builder = (yargs: any) => yargs
  .option('counterparties', { type: 'string', demandOption: true, describe: "List of counterparty deskCodes to receive the RFQ." })
  .option('rfq-link-id', { type: 'string', describe: "Custom RFQ identifier (1-32 characters, letters and numbers only).\nExpires after three months and is reusable afterward.\n" })
  .option('anonymous', { type: 'boolean', describe: "Whether the inquiry hides the inquirer's identity. Defaults to false." })
  .option('strategy-type', { type: 'string', describe: "Strategy type label. Use \"custom\" for custom inquiries or a system combination type\n(e.g., FundingRate, CarryTrade). Defaults to \"custom\".\n" })
  .option('list', { type: 'string', demandOption: true, describe: "Array of leg objects defining the combination trade.\nMaximum length is determined by the Get RFQ Config endpoint (maxLegs).\n" })
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
  path: '/v5/rfq/create-rfq',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/rfq/create-rfq',
    
    body: { counterparties: argv['counterparties'], rfqLinkId: argv['rfq-link-id'], anonymous: argv['anonymous'], strategyType: argv['strategy-type'], list: argv['list'] },
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
    operation: 'rfq create-rfq',
    method: 'POST',
    path: '/v5/rfq/create-rfq',
    params: argv,
  })
  return innerHandler(argv)
}
