// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-new-delivery-price'
export const describe = "Get New Delivery Price"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type. Must be `option`",
      enum: ['option'],
    },
    'base-coin': {
      type: 'string',
      description: "Base coin in uppercase, e.g. `BTC`. For `option` only",
      
    },
    'settle-coin': {
      type: 'string',
      description: "Settlement coin in uppercase; defaults to `USDT`",
      
    }
  },
  required: ['category', 'base-coin'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['option'], demandOption: true, describe: "Product type. Must be `option`" })
  .option('base-coin', { type: 'string', demandOption: true, describe: "Base coin in uppercase, e.g. `BTC`. For `option` only" })
  .option('settle-coin', { type: 'string', describe: "Settlement coin in uppercase; defaults to `USDT`" })
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
  path: '/v5/market/new-delivery-price',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/new-delivery-price',
    query: filterDefined({ category: argv['category'], baseCoin: argv['base-coin'], settleCoin: argv['settle-coin'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
