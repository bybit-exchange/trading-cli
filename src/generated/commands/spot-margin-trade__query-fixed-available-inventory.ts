// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-fixed-available-inventory'
export const describe = "Query Fixed-Rate Available Inventory"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'currency': {
      type: 'string',
      description: "Borrow coin name, uppercase only. e.g. `USDT`, `BTC`. **Required.**",
      
    },
    'term': {
      type: 'string',
      description: "Loan term in days. e.g. `7`, `14`, `30`, `90`, `180`. **Required.**",
      
    },
    'annual-rate': {
      type: 'string',
      description: "Annual interest rate. e.g. `0.02` means 2%. **Required.**",
      
    }
  },
  required: ['currency', 'term', 'annual-rate'],
} as const

export const builder = (yargs: any) => yargs
  .option('currency', { type: 'string', demandOption: true, describe: "Borrow coin name, uppercase only. e.g. `USDT`, `BTC`. **Required.**" })
  .option('term', { type: 'string', demandOption: true, describe: "Loan term in days. e.g. `7`, `14`, `30`, `90`, `180`. **Required.**" })
  .option('annual-rate', { type: 'string', demandOption: true, describe: "Annual interest rate. e.g. `0.02` means 2%. **Required.**" })
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
  path: '/v5/spot-margin-trade/fixed-available-inventory',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/spot-margin-trade/fixed-available-inventory',
    query: filterDefined({ currency: argv['currency'], term: argv['term'], annualRate: argv['annual-rate'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
