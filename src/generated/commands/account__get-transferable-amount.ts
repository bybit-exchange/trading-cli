// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-transferable-amount'
export const describe = "Get Transferable Amount"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin-name': {
      type: 'string',
      description: "Coin name(s) in uppercase. Supports batch queries for up to 20 coins\nseparated by commas (e.g., `BTC,SOL,USDT,USDC`).\n",
      
    }
  },
  required: ['coin-name'],
} as const

export const builder = (yargs: any) => yargs
  .option('coin-name', { type: 'string', demandOption: true, describe: "Coin name(s) in uppercase. Supports batch queries for up to 20 coins\nseparated by commas (e.g., `BTC,SOL,USDT,USDC`).\n" })
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
  path: '/v5/account/withdrawal',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/account/withdrawal',
    query: filterDefined({ coinName: argv['coin-name'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
