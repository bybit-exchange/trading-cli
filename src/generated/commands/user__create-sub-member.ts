// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-sub-member'
export const describe = "Create Sub UID"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'username': {
      type: 'string',
      description: "Username of the new sub user.\n\n**Requirements:**\n- 6-16 characters\n- Must include both numbers and letters (alphanumeric only)\n- Cannot be the same as existing or deleted usernames\n- Case-sensitive\n",
      
    },
    'password': {
      type: 'string',
      description: "Password for the new sub user. **Optional**.\n\n**Requirements:**\n- 8-30 characters\n- Must include at least one number (0-9)\n- Must include at least one lowercase letter (a-z)\n- Must include at least one uppercase letter (A-Z)\n- Can include special characters\n\n**Important:**\n- Password will be automatically SHA256 hashed by the server before storage\n- If not provided, the sub user will be created with `noPwd=1` status:\n  - Sub user **cannot login** until password is set via other API\n  - Quick login (`switch=1`) will not work without password\n",
      
    },
    'member-type': {
      type: 'integer',
      description: "Type of subaccount to create:\n- `1`: Normal subaccount (MEMBER_RELATION_TYPE_OWN) - standard sub-account for trading\n- `6`: Custodial subaccount (MEMBER_RELATION_TYPE_ENTRUST_TRADE) - for institutional custody use\n\n**Restrictions:**\n- Turkish users (authenticationId=3) **cannot** create `memberType=6`\n- Different sub-account number limits apply based on type\n",
      enum: ['1', '6'],
    },
    'switch': {
      type: 'integer',
      description: "Quick login switch:\n- `0`: Turn off quick login (default)\n- `1`: Turn on quick login - master account can quickly switch to this sub-account without entering password\n\n**Requirements:**\n- Only works when password is provided (not available for `noPwd=1` accounts)\n- Allows master account to seamlessly switch between sub-accounts\n",
      enum: ['0', '1'],
    },
    'is-uta': {
      type: 'boolean',
      description: "Whether to create as UTA (Unified Trading Account).\n\n**Default behavior:**\n- `true` (default): Create as UTA account (recommended)\n- `false`: Create as Classic account (only available for whitelisted broker IDs)\n\n**Important:**\n- UTA account creation must be enabled via system configuration\n- If UTA registration is disabled, error code `141015` will be returned\n- Classic accounts are only available for specific broker IDs in whitelist\n",
      
    },
    'note': {
      type: 'string',
      description: "Set a remark/note for the sub user account.\nUseful for internal identification and management purposes.\n\n**Storage:**\n- Saved in database and returned in response as `remark` field\n- Can be updated later via other API endpoints\n",
      
    }
  },
  required: ['username', 'member-type'],
} as const

export const builder = (yargs: any) => yargs
  .option('username', { type: 'string', demandOption: true, describe: "Username of the new sub user.\n\n**Requirements:**\n- 6-16 characters\n- Must include both numbers and letters (alphanumeric only)\n- Cannot be the same as existing or deleted usernames\n- Case-sensitive\n" })
  .option('password', { type: 'string', describe: "Password for the new sub user. **Optional**.\n\n**Requirements:**\n- 8-30 characters\n- Must include at least one number (0-9)\n- Must include at least one lowercase letter (a-z)\n- Must include at least one uppercase letter (A-Z)\n- Can include special characters\n\n**Important:**\n- Password will be automatically SHA256 hashed by the server before storage\n- If not provided, the sub user will be created with `noPwd=1` status:\n  - Sub user **cannot login** until password is set via other API\n  - Quick login (`switch=1`) will not work without password\n" })
  .option('member-type', { type: 'number', choices: ['1', '6'], demandOption: true, describe: "Type of subaccount to create:\n- `1`: Normal subaccount (MEMBER_RELATION_TYPE_OWN) - standard sub-account for trading\n- `6`: Custodial subaccount (MEMBER_RELATION_TYPE_ENTRUST_TRADE) - for institutional custody use\n\n**Restrictions:**\n- Turkish users (authenticationId=3) **cannot** create `memberType=6`\n- Different sub-account number limits apply based on type\n" })
  .option('switch', { type: 'number', choices: ['0', '1'], describe: "Quick login switch:\n- `0`: Turn off quick login (default)\n- `1`: Turn on quick login - master account can quickly switch to this sub-account without entering password\n\n**Requirements:**\n- Only works when password is provided (not available for `noPwd=1` accounts)\n- Allows master account to seamlessly switch between sub-accounts\n" })
  .option('is-uta', { type: 'boolean', describe: "Whether to create as UTA (Unified Trading Account).\n\n**Default behavior:**\n- `true` (default): Create as UTA account (recommended)\n- `false`: Create as Classic account (only available for whitelisted broker IDs)\n\n**Important:**\n- UTA account creation must be enabled via system configuration\n- If UTA registration is disabled, error code `141015` will be returned\n- Classic accounts are only available for specific broker IDs in whitelist\n" })
  .option('note', { type: 'string', describe: "Set a remark/note for the sub user account.\nUseful for internal identification and management purposes.\n\n**Storage:**\n- Saved in database and returned in response as `remark` field\n- Can be updated later via other API endpoints\n" })
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
  path: '/v5/user/create-sub-member',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/user/create-sub-member',
    
    body: { username: argv['username'], password: argv['password'], memberType: argv['member-type'], switch: argv['switch'], isUta: argv['is-uta'], note: argv['note'] },
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
    operation: 'user create-sub-member',
    method: 'POST',
    path: '/v5/user/create-sub-member',
    params: argv,
  })
  return innerHandler(argv)
}
