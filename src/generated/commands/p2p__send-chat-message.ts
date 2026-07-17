// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'send-chat-message'
export const describe = "Send Chat Message"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'message': {
      type: 'string',
      description: "Chat message content: either the text of the message, or the URL of the file to send",
      
    },
    'content-type': {
      type: 'string',
      description: "Content type. str: text; pic: image; pdf: PDF file; video: video",
      enum: ['str', 'pic', 'pdf', 'video'],
    },
    'order-id': {
      type: 'string',
      description: "Order ID",
      
    },
    'msg-uuid': {
      type: 'string',
      description: "Client message UUID",
      
    },
    'file-name': {
      type: 'string',
      description: "Image/pdf/video filename",
      
    }
  },
  required: ['message', 'content-type', 'order-id', 'msg-uuid'],
} as const

export const builder = (yargs: any) => yargs
  .option('message', { type: 'string', demandOption: true, describe: "Chat message content: either the text of the message, or the URL of the file to send" })
  .option('content-type', { type: 'string', choices: ['str', 'pic', 'pdf', 'video'], demandOption: true, describe: "Content type. str: text; pic: image; pdf: PDF file; video: video" })
  .option('order-id', { type: 'string', demandOption: true, describe: "Order ID" })
  .option('msg-uuid', { type: 'string', demandOption: true, describe: "Client message UUID" })
  .option('file-name', { type: 'string', describe: "Image/pdf/video filename" })
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
  path: '/v5/p2p/order/message/send',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/p2p/order/message/send',
    
    body: { message: argv['message'], contentType: argv['content-type'], orderId: argv['order-id'], msgUuid: argv['msg-uuid'], fileName: argv['file-name'] },
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
    operation: 'p2p send-chat-message',
    method: 'POST',
    path: '/v5/p2p/order/message/send',
    params: argv,
  })
  return innerHandler(argv)
}
