// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-strategy-order-list'
export const describe = "Query orders created by a specific strategy"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'strategy-id': {
      type: 'string',
      description: "Strategy ID to query orders for (UUID format).\nThis is the parent strategy whose child orders you want to retrieve.\nObtain from strategy creation response or strategy list query.\n",
      
    },
    'status': {
      type: 'string',
      description: "Filter by order status.\n- \"1\": Created (active, not filled yet)\n- \"2\": PartiallyFilled (some quantity executed)\n- \"3\": Filled (fully executed)\n- \"4\": Cancelled (order canceled)\n- \"5\": Rejected (order rejected by exchange)\nCan filter by multiple statuses.\n",
      enum: ['1', '2', '3', '4', '5'],
    },
    'symbol': {
      type: 'string',
      description: "Filter by trading pair symbol.\nUseful if strategy could trade multiple symbols.\n",
      
    },
    'begin-time-e0': {
      type: 'integer',
      description: "Start time filter (Unix timestamp in seconds).\nReturns orders created on or after this time.\n",
      
    },
    'end-time-e0': {
      type: 'integer',
      description: "End time filter (Unix timestamp in seconds).\nReturns orders created before this time.\n",
      
    },
    'page-size': {
      type: 'integer',
      description: "Number of results per page.\nDefault: 20, Maximum: 50\n",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response.\nUse nextCursor from previous query for next page.\n",
      
    },
    'strategy-type': {
      type: 'string',
      description: "Filter by strategy type.\nShould match the parent strategy type.\n",
      enum: ['twap', 'chaseOrder', 'iceberg', 'pov'],
    }
  },
  required: ['strategy-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('strategy-id', { type: 'string', demandOption: true, describe: "Strategy ID to query orders for (UUID format).\nThis is the parent strategy whose child orders you want to retrieve.\nObtain from strategy creation response or strategy list query.\n" })
  .option('status', { type: 'string', choices: ['1', '2', '3', '4', '5'], describe: "Filter by order status.\n- \"1\": Created (active, not filled yet)\n- \"2\": PartiallyFilled (some quantity executed)\n- \"3\": Filled (fully executed)\n- \"4\": Cancelled (order canceled)\n- \"5\": Rejected (order rejected by exchange)\nCan filter by multiple statuses.\n" })
  .option('symbol', { type: 'string', describe: "Filter by trading pair symbol.\nUseful if strategy could trade multiple symbols.\n" })
  .option('begin-time-e0', { type: 'number', describe: "Start time filter (Unix timestamp in seconds).\nReturns orders created on or after this time.\n" })
  .option('end-time-e0', { type: 'number', describe: "End time filter (Unix timestamp in seconds).\nReturns orders created before this time.\n" })
  .option('page-size', { type: 'number', describe: "Number of results per page.\nDefault: 20, Maximum: 50\n" })
  .option('cursor', { type: 'string', describe: "Pagination cursor from previous response.\nUse nextCursor from previous query for next page.\n" })
  .option('strategy-type', { type: 'string', choices: ['twap', 'chaseOrder', 'iceberg', 'pov'], describe: "Filter by strategy type.\nShould match the parent strategy type.\n" })
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
  path: '/v5/strategy/order-list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/strategy/order-list',
    query: filterDefined({ strategyId: argv['strategy-id'], status: argv['status'], symbol: argv['symbol'], BeginTimeE0: argv['begin-time-e0'], EndTimeE0: argv['end-time-e0'], pageSize: argv['page-size'], cursor: argv['cursor'], StrategyType: argv['strategy-type'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
