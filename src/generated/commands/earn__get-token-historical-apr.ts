// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-token-historical-apr'
export const describe = "Get Historical APR"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin': {
      type: 'string',
      description: "Coin name",
      enum: ['BYUSDT'],
    },
    'range': {
      type: 'integer',
      description: "Time range: 1=7 days, 2=30 days, 3=180 days",
      enum: ['1', '2', '3'],
    }
  },
  required: ['coin', 'range'],
} as const

export const builder = (yargs: any) => yargs
  .option('coin', { type: 'string', choices: ['BYUSDT'], demandOption: true, describe: "Coin name" })
  .option('range', { type: 'number', choices: ['1', '2', '3'], demandOption: true, describe: "Time range: 1=7 days, 2=30 days, 3=180 days" })
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
  path: '/v5/earn/token/history-apr',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/earn/token/history-apr',
    query: filterDefined({ coin: argv['coin'], range: argv['range'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
