// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'universal-transfer'
export const describe = "Create Universal Transfer"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'transfer-id': {
      type: 'string',
      description: "UUID for the transfer",
      
    },
    'coin': {
      type: 'string',
      description: "Coin name, uppercase",
      
    },
    'amount': {
      type: 'string',
      description: "Transfer amount, must be greater than zero",
      
    },
    'from-member-id': {
      type: 'integer',
      description: "Source UID",
      
    },
    'to-member-id': {
      type: 'integer',
      description: "Destination UID",
      
    },
    'from-account-type': {
      type: 'string',
      description: "Account type:\n- `UNIFIED`: Unified Trading account\n- `FUND`: Funding account\n",
      enum: ['UNIFIED', 'FUND'],
    },
    'to-account-type': {
      type: 'string',
      description: "Account type:\n- `UNIFIED`: Unified Trading account\n- `FUND`: Funding account\n",
      enum: ['UNIFIED', 'FUND'],
    }
  },
  required: ['transfer-id', 'coin', 'amount', 'from-member-id', 'to-member-id', 'from-account-type', 'to-account-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('transfer-id', { type: 'string', demandOption: true, describe: "UUID for the transfer" })
  .option('coin', { type: 'string', demandOption: true, describe: "Coin name, uppercase" })
  .option('amount', { type: 'string', demandOption: true, describe: "Transfer amount, must be greater than zero" })
  .option('from-member-id', { type: 'number', demandOption: true, describe: "Source UID" })
  .option('to-member-id', { type: 'number', demandOption: true, describe: "Destination UID" })
  .option('from-account-type', { type: 'string', choices: ['UNIFIED', 'FUND'], demandOption: true, describe: "Account type:\n- `UNIFIED`: Unified Trading account\n- `FUND`: Funding account\n" })
  .option('to-account-type', { type: 'string', choices: ['UNIFIED', 'FUND'], demandOption: true, describe: "Account type:\n- `UNIFIED`: Unified Trading account\n- `FUND`: Funding account\n" })
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
  path: '/v5/asset/transfer/universal-transfer',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/asset/transfer/universal-transfer',
    
    body: { transferId: argv['transfer-id'], coin: argv['coin'], amount: argv['amount'], fromMemberId: argv['from-member-id'], toMemberId: argv['to-member-id'], fromAccountType: argv['from-account-type'], toAccountType: argv['to-account-type'] },
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
    operation: 'asset universal-transfer',
    method: 'POST',
    path: '/v5/asset/transfer/universal-transfer',
    params: argv,
  })
  return innerHandler(argv)
}
