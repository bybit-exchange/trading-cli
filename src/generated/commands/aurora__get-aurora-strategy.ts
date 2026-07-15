// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-aurora-strategy'
export const describe = "Get an Aurora AI strategy detail by aurora_id"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'aurora_id': {
      type: 'string',
      description: "Encoded strategy ID returned by a recommendation endpoint",
      
    }
  },
  required: ['aurora_id'],
} as const

export const builder = (yargs: any) => yargs
  .option('aurora_id', { type: 'string', demandOption: true, describe: "Encoded strategy ID returned by a recommendation endpoint" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  
function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'POST',
  path: '/v5/aurora/info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/aurora/info',
    
    body: { aurora_id: argv['aurora_id'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
