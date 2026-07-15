// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'frozen-sub-member'
export const describe = "Freeze/Unfreeze Sub UID"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'subuid': {
      type: 'integer',
      description: "Sub-account user ID to freeze or unfreeze. **Required**.\n\n**Requirements:**\n- Must be a valid sub-account UID\n- Must belong to the current master account (verified via member_relations)\n- Cannot be a deleted sub-account (status != SUB_MEMBER_STATUS_SOFT_DELETE)\n- Must be normal (type=1) or custodial (type=6) sub-account\n- Relationship type: MEMBER_RELATION_TYPE_OWN or MEMBER_RELATION_TYPE_ENTRUST_TRADE\n\n**Note:** The system will verify parent-child relationship before performing the operation.\n",
      
    },
    'frozen': {
      type: 'integer',
      description: "Freeze operation type. **Required**.\n\n**Values:**\n- `1`: Freeze the sub-account\n  - Status changes to \"frozen\" in database\n  - Login is banned (bizType=LOGIN, tag=account:login, banReason=USER_BAN_REASON_REQUEST_FROM_USER)\n  - All API keys are invalidated (cache cleared)\n  - Active sessions are terminated\n  - Notifications sent to dependent services\n- `0`: Unfreeze the sub-account\n  - Status changes to \"normal\" in database\n  - Login ban is removed\n  - API keys become active again\n\n**Note:** Only 0 or 1 are accepted. Any other value returns parameter error (141001).\n",
      enum: ['0', '1'],
    }
  },
  required: ['subuid', 'frozen'],
} as const

export const builder = (yargs: any) => yargs
  .option('subuid', { type: 'number', demandOption: true, describe: "Sub-account user ID to freeze or unfreeze. **Required**.\n\n**Requirements:**\n- Must be a valid sub-account UID\n- Must belong to the current master account (verified via member_relations)\n- Cannot be a deleted sub-account (status != SUB_MEMBER_STATUS_SOFT_DELETE)\n- Must be normal (type=1) or custodial (type=6) sub-account\n- Relationship type: MEMBER_RELATION_TYPE_OWN or MEMBER_RELATION_TYPE_ENTRUST_TRADE\n\n**Note:** The system will verify parent-child relationship before performing the operation.\n" })
  .option('frozen', { type: 'number', choices: ['0', '1'], demandOption: true, describe: "Freeze operation type. **Required**.\n\n**Values:**\n- `1`: Freeze the sub-account\n  - Status changes to \"frozen\" in database\n  - Login is banned (bizType=LOGIN, tag=account:login, banReason=USER_BAN_REASON_REQUEST_FROM_USER)\n  - All API keys are invalidated (cache cleared)\n  - Active sessions are terminated\n  - Notifications sent to dependent services\n- `0`: Unfreeze the sub-account\n  - Status changes to \"normal\" in database\n  - Login ban is removed\n  - API keys become active again\n\n**Note:** Only 0 or 1 are accepted. Any other value returns parameter error (141001).\n" })
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
  path: '/v5/user/frozen-sub-member',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/user/frozen-sub-member',
    
    body: { subuid: argv['subuid'], frozen: argv['frozen'] },
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
    operation: 'user frozen-sub-member',
    method: 'POST',
    path: '/v5/user/frozen-sub-member',
    params: argv,
  })
  return innerHandler(argv)
}
