// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'close-fmart-bot'
export const describe = "Close a running futures Martingale bot by bot ID"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'bot_id': {
      type: 'integer',
      description: "The bot ID to close, obtained from createFMartBot response",
      
    },
    'stop_type': {
      type: 'string',
      description: "Reason the Martingale bot was stopped",
      enum: ['F_MART_BOT_STOP_TYPE_STOP_TYPE_UNKNOWN_UNSPECIFIED', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_INIT_ERROR', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_USER', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_LIQ', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_SYMBOL_OFFLINE', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_SL', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_SYSTEM', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_USER_BANNED', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_TP_SINGLE_ROUND', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_ORDER_COST', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_REDUCE_ONLY', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_BUST_PRICE', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_NEGATIVE_ARBITRAGE', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_COMPLIANCE', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_ADL'],
    }
  },
  required: ['bot_id'],
} as const

export const builder = (yargs: any) => yargs
  .option('bot_id', { type: 'number', demandOption: true, describe: "The bot ID to close, obtained from createFMartBot response" })
  .option('stop_type', { type: 'string', choices: ['F_MART_BOT_STOP_TYPE_STOP_TYPE_UNKNOWN_UNSPECIFIED', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_INIT_ERROR', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_USER', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_LIQ', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_SYMBOL_OFFLINE', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_SL', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_SYSTEM', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_USER_BANNED', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_TP_SINGLE_ROUND', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_ORDER_COST', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_REDUCE_ONLY', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_BUST_PRICE', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_NEGATIVE_ARBITRAGE', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_COMPLIANCE', 'F_MART_BOT_STOP_TYPE_STOP_TYPE_BY_ADL'], describe: "Reason the Martingale bot was stopped" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  .option('yes', { type: 'boolean', describe: 'Confirm mainnet write op (required on mainnet)' })
  .option('cap-usd', { type: 'number', describe: 'Reject if estimated USD value exceeds this' })
  .option('cap-usd-total-hour', { type: 'number', describe: 'Reject if rolling 1h total exceeds this' })
  .option('max-orders-per-hour', { type: 'number', describe: 'Reject if 1h order count would exceed this' })
  .option('enable-advanced-money-ops', { type: 'boolean', describe: 'Unlock withdraw/transfer/fiat/p2p endpoints' })

function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'POST',
  path: '/v5/fmartingalebot/close',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/fmartingalebot/close',
    
    body: { bot_id: argv['bot_id'], stop_type: argv['stop_type'] },
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  // Auto-inject orderLinkId for idempotency across retries.
  // User can override with --order-link-id.
  if (argv['order-link-id'] === undefined && argv.orderLinkId === undefined) {
    argv['order-link-id'] = makeOrderLinkId(argv)
    argv.orderLinkId = argv['order-link-id']
  }
  checkConfirm(argv, {
    operation: 'fmartingalebot close-fmart-bot',
    method: 'POST',
    path: '/v5/fmartingalebot/close',
    params: argv,
  })
  return innerHandler(argv)
}
