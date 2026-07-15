// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-affiliate-user-list'
export const describe = "Get affiliate user list"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Pass an empty string or omit on the first request;\npass the `nextPageCursor` from the previous response for subsequent pages.\n",
      
    },
    'size': {
      type: 'integer',
      description: "Number of records per page, range 0–100. Default 0 (returns all, up to 100).",
      
    },
    'need-deposit': {
      type: 'boolean',
      description: "Whether to return deposit information (`depositAmount30Day`, `depositAmount365Day`).",
      
    },
    'need30': {
      type: 'boolean',
      description: "Whether to return 30-day trading data (`takerVol30Day`, `makerVol30Day`, `tradeVol30Day`, `tradfiTradeVol30Day`, `commissions30Day`).",
      
    },
    'need365': {
      type: 'boolean',
      description: "Whether to return 365-day trading data (`takerVol365Day`, `makerVol365Day`, `tradeVol365Day`, `tradfiTradeVol365Day`, `commissions365Day`).",
      
    },
    'start-date': {
      type: 'string',
      description: "Custom query start date, format `YYYY-MM-DD` (corresponds to `00:00:00` UTC).\nWhen provided together with `endDate`, the response includes `takerVol`, `makerVol`, `tradeVol`,\n`tradfiTradeVol`, and `commissionsVol` fields, and **no longer returns** 30-day / 365-day fields.\n",
      
    },
    'end-date': {
      type: 'string',
      description: "Custom query end date, format `YYYY-MM-DD` (corresponds to `23:59:59` UTC).\nTakes effect when provided together with `startDate`.\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('cursor', { type: 'string', describe: "Pagination cursor. Pass an empty string or omit on the first request;\npass the `nextPageCursor` from the previous response for subsequent pages.\n" })
  .option('size', { type: 'number', describe: "Number of records per page, range 0–100. Default 0 (returns all, up to 100)." })
  .option('need-deposit', { type: 'boolean', describe: "Whether to return deposit information (`depositAmount30Day`, `depositAmount365Day`)." })
  .option('need30', { type: 'boolean', describe: "Whether to return 30-day trading data (`takerVol30Day`, `makerVol30Day`, `tradeVol30Day`, `tradfiTradeVol30Day`, `commissions30Day`)." })
  .option('need365', { type: 'boolean', describe: "Whether to return 365-day trading data (`takerVol365Day`, `makerVol365Day`, `tradeVol365Day`, `tradfiTradeVol365Day`, `commissions365Day`)." })
  .option('start-date', { type: 'string', describe: "Custom query start date, format `YYYY-MM-DD` (corresponds to `00:00:00` UTC).\nWhen provided together with `endDate`, the response includes `takerVol`, `makerVol`, `tradeVol`,\n`tradfiTradeVol`, and `commissionsVol` fields, and **no longer returns** 30-day / 365-day fields.\n" })
  .option('end-date', { type: 'string', describe: "Custom query end date, format `YYYY-MM-DD` (corresponds to `23:59:59` UTC).\nTakes effect when provided together with `startDate`.\n" })
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
  path: '/v5/affiliate/aff-user-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/affiliate/aff-user-list',
    query: filterDefined({ cursor: argv['cursor'], size: argv['size'], needDeposit: argv['need-deposit'], need30: argv['need30'], need365: argv['need365'], startDate: argv['start-date'], endDate: argv['end-date'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
