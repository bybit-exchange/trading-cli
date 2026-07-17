// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-dcabot'
export const describe = "Create a new DCA (Dollar-Cost Averaging) bot with custom parameters"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'parameters': {
      type: 'string',
      description: "DCA bot configuration parameters.",
      
    },
    'tools-discovery-parameter': {
      type: 'string',
      description: "Optional. Recommended parameters from ToolDiscovery. Pass only when redirected from ToolDiscovery.",
      
    },
    'channel': {
      type: 'string',
      description: "Optional. Source page channel identifier.",
      
    }
  },
  required: ['parameters'],
} as const

export const builder = (yargs: any) => yargs
  .option('parameters', { type: 'string', demandOption: true, describe: "DCA bot configuration parameters." })
  .option('tools-discovery-parameter', { type: 'string', describe: "Optional. Recommended parameters from ToolDiscovery. Pass only when redirected from ToolDiscovery." })
  .option('channel', { type: 'string', describe: "Optional. Source page channel identifier." })
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
  path: '/v5/dca/create-bot',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/dca/create-bot',
    
    body: { parameters: argv['parameters'], toolsDiscoveryParameter: argv['tools-discovery-parameter'], channel: argv['channel'] },
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
    operation: 'dca create-dcabot',
    method: 'POST',
    path: '/v5/dca/create-bot',
    params: argv,
  })
  return innerHandler(argv)
}
