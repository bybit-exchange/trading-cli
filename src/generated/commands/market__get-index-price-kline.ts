// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-index-price-kline'
export const describe = "Get Index Price Kline"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type. Defaults to `linear` if omitted.\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n",
      enum: ['linear', 'inverse'],
    },
    'symbol': {
      type: 'string',
      description: "Trading pair symbol in uppercase, e.g. `BTCUSDT`",
      
    },
    'interval': {
      type: 'string',
      description: "Kline interval.\n- `1`, `3`, `5`, `15`, `30`: minutes\n- `60`, `120`, `240`, `360`, `720`: minutes (1h, 2h, 4h, 6h, 12h)\n- `D`: 1 day\n- `W`: 1 week\n- `M`: 1 month\n",
      enum: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', 'D', 'W', 'M'],
    },
    'start': {
      type: 'integer',
      description: "Start timestamp in milliseconds (Unix timestamp)",
      
    },
    'end': {
      type: 'integer',
      description: "End timestamp in milliseconds (Unix timestamp)",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of data entries per page, range 1–1000. Default is `200`",
      
    }
  },
  required: ['symbol', 'interval'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'inverse'], describe: "Product type. Defaults to `linear` if omitted.\n- `linear`: USDT / USDC contract\n- `inverse`: Inverse contract\n" })
  .option('symbol', { type: 'string', demandOption: true, describe: "Trading pair symbol in uppercase, e.g. `BTCUSDT`" })
  .option('interval', { type: 'string', choices: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', 'D', 'W', 'M'], demandOption: true, describe: "Kline interval.\n- `1`, `3`, `5`, `15`, `30`: minutes\n- `60`, `120`, `240`, `360`, `720`: minutes (1h, 2h, 4h, 6h, 12h)\n- `D`: 1 day\n- `W`: 1 week\n- `M`: 1 month\n" })
  .option('start', { type: 'number', describe: "Start timestamp in milliseconds (Unix timestamp)" })
  .option('end', { type: 'number', describe: "End timestamp in milliseconds (Unix timestamp)" })
  .option('limit', { type: 'number', describe: "Number of data entries per page, range 1–1000. Default is `200`" })
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
  path: '/v5/market/index-price-kline',
  requiresAuth: false,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/market/index-price-kline',
    query: filterDefined({ category: argv['category'], symbol: argv['symbol'], interval: argv['interval'], start: argv['start'], end: argv['end'], limit: argv['limit'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
