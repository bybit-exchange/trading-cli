// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'update-apikey'
export const describe = "Modify Master API Key"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'read-only': {
      type: 'integer',
      description: "Whether the API key should be read-only.\n\n**Values:**\n- `0`: Read-write API key (can execute trades)\n- `1`: Read-only API key (can only query data)\n\n**Sensitive Permission Protection:**\n- For read-write keys (readOnly=0): Cannot modify permissions if original or new permissions contain sensitive operations (Withdraw, etc.)\n- 🚨 **Read-Write keys cannot add or delete FiatP2P, FiatBitPay, and FiatConvertBroker permissions**\n- Must use web interface to modify sensitive permissions\n",
      enum: ['0', '1'],
    },
    'ips': {
      type: 'string',
      description: "**DEPRECATED AND FORBIDDEN**\n\n❌ **Cannot modify IPs via API** - this parameter is ignored if provided.\n\n**Important:** Attempting to modify IPs will return error code 141019 (OpenAPIIPModifyForbidden).\n\n**To modify IPs:** Use the web interface at https://www.bybit.com\n",
      
    },
    'permissions': {
      type: 'string',
      description: "API key permissions to update. **Optional** - if not provided, keeps existing permissions.\n\n**Update Rules:**\n- Only specified permissions are validated and updated\n- Missing permission categories default to empty []\n- NFT permissions automatically removed (deprecated)\n- UTA accounts: DerivativesTrade auto-added if missing\n\n**Restrictions:**\n- Withdraw permission: Cannot add if not already present; requires IP whitelist\n- Affiliate permission: Mutually exclusive with all other permissions\n- Block Trade: Requires KYC and non-affiliate status\n- Fiat permissions: Require account validation\n- 🚨 **Read-Write keys cannot add or delete FiatP2P, FiatBitPay, and FiatConvertBroker permissions**\n",
      
    }
  },
  required: [],
} as const

export const builder = (yargs: any) => yargs
  .option('read-only', { type: 'number', choices: ['0', '1'], describe: "Whether the API key should be read-only.\n\n**Values:**\n- `0`: Read-write API key (can execute trades)\n- `1`: Read-only API key (can only query data)\n\n**Sensitive Permission Protection:**\n- For read-write keys (readOnly=0): Cannot modify permissions if original or new permissions contain sensitive operations (Withdraw, etc.)\n- 🚨 **Read-Write keys cannot add or delete FiatP2P, FiatBitPay, and FiatConvertBroker permissions**\n- Must use web interface to modify sensitive permissions\n" })
  .option('ips', { type: 'string', describe: "**DEPRECATED AND FORBIDDEN**\n\n❌ **Cannot modify IPs via API** - this parameter is ignored if provided.\n\n**Important:** Attempting to modify IPs will return error code 141019 (OpenAPIIPModifyForbidden).\n\n**To modify IPs:** Use the web interface at https://www.bybit.com\n" })
  .option('permissions', { type: 'string', describe: "API key permissions to update. **Optional** - if not provided, keeps existing permissions.\n\n**Update Rules:**\n- Only specified permissions are validated and updated\n- Missing permission categories default to empty []\n- NFT permissions automatically removed (deprecated)\n- UTA accounts: DerivativesTrade auto-added if missing\n\n**Restrictions:**\n- Withdraw permission: Cannot add if not already present; requires IP whitelist\n- Affiliate permission: Mutually exclusive with all other permissions\n- Block Trade: Requires KYC and non-affiliate status\n- Fiat permissions: Require account validation\n- 🚨 **Read-Write keys cannot add or delete FiatP2P, FiatBitPay, and FiatConvertBroker permissions**\n" })
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
  path: '/v5/user/update-api',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/user/update-api',
    
    body: { readOnly: argv['read-only'], ips: argv['ips'], permissions: argv['permissions'] },
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
    operation: 'user update-apikey',
    method: 'POST',
    path: '/v5/user/update-api',
    params: argv,
  })
  return innerHandler(argv)
}
