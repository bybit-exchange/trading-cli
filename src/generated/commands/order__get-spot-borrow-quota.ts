// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-spot-borrow-quota'
export const describe = "Get Spot Borrow Quota"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type. Must be `spot`.",
      enum: ['spot'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair name.",
      
    },
    'side': {
      type: 'string',
      description: "Trade direction.",
      enum: ['Buy', 'Sell'],
    }
  },
  required: ['category', 'symbol', 'side'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['spot'], demandOption: true, describe: "Product type. Must be `spot`." })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair name." })
  .option('side', { type: 'string', choices: ['Buy', 'Sell'], demandOption: true, describe: "Trade direction." })
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
  path: '/v5/order/spot-borrow-check',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/order/spot-borrow-check',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], side: argv['side'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
