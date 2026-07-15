// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-chat-messages'
export const describe = "Get Chat Message"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-id': {
      type: 'string',
      description: "Order ID",
      
    },
    'current-page': {
      type: 'string',
      description: "Current page number",
      
    },
    'size': {
      type: 'string',
      description: "Page size, max is 30",
      
    }
  },
  required: ['order-id', 'size'],
} as const

export const builder = (yargs: any) => yargs
  .option('order-id', { type: 'string', demandOption: true, describe: "Order ID" })
  .option('current-page', { type: 'string', describe: "Current page number" })
  .option('size', { type: 'string', demandOption: true, describe: "Page size, max is 30" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  
function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'POST',
  path: '/v5/p2p/order/message/listpage',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/p2p/order/message/listpage',
    
    body: { orderId: argv['order-id'], currentPage: argv['current-page'], size: argv['size'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
