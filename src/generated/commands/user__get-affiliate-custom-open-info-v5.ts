// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-affiliate-custom-open-info-v5'
export const describe = "Get Affiliate User Info"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'uid': {
      type: 'string',
      
      
    },
    'coin': {
      type: 'string',
      
      
    },
    'business': {
      type: 'string',
      
      enum: ['1', '2', '3', '4', '5'],
    }
  },
  required: ['uid'],
} as const

export const builder = (yargs: any) => yargs
  .option('uid', { type: 'string', demandOption: true })
  .option('coin', { type: 'string' })
  .option('business', { type: 'string', choices: ['1', '2', '3', '4', '5'] })
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
  path: '/v5/user/aff-customer-info',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/user/aff-customer-info',
    query: filterDefined({ uid: argv['uid'], coin: argv['coin'], business: argv['business'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
