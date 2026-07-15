// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'delete-sub-member-v5'
export const describe = "Delete Sub-account"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'subuid': {
      type: 'integer',
      description: "Sub-account user ID to delete. **Required**.\n\n**Requirements:**\n- Must be a valid sub-account belonging to the master account\n- Sub-account must meet all deletion requirements\n- Sub-account must not be already deleted\n",
      
    }
  },
  required: ['subuid'],
} as const

export const builder = (yargs: any) => yargs
  .option('subuid', { type: 'number', demandOption: true, describe: "Sub-account user ID to delete. **Required**.\n\n**Requirements:**\n- Must be a valid sub-account belonging to the master account\n- Sub-account must meet all deletion requirements\n- Sub-account must not be already deleted\n" })
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
  path: '/v5/user/del-submember',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/user/del-submember',
    
    body: { subuid: argv['subuid'] },
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
    operation: 'user delete-sub-member-v5',
    method: 'POST',
    path: '/v5/user/del-submember',
    params: argv,
  })
  return innerHandler(argv)
}
