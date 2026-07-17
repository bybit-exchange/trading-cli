// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'pwm-inst-create-fund'
export const describe = "Create Pending-Subscription Fund"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'fund-name': {
      type: 'string',
      description: "Fund name",
      
    },
    'coin': {
      type: 'string',
      description: "Base coin",
      enum: ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'MNT', 'XRP'],
    },
    'profit-share-rate': {
      type: 'string',
      description: "High-water mark profit share rate (0-100%)",
      
    },
    'management-fee-rate': {
      type: 'string',
      description: "Annual management fee rate (0-100%)",
      
    },
    'fund-introduction': {
      type: 'string',
      description: "Fund introduction ID (must be in institution's allowed list)",
      
    },
    'req-link-id': {
      type: 'string',
      description: "Request ID for idempotency",
      
    }
  },
  required: ['fund-name', 'coin', 'profit-share-rate', 'management-fee-rate', 'req-link-id'],
} as const

export const builder = (yargs: any) => yargs
  .option('fund-name', { type: 'string', demandOption: true, describe: "Fund name" })
  .option('coin', { type: 'string', choices: ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'MNT', 'XRP'], demandOption: true, describe: "Base coin" })
  .option('profit-share-rate', { type: 'string', demandOption: true, describe: "High-water mark profit share rate (0-100%)" })
  .option('management-fee-rate', { type: 'string', demandOption: true, describe: "Annual management fee rate (0-100%)" })
  .option('fund-introduction', { type: 'string', describe: "Fund introduction ID (must be in institution's allowed list)" })
  .option('req-link-id', { type: 'string', demandOption: true, describe: "Request ID for idempotency" })
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
  path: '/v5/earn/pwm/asset-manager/create-fund',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/earn/pwm/asset-manager/create-fund',
    
    body: { fundName: argv['fund-name'], coin: argv['coin'], profitShareRate: argv['profit-share-rate'], managementFeeRate: argv['management-fee-rate'], fundIntroduction: argv['fund-introduction'], reqLinkId: argv['req-link-id'] },
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
    operation: 'earn pwm-inst-create-fund',
    method: 'POST',
    path: '/v5/earn/pwm/asset-manager/create-fund',
    params: argv,
  })
  return innerHandler(argv)
}
