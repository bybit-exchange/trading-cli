// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'send-withdraw'
export const describe = "Withdraw"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'coin': {
      type: 'string',
      description: "Coin name, uppercase",
      
    },
    'chain': {
      type: 'string',
      description: "Chain name. Required when `forceChain`=0 or 1",
      
    },
    'address': {
      type: 'string',
      description: "Wallet address (forceChain=0/1) or Bybit main account UID (forceChain=2)",
      
    },
    'tag': {
      type: 'string',
      description: "Tag/memo. Required if the wallet address requires one",
      
    },
    'amount': {
      type: 'string',
      description: "Withdrawal amount (string). Must be greater than 0 and meet coin precision requirements",
      
    },
    'timestamp': {
      type: 'integer',
      description: "Current timestamp in milliseconds. Used for replay attack prevention",
      
    },
    'force-chain': {
      type: 'integer',
      description: "Force chain type:\n- `0`: Default — auto-detect, internal transfer if Bybit address, otherwise on-chain\n- `1`: ForceChain — force on-chain withdrawal\n- `2`: InternalUID — internal transfer by UID\n",
      enum: ['0', '1', '2'],
    },
    'account-type': {
      type: 'string',
      description: "Account type to deduct from. Supports combo:\n- `FUND`: Funding account\n- `UTA`: Unified Trading Account\n- `FUND,UTA`: Deduct from FUND first, then UTA for remainder\n",
      
    },
    'fee-type': {
      type: 'integer',
      description: "Fee deduction type:\n- `0`: Outer (default) — amount is the received amount, fee is deducted additionally\n- `1`: Inner — fee is automatically deducted from amount\n",
      enum: ['0', '1'],
    },
    'request-id': {
      type: 'string',
      description: "Idempotency key. Unique per request, max 100 characters. Same requestId returns same withdrawId",
      
    },
    'beneficiary': {
      type: 'string',
      description: "Travel Rule beneficiary information. Required for KOR, IND, TR, KZ, ID users",
      
    }
  },
  required: ['coin', 'address', 'amount', 'timestamp', 'account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('coin', { type: 'string', demandOption: true, describe: "Coin name, uppercase" })
  .option('chain', { type: 'string', describe: "Chain name. Required when `forceChain`=0 or 1" })
  .option('address', { type: 'string', demandOption: true, describe: "Wallet address (forceChain=0/1) or Bybit main account UID (forceChain=2)" })
  .option('tag', { type: 'string', describe: "Tag/memo. Required if the wallet address requires one" })
  .option('amount', { type: 'string', demandOption: true, describe: "Withdrawal amount (string). Must be greater than 0 and meet coin precision requirements" })
  .option('timestamp', { type: 'number', demandOption: true, describe: "Current timestamp in milliseconds. Used for replay attack prevention" })
  .option('force-chain', { type: 'number', choices: ['0', '1', '2'], describe: "Force chain type:\n- `0`: Default — auto-detect, internal transfer if Bybit address, otherwise on-chain\n- `1`: ForceChain — force on-chain withdrawal\n- `2`: InternalUID — internal transfer by UID\n" })
  .option('account-type', { type: 'string', demandOption: true, describe: "Account type to deduct from. Supports combo:\n- `FUND`: Funding account\n- `UTA`: Unified Trading Account\n- `FUND,UTA`: Deduct from FUND first, then UTA for remainder\n" })
  .option('fee-type', { type: 'number', choices: ['0', '1'], describe: "Fee deduction type:\n- `0`: Outer (default) — amount is the received amount, fee is deducted additionally\n- `1`: Inner — fee is automatically deducted from amount\n" })
  .option('request-id', { type: 'string', describe: "Idempotency key. Unique per request, max 100 characters. Same requestId returns same withdrawId" })
  .option('beneficiary', { type: 'string', describe: "Travel Rule beneficiary information. Required for KOR, IND, TR, KZ, ID users" })
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
  path: '/v5/asset/withdraw/create',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/asset/withdraw/create',
    
    body: { coin: argv['coin'], chain: argv['chain'], address: argv['address'], tag: argv['tag'], amount: argv['amount'], timestamp: argv['timestamp'], forceChain: argv['force-chain'], accountType: argv['account-type'], feeType: argv['fee-type'], requestId: argv['request-id'], beneficiary: argv['beneficiary'] },
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
    operation: 'asset send-withdraw',
    method: 'POST',
    path: '/v5/asset/withdraw/create',
    params: argv,
  })
  return innerHandler(argv)
}
