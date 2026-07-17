// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-crypto-loan-common-adjustment-history'
export const describe = "Get Collateral Adjustment History"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'adjust-id': {
      type: 'integer',
      description: "Specific adjustment ID to query.\nIf provided, returns only this adjustment (no pagination).\nIf not provided, returns all matching adjustments with pagination.\n",
      
    },
    'collateral-currency': {
      type: 'string',
      description: "Filter by collateral currency (e.g., BTC, ETH, USDT).\nIf not provided, returns adjustments for all currencies.\n",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records to return per page.\nDefault and maximum value depends on server configuration.\nRecommended: 20-50 records per page.\n",
      
    },
    'cursor': {
      type: 'integer',
      description: "Pagination cursor (adjustId) for fetching next page.\nUse the nextPageCursor value from the previous response.\nIf not provided or 0, returns first page.\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('adjust-id', { type: 'number', describe: "Specific adjustment ID to query.\nIf provided, returns only this adjustment (no pagination).\nIf not provided, returns all matching adjustments with pagination.\n" })
  .option('collateral-currency', { type: 'string', describe: "Filter by collateral currency (e.g., BTC, ETH, USDT).\nIf not provided, returns adjustments for all currencies.\n" })
  .option('limit', { type: 'number', describe: "Number of records to return per page.\nDefault and maximum value depends on server configuration.\nRecommended: 20-50 records per page.\n" })
  .option('cursor', { type: 'number', describe: "Pagination cursor (adjustId) for fetching next page.\nUse the nextPageCursor value from the previous response.\nIf not provided or 0, returns first page.\n" })
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
  path: '/v5/crypto-loan-common/adjustment-history',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/crypto-loan-common/adjustment-history',
    
    body: { adjustId: argv['adjust-id'], collateralCurrency: argv['collateral-currency'], limit: argv['limit'], cursor: argv['cursor'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
