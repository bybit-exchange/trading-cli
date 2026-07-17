// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-fixed-borrow-order-quote'
export const describe = "Get Borrow Market Quotes"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'order-currency': {
      type: 'string',
      description: "Currency to borrow (e.g., USDT, BTC). If not provided, returns all currencies.",
      
    },
    'term': {
      type: 'string',
      description: "Loan term in days (\"7\", \"14\", \"30\", \"60\", \"90\", \"180\"). If not provided, returns all terms.",
      
    },
    'order-by': {
      type: 'string',
      description: "Sort field:\n- \"annualRate\": Sort by interest rate\n- \"qty\": Sort by available quantity\n",
      enum: ['annualRate', 'qty'],
    },
    'sort': {
      type: 'integer',
      description: "Sort direction:\n- `1`: Ascending (lowest rate/amount first)\n- `2`: Descending (highest rate/amount first)\n",
      enum: ['1', '2'],
    },
    'limit': {
      type: 'integer',
      description: "Number of results to return (default 10, max depends on server config)",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('order-currency', { type: 'string', describe: "Currency to borrow (e.g., USDT, BTC). If not provided, returns all currencies." })
  .option('term', { type: 'string', describe: "Loan term in days (\"7\", \"14\", \"30\", \"60\", \"90\", \"180\"). If not provided, returns all terms." })
  .option('order-by', { type: 'string', choices: ['annualRate', 'qty'], describe: "Sort field:\n- \"annualRate\": Sort by interest rate\n- \"qty\": Sort by available quantity\n" })
  .option('sort', { type: 'number', choices: ['1', '2'], describe: "Sort direction:\n- `1`: Ascending (lowest rate/amount first)\n- `2`: Descending (highest rate/amount first)\n" })
  .option('limit', { type: 'number', describe: "Number of results to return (default 10, max depends on server config)" })
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
  path: '/v5/crypto-loan-fixed/borrow-order-quote',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-fixed/borrow-order-quote',
    
    body: { orderCurrency: argv['order-currency'], term: argv['term'], orderBy: argv['order-by'], sort: argv['sort'], limit: argv['limit'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
