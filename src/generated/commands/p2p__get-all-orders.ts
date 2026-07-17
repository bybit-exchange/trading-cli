// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'get-all-orders'
export const describe = "Get All Orders"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'page': {
      type: 'integer',
      description: "Page number to query",
      
    },
    'size': {
      type: 'integer',
      description: "Rows to query per page, max is 30",
      
    },
    'status': {
      type: 'integer',
      description: "Order status filter (see OrderItem.status for values)",
      
    },
    'begin-time': {
      type: 'string',
      description: "Begin time",
      
    },
    'end-time': {
      type: 'string',
      description: "End time",
      
    },
    'token-id': {
      type: 'string',
      description: "Token id",
      
    },
    'side': {
      type: 'integer',
      description: "0: Buy, 1: Sell",
      
    }
  },
  required: ['page', 'size'],
} as const

export const builder = (yargs: any) => yargs
  .option('page', { type: 'number', demandOption: true, describe: "Page number to query" })
  .option('size', { type: 'number', demandOption: true, describe: "Rows to query per page, max is 30" })
  .option('status', { type: 'number', describe: "Order status filter (see OrderItem.status for values)" })
  .option('begin-time', { type: 'string', describe: "Begin time" })
  .option('end-time', { type: 'string', describe: "End time" })
  .option('token-id', { type: 'string', describe: "Token id" })
  .option('side', { type: 'number', describe: "0: Buy, 1: Sell" })
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
  path: '/v5/p2p/order/simplifyList',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/p2p/order/simplifyList',
    
    body: { page: argv['page'], size: argv['size'], status: argv['status'], beginTime: argv['begin-time'], endTime: argv['end-time'], tokenId: argv['token-id'], side: argv['side'] },
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
    operation: 'p2p get-all-orders',
    method: 'POST',
    path: '/v5/p2p/order/simplifyList',
    params: argv,
  })
  return innerHandler(argv)
}
