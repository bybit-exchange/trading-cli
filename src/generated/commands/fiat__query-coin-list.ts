// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-coin-list'
export const describe = "Get Trading Pairs"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'side': {
      type: 'integer',
      description: "Trading direction:\n- `0`: buy - Buy crypto, sell fiat\n- `1`: sell - Sell crypto, buy fiat\n",
      enum: ['0', '1'],
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('side', { type: 'number', choices: ['0', '1'], describe: "Trading direction:\n- `0`: buy - Buy crypto, sell fiat\n- `1`: sell - Sell crypto, buy fiat\n" })
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
  path: '/v5/fiat/query-coin-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/fiat/query-coin-list',
    query: filterDefined({ side: argv['side'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
