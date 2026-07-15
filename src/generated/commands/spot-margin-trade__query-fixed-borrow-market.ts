// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-fixed-borrow-market'
export const describe = "Query Fixed-Rate Borrow Market"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-currency': {
      type: 'string',
      description: "Borrow coin name, uppercase only. e.g. `USDT`, `BTC`. **Required.**",
      
    },
    'term': {
      type: 'string',
      description: "Filter by loan term in days. e.g. `7`, `14`, `30`, `90`, `180`.",
      
    },
    'order-by': {
      type: 'string',
      description: "Sort field. **Required.**\n- `apy`: Sort by annual interest rate\n- `term`: Sort by loan term\n- `quantity`: Sort by available quantity\n",
      enum: ['apy', 'term', 'quantity'],
    },
    'sort': {
      type: 'integer',
      description: "Sort order.\n- `0`: Ascending (default)\n- `1`: Descending\n",
      enum: ['0', '1'],
    },
    'limit': {
      type: 'integer',
      description: "Page size. Range: [1, 100]. Default: `10`.",
      
    }
  },
  required: ['order-currency', 'order-by'],
} as const

export const builder = (yargs: any) => yargs
  .option('order-currency', { type: 'string', demandOption: true, describe: "Borrow coin name, uppercase only. e.g. `USDT`, `BTC`. **Required.**" })
  .option('term', { type: 'string', describe: "Filter by loan term in days. e.g. `7`, `14`, `30`, `90`, `180`." })
  .option('order-by', { type: 'string', choices: ['apy', 'term', 'quantity'], demandOption: true, describe: "Sort field. **Required.**\n- `apy`: Sort by annual interest rate\n- `term`: Sort by loan term\n- `quantity`: Sort by available quantity\n" })
  .option('sort', { type: 'number', choices: ['0', '1'], describe: "Sort order.\n- `0`: Ascending (default)\n- `1`: Descending\n" })
  .option('limit', { type: 'number', describe: "Page size. Range: [1, 100]. Default: `10`." })
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
  path: '/v5/spot-margin-trade/fixedborrow-order-quote',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spot-margin-trade/fixedborrow-order-quote',
    query: filterDefined({ orderCurrency: argv['order-currency'], term: argv['term'], orderBy: argv['order-by'], sort: argv['sort'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
