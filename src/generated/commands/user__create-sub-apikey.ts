// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'create-sub-apikey'
export const describe = "Create Sub API Key"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'subuid': {
      type: 'integer',
      description: "Sub-account user ID to create API key for. **Required**.\n\n**Requirements:**\n- Must be a valid sub-account belonging to the master account\n- Sub-account must be in normal or banned status (not deleted)\n- Supports: normal sub-accounts (type=1), demo accounts, custodial accounts (type=6)\n",
      
    },
    'read-only': {
      type: 'integer',
      description: "Whether the API key is read-only. **Required**.\n\n**Values:**\n- `0`: Read-write API key - can execute trades and operations\n- `1`: Read-only API key - can only query data, cannot execute operations\n\n**Note:** All permissions will be read-only when set to 1.\n",
      enum: ['0', '1'],
    },
    'ips': {
      type: 'string',
      description: "IP whitelist for the API key. **Optional but STRONGLY RECOMMENDED**.\n\n**Format:**\n- Empty string `\"\"`: No IP restriction (⚠️ **API key will expire in 90 days**)\n- Single IP: `\"192.168.1.100\"`\n- Multiple IPs: `\"192.168.1.100,192.168.1.101,192.168.1.102\"` (comma-separated)\n- IP range: Not supported in current version\n\n**Security:**\n- 🚨 **90-Day Expiration Rule**: API keys without IP binding will be **invalid after 90 days**\n- Recommended to ALWAYS set IP restrictions for production API keys\n- Leave empty for development/testing environments only (with expiration awareness)\n",
      
    },
    'permissions': {
      type: 'string',
      description: "API key permissions object. **Required - at least one permission must be specified**.\n\n**Permission Categories:**\n- **ContractTrade**: Perpetual and futures trading\n- **Spot**: Spot trading\n- **Wallet**: Asset management and transfers\n- **Options**: Options trading\n- **Derivatives**: Unified account derivatives permissions (auto-added for UTA)\n- **CopyTrading**: Copy trading (not supported for custodial sub-accounts)\n- **BlockTrade**: Block trade\n- **Exchange**: Exchange services\n- **NFT**: NFT trading (⚠️ deprecated, will be automatically removed)\n- **Earn**: Bybit Earn products\n- **Affiliate**: Affiliate program (⚠️ MASTER ACCOUNT ONLY - not available for sub-accounts)\n- **FiatP2P**: Fiat P2P trading (⚠️ MASTER ACCOUNT ONLY - not available for sub-accounts)\n- **FiatBitPay**: Bybit Pay services (⚠️ MASTER ACCOUNT ONLY - not available for sub-accounts)\n- **FiatConvertBroker**: Fiat convert broker (⚠️ MASTER ACCOUNT ONLY - not available for sub-accounts)\n\n**Sub-account Restrictions:**\n- ❌ Cannot use: `\"SubMemberTransfer\"`, `\"Withdraw\"` in Wallet\n- ❌ Cannot use: Affiliate, FiatP2P, FiatBitPay, FiatConvertBroker (master account only)\n- ❌ Demo accounts: Only specific permissions allowed (see configuration)\n- ❌ CT Broker sub-accounts: Cannot have Options, Spot, BlockTrade, Exchange\n- ❌ Escrow fund sub-accounts: Cannot have Wallet permissions\n- ❌ Custodial sub-accounts (entrust type): Cannot have CopyTrading\n\n**Format:** JSON object with permission categories as keys, arrays of permission strings as values\n",
      
    },
    'note': {
      type: 'string',
      description: "Note/description for the API key. **Optional**.\n\n**Usage:**\n- Helps identify the purpose of this API key\n- Visible in API key management interface\n- Maximum 200 characters\n",
      
    }
  },
  required: ['subuid', 'read-only', 'permissions'],
} as const

export const builder = (yargs: any) => yargs
  .option('subuid', { type: 'number', demandOption: true, describe: "Sub-account user ID to create API key for. **Required**.\n\n**Requirements:**\n- Must be a valid sub-account belonging to the master account\n- Sub-account must be in normal or banned status (not deleted)\n- Supports: normal sub-accounts (type=1), demo accounts, custodial accounts (type=6)\n" })
  .option('read-only', { type: 'number', choices: ['0', '1'], demandOption: true, describe: "Whether the API key is read-only. **Required**.\n\n**Values:**\n- `0`: Read-write API key - can execute trades and operations\n- `1`: Read-only API key - can only query data, cannot execute operations\n\n**Note:** All permissions will be read-only when set to 1.\n" })
  .option('ips', { type: 'string', describe: "IP whitelist for the API key. **Optional but STRONGLY RECOMMENDED**.\n\n**Format:**\n- Empty string `\"\"`: No IP restriction (⚠️ **API key will expire in 90 days**)\n- Single IP: `\"192.168.1.100\"`\n- Multiple IPs: `\"192.168.1.100,192.168.1.101,192.168.1.102\"` (comma-separated)\n- IP range: Not supported in current version\n\n**Security:**\n- 🚨 **90-Day Expiration Rule**: API keys without IP binding will be **invalid after 90 days**\n- Recommended to ALWAYS set IP restrictions for production API keys\n- Leave empty for development/testing environments only (with expiration awareness)\n" })
  .option('permissions', { type: 'string', demandOption: true, describe: "API key permissions object. **Required - at least one permission must be specified**.\n\n**Permission Categories:**\n- **ContractTrade**: Perpetual and futures trading\n- **Spot**: Spot trading\n- **Wallet**: Asset management and transfers\n- **Options**: Options trading\n- **Derivatives**: Unified account derivatives permissions (auto-added for UTA)\n- **CopyTrading**: Copy trading (not supported for custodial sub-accounts)\n- **BlockTrade**: Block trade\n- **Exchange**: Exchange services\n- **NFT**: NFT trading (⚠️ deprecated, will be automatically removed)\n- **Earn**: Bybit Earn products\n- **Affiliate**: Affiliate program (⚠️ MASTER ACCOUNT ONLY - not available for sub-accounts)\n- **FiatP2P**: Fiat P2P trading (⚠️ MASTER ACCOUNT ONLY - not available for sub-accounts)\n- **FiatBitPay**: Bybit Pay services (⚠️ MASTER ACCOUNT ONLY - not available for sub-accounts)\n- **FiatConvertBroker**: Fiat convert broker (⚠️ MASTER ACCOUNT ONLY - not available for sub-accounts)\n\n**Sub-account Restrictions:**\n- ❌ Cannot use: `\"SubMemberTransfer\"`, `\"Withdraw\"` in Wallet\n- ❌ Cannot use: Affiliate, FiatP2P, FiatBitPay, FiatConvertBroker (master account only)\n- ❌ Demo accounts: Only specific permissions allowed (see configuration)\n- ❌ CT Broker sub-accounts: Cannot have Options, Spot, BlockTrade, Exchange\n- ❌ Escrow fund sub-accounts: Cannot have Wallet permissions\n- ❌ Custodial sub-accounts (entrust type): Cannot have CopyTrading\n\n**Format:** JSON object with permission categories as keys, arrays of permission strings as values\n" })
  .option('note', { type: 'string', describe: "Note/description for the API key. **Optional**.\n\n**Usage:**\n- Helps identify the purpose of this API key\n- Visible in API key management interface\n- Maximum 200 characters\n" })
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
  path: '/v5/user/create-sub-api',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/user/create-sub-api',
    
    body: { subuid: argv['subuid'], readOnly: argv['read-only'], ips: argv['ips'], permissions: argv['permissions'], note: argv['note'] },
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
    operation: 'user create-sub-apikey',
    method: 'POST',
    path: '/v5/user/create-sub-api',
    params: argv,
  })
  return innerHandler(argv)
}
