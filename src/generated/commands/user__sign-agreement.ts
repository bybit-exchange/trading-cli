// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
import { checkConfirm } from '../../runtime/confirm.js'
import { makeOrderLinkId } from '../../runtime/order-link.js'
export const command = 'sign-agreement'
export const describe = "Sign Agreement"
export const isWriteOp = true

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'integer',
      description: "Agreement category. **Required**.\n\n**Supported Values:**\n- `2`: Metals commodity contracts (CategoryCommodityAgreement)\n\n**Validation:**\n- Must be exactly `2`\n- Other values will return error `141001` (param error)\n\n**Business Rules:**\n- Only commodity agreement (metals) is currently supported\n- Future categories may be added by Bybit\n",
      enum: ['2'],
    },
    'agree': {
      type: 'boolean',
      description: "Agreement consent flag. **Required**.\n\n**Behavior:**\n- Must be `true` to sign the agreement\n- Setting to `false` is not supported for signing and will return error `141001`\n- This confirms the user's consent to the agreement terms\n\n**Note:** This is a one-way action - once signed, the agreement cannot be unsigned via API.\n",
      enum: ['true'],
    }
  },
  required: ['category', 'agree'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'number', choices: ['2'], demandOption: true, describe: "Agreement category. **Required**.\n\n**Supported Values:**\n- `2`: Metals commodity contracts (CategoryCommodityAgreement)\n\n**Validation:**\n- Must be exactly `2`\n- Other values will return error `141001` (param error)\n\n**Business Rules:**\n- Only commodity agreement (metals) is currently supported\n- Future categories may be added by Bybit\n" })
  .option('agree', { type: 'boolean', choices: ['true'], demandOption: true, describe: "Agreement consent flag. **Required**.\n\n**Behavior:**\n- Must be `true` to sign the agreement\n- Setting to `false` is not supported for signing and will return error `141001`\n- This confirms the user's consent to the agreement terms\n\n**Note:** This is a one-way action - once signed, the agreement cannot be unsigned via API.\n" })
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
  path: '/v5/user/agreement',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'POST',
    path: '/v5/user/agreement',
    
    body: { category: argv['category'], agree: argv['agree'] },
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
    operation: 'user sign-agreement',
    method: 'POST',
    path: '/v5/user/agreement',
    params: argv,
  })
  return innerHandler(argv)
}
