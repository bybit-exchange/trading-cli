// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'distribute-award'
export const describe = "Distribute voucher"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'account-id': {
      type: 'string',
      description: "User ID",
      
    },
    'award-id': {
      type: 'string',
      description: "Voucher ID",
      
    },
    'spec-code': {
      type: 'string',
      description: "Distribution identifier code, up to 8 characters",
      
    },
    'amount': {
      type: 'string',
      description: "Distribution amount. Spot airdrop supports up to 16 decimal places, other types up to 4 decimal places.\n",
      
    },
    'broker-id': {
      type: 'string',
      description: "Broker ID",
      
    }
  },
  required: ['account-id', 'award-id', 'spec-code', 'amount', 'broker-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('account-id', { type: 'string', demandOption: true, describe: "User ID" })
  .option('award-id', { type: 'string', demandOption: true, describe: "Voucher ID" })
  .option('spec-code', { type: 'string', demandOption: true, describe: "Distribution identifier code, up to 8 characters" })
  .option('amount', { type: 'string', demandOption: true, describe: "Distribution amount. Spot airdrop supports up to 16 decimal places, other types up to 4 decimal places.\n" })
  .option('broker-id', { type: 'string', demandOption: true, describe: "Broker ID" })
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
  path: '/v5/broker/award/distribute-award',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/broker/award/distribute-award',
    
    body: { accountId: argv['account-id'], awardId: argv['award-id'], specCode: argv['spec-code'], amount: argv['amount'], brokerId: argv['broker-id'] },
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
    operation: 'broker distribute-award',
    method: 'POST',
    path: '/v5/broker/award/distribute-award',
    params: argv,
  })
  return innerHandler(argv)
}
