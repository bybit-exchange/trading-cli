// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-smart-leverage-redeem-est-amount-list'
export const describe = "Get Redeem Estimation"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product category, must be `SmartLeverage` or `DoubleWin`",
      enum: ['SmartLeverage', 'DoubleWin'],
    },
    'position-ids': {
      type: 'string',
      description: "Comma-separated position IDs. e.g., `?positionIds=897,898`. Max 5 per request.",
      
    }
  },
  required: ['category', 'position-ids'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['SmartLeverage', 'DoubleWin'], demandOption: true, describe: "Product category, must be `SmartLeverage` or `DoubleWin`" })
  .option('position-ids', { type: 'string', demandOption: true, describe: "Comma-separated position IDs. e.g., `?positionIds=897,898`. Max 5 per request." })
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
  path: '/v5/earn/advance/get-redeem-est-amount-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/advance/get-redeem-est-amount-list',
    query: filterDefined({ category: argv['category'], positionIds: argv['position-ids'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
