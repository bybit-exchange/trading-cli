// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-prediction-timeline-stages'
export const describe = "Get tournament timeline stages for a sports event"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'event-type': {
      type: 'string',
      description: "Sports event type. `1` = FIFA_2026.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('event-type', { type: 'string', describe: "Sports event type. `1` = FIFA_2026." })
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
  path: '/v5/alpha/prediction/sports/timeline-stages',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/alpha/prediction/sports/timeline-stages',
    query: filterDefined({ eventType: argv['event-type'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
