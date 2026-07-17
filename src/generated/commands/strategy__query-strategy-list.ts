// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'query-strategy-list'
export const describe = "Query trading strategy list with filters"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'strategy-id': {
      type: 'string',
      description: "Strategy ID for exact lookup (UUID format).\nIf provided, returns only this specific strategy.\nUseful for checking status of a known strategy.\n",
      
    },
    'status': {
      type: 'string',
      description: "Filter by strategy status.\n- \"2\": Running (currently executing)\n- \"3\" or \"4\": Terminated (stopped)\n- \"5\": Paused (temporarily halted)\n- \"6\": Untriggered (waiting for trigger price)\nCan provide multiple values separated by comma.\n",
      enum: ['2', '3', '4', '5', '6'],
    },
    'symbol': {
      type: 'string',
      description: "Filter by trading pair symbol.\nCase-sensitive, must match exactly.\nExample: \"BTCUSDT\", \"ETHUSDT\"\n",
      
    },
    'category': {
      type: 'string',
      description: "Filter by product category.\nUseful to separate spot from derivatives strategies.\n",
      enum: ['UTA_USDT', 'UTA_USDC', 'UTA_USDC_FUTURE', 'UTA_SPOT', 'UTA_INVERSE', 'UTA_INVERSE_FUTURE', 'UTA_USDT_FUTURE'],
    },
    'strategy-type': {
      type: 'string',
      description: "Filter by strategy type.\nUseful to view only specific algorithm strategies.\n",
      enum: ['twap', 'chaseOrder', 'iceberg', 'pov'],
    },
    'begin-time-e0': {
      type: 'integer',
      description: "Start time filter (Unix timestamp in seconds).\nReturns strategies created on or after this time.\nExample: 1673214964 (Jan 9, 2023)\n",
      
    },
    'end-time-e0': {
      type: 'integer',
      description: "End time filter (Unix timestamp in seconds).\nReturns strategies created before this time.\nMust be greater than beginTimeE0 if both provided.\n",
      
    },
    'page-size': {
      type: 'integer',
      description: "Number of results per page.\nDefault: 20\nMaximum: 50\n",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response.\nUse nextCursor value from previous query to get next page.\nEmpty for first page.\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('strategy-id', { type: 'string', describe: "Strategy ID for exact lookup (UUID format).\nIf provided, returns only this specific strategy.\nUseful for checking status of a known strategy.\n" })
  .option('status', { type: 'string', choices: ['2', '3', '4', '5', '6'], describe: "Filter by strategy status.\n- \"2\": Running (currently executing)\n- \"3\" or \"4\": Terminated (stopped)\n- \"5\": Paused (temporarily halted)\n- \"6\": Untriggered (waiting for trigger price)\nCan provide multiple values separated by comma.\n" })
  .option('symbol', { type: 'string', describe: "Filter by trading pair symbol.\nCase-sensitive, must match exactly.\nExample: \"BTCUSDT\", \"ETHUSDT\"\n" })
  .option('category', { type: 'string', choices: ['UTA_USDT', 'UTA_USDC', 'UTA_USDC_FUTURE', 'UTA_SPOT', 'UTA_INVERSE', 'UTA_INVERSE_FUTURE', 'UTA_USDT_FUTURE'], describe: "Filter by product category.\nUseful to separate spot from derivatives strategies.\n" })
  .option('strategy-type', { type: 'string', choices: ['twap', 'chaseOrder', 'iceberg', 'pov'], describe: "Filter by strategy type.\nUseful to view only specific algorithm strategies.\n" })
  .option('begin-time-e0', { type: 'number', describe: "Start time filter (Unix timestamp in seconds).\nReturns strategies created on or after this time.\nExample: 1673214964 (Jan 9, 2023)\n" })
  .option('end-time-e0', { type: 'number', describe: "End time filter (Unix timestamp in seconds).\nReturns strategies created before this time.\nMust be greater than beginTimeE0 if both provided.\n" })
  .option('page-size', { type: 'number', describe: "Number of results per page.\nDefault: 20\nMaximum: 50\n" })
  .option('cursor', { type: 'string', describe: "Pagination cursor from previous response.\nUse nextCursor value from previous query to get next page.\nEmpty for first page.\n" })
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
  path: '/v5/strategy/list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/strategy/list',
    query: filterDefined({ strategyId: argv['strategy-id'], status: argv['status'], symbol: argv['symbol'], category: argv['category'], strategyType: argv['strategy-type'], beginTimeE0: argv['begin-time-e0'], endTimeE0: argv['end-time-e0'], pageSize: argv['page-size'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
