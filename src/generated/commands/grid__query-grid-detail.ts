// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-grid-detail'
export const describe = "Query full details of a specific grid bot by grid_id"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'grid_id': {
      type: 'integer',
      description: "The grid bot ID, obtained from createGridBot response or grid list.",
      
    }
  },
  required: ['grid_id'],
} as const

export const builder = (yargs: any) => yargs
  .option('grid_id', { type: 'number', demandOption: true, describe: "The grid bot ID, obtained from createGridBot response or grid list." })
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
  path: '/v5/grid/query-grid-detail',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/grid/query-grid-detail',
    
    body: { grid_id: argv['grid_id'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
