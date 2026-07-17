// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-transaction-log'
export const describe = "Get Transaction Log"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-type': {
      type: 'string',
      description: "Account type. Only `UNIFIED` is supported.",
      enum: ['UNIFIED'],
    },
    'category': {
      type: 'string',
      description: "Product type filter.",
      enum: ['spot', 'linear', 'option', 'inverse'],
    },
    'currency': {
      type: 'string',
      description: "Currency denomination filter (e.g., USDT, USDC, BTC, ETH).",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin filter (e.g., BTC in BTCUSDT).",
      
    },
    'type': {
      type: 'string',
      description: "Transaction log type filter. Possible values include:\nTRANSFER_IN, TRANSFER_OUT, TRADE, SETTLEMENT, DELIVERY, LIQUIDATION,\nADL, AIRDROP, BONUS, FEE_REFUND, INTEREST, CURRENCY_BUY, CURRENCY_SELL, etc.\n",
      
    },
    'trans-sub-type': {
      type: 'string',
      description: "Transaction sub-type filter. Currently only `movePosition` is supported.",
      enum: ['movePosition'],
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in milliseconds.",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in milliseconds. Max 7 days from startTime.",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of records per page. Maximum 50, default 20.",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor from previous response.",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('account-type', { type: 'string', choices: ['UNIFIED'], describe: "Account type. Only `UNIFIED` is supported." })
  .option('category', { type: 'string', choices: ['spot', 'linear', 'option', 'inverse'], describe: "Product type filter." })
  .option('currency', { type: 'string', describe: "Currency denomination filter (e.g., USDT, USDC, BTC, ETH)." })
  .option('base-coin', { type: 'string', describe: "Base coin filter (e.g., BTC in BTCUSDT)." })
  .option('type', { type: 'string', describe: "Transaction log type filter. Possible values include:\nTRANSFER_IN, TRANSFER_OUT, TRADE, SETTLEMENT, DELIVERY, LIQUIDATION,\nADL, AIRDROP, BONUS, FEE_REFUND, INTEREST, CURRENCY_BUY, CURRENCY_SELL, etc.\n" })
  .option('trans-sub-type', { type: 'string', choices: ['movePosition'], describe: "Transaction sub-type filter. Currently only `movePosition` is supported." })
  .option('start-time', { type: 'number', describe: "Start timestamp in milliseconds." })
  .option('end-time', { type: 'number', describe: "End timestamp in milliseconds. Max 7 days from startTime." })
  .option('limit', { type: 'number', describe: "Number of records per page. Maximum 50, default 20." })
  .option('cursor', { type: 'string', describe: "Pagination cursor from previous response." })
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
  path: '/v5/account/transaction-log',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/account/transaction-log',
    query: filterDefined({ accountType: argv['account-type'], category: argv['category'], currency: argv['currency'], baseCoin: argv['base-coin'], type: argv['type'], transSubType: argv['trans-sub-type'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
