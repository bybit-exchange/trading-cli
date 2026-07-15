// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-reference-price'
export const describe = "Get Reference Price"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Coin pair, format: \"FIAT-CRYPTO\", e.g., \"EUR-USDT\"",
      
    },
    'payment-method': {
      type: 'string',
      description: "Payment method (reserved field)",
      
    }
  },
  required: ['symbol'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Coin pair, format: \"FIAT-CRYPTO\", e.g., \"EUR-USDT\"" })
  .option('payment-method', { type: 'string', describe: "Payment method (reserved field)" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  
function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'GET',
  path: '/v5/fiat/reference-price',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/fiat/reference-price',
    query: filterDefined({ symbol: argv['symbol'], paymentMethod: argv['payment-method'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
