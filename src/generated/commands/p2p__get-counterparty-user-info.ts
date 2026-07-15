// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-counterparty-user-info'
export const describe = "Get Counterparty User Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'original-uid': {
      type: 'string',
      description: "Counterparty User ID",
      
    },
    'order-id': {
      type: 'string',
      description: "Order ID",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('original-uid', { type: 'string', describe: "Counterparty User ID" })
  .option('order-id', { type: 'string', describe: "Order ID" })
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
  path: '/v5/p2p/user/order/personal/info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/p2p/user/order/personal/info',
    
    body: { originalUid: argv['original-uid'], orderId: argv['order-id'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
