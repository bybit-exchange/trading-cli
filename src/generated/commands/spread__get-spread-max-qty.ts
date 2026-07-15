// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-spread-max-qty'
export const describe = "Get Spread Wallet Balance"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'symbol': {
      type: 'string',
      description: "Spread trading pair.",
      
    },
    'side': {
      type: 'string',
      description: "Order side:\n- `1`: Buy\n- `2`: Sell\n",
      enum: ['1', '2'],
    },
    'order-price': {
      type: 'string',
      description: "Order price.",
      
    }
  },
  required: ['symbol', 'side', 'order-price'],
} as const

export const builder = (yargs: any) => yargs
  .option('symbol', { type: 'string', demandOption: true, describe: "Spread trading pair." })
  .option('side', { type: 'string', choices: ['1', '2'], demandOption: true, describe: "Order side:\n- `1`: Buy\n- `2`: Sell\n" })
  .option('order-price', { type: 'string', demandOption: true, describe: "Order price." })
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
  path: '/v5/spread/max-qty',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spread/max-qty',
    query: filterDefined({ symbol: argv['symbol'], side: argv['side'], orderPrice: argv['order-price'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
