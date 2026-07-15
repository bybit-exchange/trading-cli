// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-pre-upgrade-execution-list'
export const describe = "Get Pre-upgrade Execution List"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type:\n- `linear`: USDT perpetual, USDC contract\n- `inverse`: Inverse perpetual, Inverse futures\n- `option`: Options\n- `spot`: Spot trading\n",
      enum: ['linear', 'inverse', 'option', 'spot'],
    },
    'symbol': {
      type: 'string',
      description: "Symbol name, e.g. `BTCUSDT`, uppercase only",
      
    },
    'order-id': {
      type: 'string',
      description: "Order ID",
      
    },
    'order-link-id': {
      type: 'string',
      description: "User customized order ID",
      
    },
    'base-coin': {
      type: 'string',
      description: "Base coin, uppercase only. For `option` category",
      
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in **milliseconds**. Default: 7 days before current time",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in **milliseconds**. Default: current time",
      
    },
    'exec-type': {
      type: 'string',
      description: "Execution type filter Execution type filter:\n- `Trade`: Normal trade\n- `AdlTrade`: Auto-deleveraging trade\n- `Funding`: Funding fee settlement\n- `BustTrade`: Bankruptcy trade\n- `Delivery`: Delivery\n- `Settle`: Settlement\n- `BlockTrade`: Block trade\n- `MovePosition`: Move position\n- `FutureSpread`: Future spread\n- `UNKNOWN`: Unknown type\n",
      enum: ['Trade', 'AdlTrade', 'Funding', 'BustTrade', 'Delivery', 'Settle', 'BlockTrade', 'MovePosition', 'FutureSpread', 'UNKNOWN'],
    },
    'limit': {
      type: 'integer',
      description: "Number of items per page. Default: `50`, Range: [`1`, `100`]",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse', 'option', 'spot'], demandOption: true, describe: "Product type:\n- `linear`: USDT perpetual, USDC contract\n- `inverse`: Inverse perpetual, Inverse futures\n- `option`: Options\n- `spot`: Spot trading\n" })
  .option('symbol', { type: 'string', describe: "Symbol name, e.g. `BTCUSDT`, uppercase only" })
  .option('order-id', { type: 'string', describe: "Order ID" })
  .option('order-link-id', { type: 'string', describe: "User customized order ID" })
  .option('base-coin', { type: 'string', describe: "Base coin, uppercase only. For `option` category" })
  .option('start-time', { type: 'number', describe: "Start timestamp in **milliseconds**. Default: 7 days before current time" })
  .option('end-time', { type: 'number', describe: "End timestamp in **milliseconds**. Default: current time" })
  .option('exec-type', { type: 'string', choices: ['Trade', 'AdlTrade', 'Funding', 'BustTrade', 'Delivery', 'Settle', 'BlockTrade', 'MovePosition', 'FutureSpread', 'UNKNOWN'], describe: "Execution type filter Execution type filter:\n- `Trade`: Normal trade\n- `AdlTrade`: Auto-deleveraging trade\n- `Funding`: Funding fee settlement\n- `BustTrade`: Bankruptcy trade\n- `Delivery`: Delivery\n- `Settle`: Settlement\n- `BlockTrade`: Block trade\n- `MovePosition`: Move position\n- `FutureSpread`: Future spread\n- `UNKNOWN`: Unknown type\n" })
  .option('limit', { type: 'number', describe: "Number of items per page. Default: `50`, Range: [`1`, `100`]" })
  .option('cursor', { type: 'string', describe: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page" })
  .option('json-schema', { type: 'boolean', describe: 'Print JSON Schema and exit' })
  
function filterDefined(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

const innerHandler = createHandler({
  method: 'GET',
  path: '/v5/pre-upgrade/execution/list',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/pre-upgrade/execution/list',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], orderId: argv['order-id'], orderLinkId: argv['order-link-id'], baseCoin: argv['base-coin'], startTime: argv['start-time'], endTime: argv['end-time'], execType: argv['exec-type'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
