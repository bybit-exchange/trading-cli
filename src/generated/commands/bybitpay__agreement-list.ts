// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'agreement-list'
export const describe = "Agreement List Query"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'merchant_id': {
      type: 'string',
      description: "Merchant ID",
      
    },
    'user_id': {
      type: 'string',
      description: "Platform user ID; filters agreements for the specified user",
      
    },
    'agreement_type': {
      type: 'string',
      description: "Agreement type; returns all types if omitted",
      enum: ['CYCLE', 'NON_CYCLE', 'SINGLE'],
    },
    'status': {
      type: 'string',
      description: "Agreement status filter",
      enum: ['INIT', 'PENDING', 'SIGNED', 'SUSPENDED', 'UNSIGNED', 'EXPIRED', 'FAILED'],
    },
    'scene_code': {
      type: 'string',
      description: "Scene code filter",
      
    },
    'start_time': {
      type: 'string',
      description: "Sign start time (ISO8601 format)",
      
    },
    'end_time': {
      type: 'string',
      description: "Sign end time (ISO8601 format)",
      
    },
    'page_no': {
      type: 'integer',
      description: "Page number; default 1",
      
    },
    'page_size': {
      type: 'integer',
      description: "Page size; default 20, max 100",
      
    }
  },
  required: ['merchant_id'],
} as const

export const builder = (yargs: any) => yargs
  .option('merchant_id', { type: 'string', demandOption: true, describe: "Merchant ID" })
  .option('user_id', { type: 'string', describe: "Platform user ID; filters agreements for the specified user" })
  .option('agreement_type', { type: 'string', choices: ['CYCLE', 'NON_CYCLE', 'SINGLE'], describe: "Agreement type; returns all types if omitted" })
  .option('status', { type: 'string', choices: ['INIT', 'PENDING', 'SIGNED', 'SUSPENDED', 'UNSIGNED', 'EXPIRED', 'FAILED'], describe: "Agreement status filter" })
  .option('scene_code', { type: 'string', describe: "Scene code filter" })
  .option('start_time', { type: 'string', describe: "Sign start time (ISO8601 format)" })
  .option('end_time', { type: 'string', describe: "Sign end time (ISO8601 format)" })
  .option('page_no', { type: 'number', describe: "Page number; default 1" })
  .option('page_size', { type: 'number', describe: "Page size; default 20, max 100" })
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
  path: '/v5/bybitpay/agreement/list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/bybitpay/agreement/list',
    query: filterDefined({ merchant_id: argv['merchant_id'], user_id: argv['user_id'], agreement_type: argv['agreement_type'], status: argv['status'], scene_code: argv['scene_code'], start_time: argv['start_time'], end_time: argv['end_time'], page_no: argv['page_no'], page_size: argv['page_size'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
