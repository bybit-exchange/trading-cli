// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-asset-overview'
export const describe = "Get Asset Overview"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Account type filter. Multiple values separated by commas. If not passed, returns all account types.\n\nAvailable values:\n- `SPOT`: Spot account\n- `UNIFIED`: Unified trading account\n- `FUND`: Funding account\n- `CONTRACT`: Contract account\n- `INVESTMENT`: Investment account\n- `OPTION`: Option account\n",
      
    },
    'member-id': {
      type: 'string',
      description: "Sub-account member ID. Used to query a specific sub-account's assets.\n- If API key belongs to a sub-account, `memberId` must match the sub-account's own UID or be omitted.\n- If API key belongs to the parent account, `memberId` can specify any sub-account.\n",
      
    },
    'valuation-currency': {
      type: 'string',
      description: "Valuation currency. Defaults to `USD` if not provided.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', describe: "Account type filter. Multiple values separated by commas. If not passed, returns all account types.\n\nAvailable values:\n- `SPOT`: Spot account\n- `UNIFIED`: Unified trading account\n- `FUND`: Funding account\n- `CONTRACT`: Contract account\n- `INVESTMENT`: Investment account\n- `OPTION`: Option account\n" })
  .option('member-id', { type: 'string', describe: "Sub-account member ID. Used to query a specific sub-account's assets.\n- If API key belongs to a sub-account, `memberId` must match the sub-account's own UID or be omitted.\n- If API key belongs to the parent account, `memberId` can specify any sub-account.\n" })
  .option('valuation-currency', { type: 'string', describe: "Valuation currency. Defaults to `USD` if not provided." })
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
  path: '/v5/asset/asset-overview',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/asset/asset-overview',
    query: filterDefined({ accountType: argv['account-type'], memberId: argv['member-id'], valuationCurrency: argv['valuation-currency'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
