// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'limit-order-callback'
export const describe = "Limit order callback notification"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'exchange-tx-id': {
      type: 'string',
      description: "Convert order number",
      
    },
    'option-type': {
      type: 'integer',
      description: "Callback type: 1=filled, 2=canceled, 3=failed",
      enum: ['1', '2', '3'],
    },
    'error-code': {
      type: 'string',
      description: "Error code on failure",
      
    },
    'time-stamp': {
      type: 'integer',
      description: "Callback timestamp (milliseconds)",
      
    },
    'sign': {
      type: 'string',
      description: "Callback signature data",
      
    },
    'app-id': {
      type: 'string',
      description: "appId of callback business, currently only supports: TimeResearch",
      
    }
  },
  required: ['exchange-tx-id', 'option-type', 'time-stamp', 'sign', 'app-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('exchange-tx-id', { type: 'string', demandOption: true, describe: "Convert order number" })
  .option('option-type', { type: 'number', choices: ['1', '2', '3'], demandOption: true, describe: "Callback type: 1=filled, 2=canceled, 3=failed" })
  .option('error-code', { type: 'string', describe: "Error code on failure" })
  .option('time-stamp', { type: 'number', demandOption: true, describe: "Callback timestamp (milliseconds)" })
  .option('sign', { type: 'string', demandOption: true, describe: "Callback signature data" })
  .option('app-id', { type: 'string', demandOption: true, describe: "appId of callback business, currently only supports: TimeResearch" })
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
  path: '/v5/asset/exchange/limit-order/callback',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/asset/exchange/limit-order/callback',
    
    body: { exchangeTxId: argv['exchange-tx-id'], optionType: argv['option-type'], errorCode: argv['error-code'], timeStamp: argv['time-stamp'], sign: argv['sign'], appId: argv['app-id'] },
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
    operation: 'asset limit-order-callback',
    method: 'POST',
    path: '/v5/asset/exchange/limit-order/callback',
    params: argv,
  })
  return innerHandler(argv)
}
