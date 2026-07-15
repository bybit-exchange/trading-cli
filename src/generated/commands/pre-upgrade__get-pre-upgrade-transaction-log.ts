// AUTO-GENERATED. DO NOT EDIT. Regenerate: pnpm generate
import { createHandler } from '../../runtime/handler.js'
export const command = 'get-pre-upgrade-transaction-log'
export const describe = "Get Pre-upgrade Transaction Log"
export const isWriteOp = false

export const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    'category': {
      type: 'string',
      description: "Product type:\n- `linear`: USDC perpetual\n- `option`: Options\n",
      enum: ['linear', 'option'],
    },
    'base-coin': {
      type: 'string',
      description: "Base coin, uppercase only. e.g. `BTC`",
      
    },
    'type': {
      type: 'string',
      description: "Transaction log type filter. Full list of available values:\n\n**Basic Trading**: `TRADE`, `SETTLEMENT`, `DELIVERY`, `LIQUIDATION`, `PART_LIQUIDATION`, `ADL`, `CLOSEPNL`, `POSITION_TAKE_OVER`\n**Transfer**: `TRANSFER_IN`, `TRANSFER_OUT`\n**Fee**: `INSURANCE_FUND`, `FEE_REFUND`, `INTEREST`, `FIXED_INTEREST`, `FIXED_INTEREST_REFUND`\n**Rewards/Airdrop**: `BONUS`, `BONUS_RECOLLECT`, `BONUS_TRANSFER_IN`, `BONUS_TRANSFER_OUT`, `AIRDROP`, `AIRDROP_OUT`\n**Exchange**: `OTC_TRADE`, `CURRENCY_BUY`, `CURRENCY_SELL`, `CURRENCY_BUY_MANUEL`, `CURRENCY_SELL_MANUEL`, `AUTO_DEDUCTION`\n**UTA Loan**: `MANUAL_LOANS_BORROW`, `MANUAL_LOANS_REPAY`, `AUTO_LOANS_BORROW`, `AUTO_LOANS_REPAY`\n**Institutional Loan**: `INSTITUTION_LOAN_IN`, `INSTITUTION_PAYBACK_PRINCIPAL_OUT`, etc.\n**Earn**: `FLEXIBLE_STAKING_SUBSCRIPTION`, `ONCHAINEARN_SUBSCRIPTION`, `DEFI_INVESTMENT_SUBSCRIPTION`, etc.\n",
      enum: ['TRADE', 'SETTLEMENT', 'DELIVERY', 'LIQUIDATION', 'PART_LIQUIDATION', 'ADL', 'CLOSEPNL', 'POSITION_TAKE_OVER', 'TRANSFER_IN', 'TRANSFER_OUT', 'INSURANCE_FUND', 'FEE_REFUND', 'INTEREST', 'FIXED_INTEREST', 'FIXED_INTEREST_REFUND', 'BONUS', 'BONUS_RECOLLECT', 'BONUS_TRANSFER_IN', 'BONUS_TRANSFER_OUT', 'AIRDROP', 'AIRDROP_OUT', 'AIRDROP_EFTD', 'AIRDROP_OUT_EFTD', 'AIRDROP_FIAT', 'AIRDROP_OUT_FIAT', 'OTC_TRADE', 'CURRENCY_BUY', 'CURRENCY_SELL', 'CURRENCY_BUY_MANUEL', 'CURRENCY_SELL_MANUEL', 'AUTO_DEDUCTION', 'PERP_SYMBOL_SETTLE', 'SPREAD_FEE_OUT', 'MANUAL_LOANS_BORROW', 'MANUAL_LOANS_REPAY', 'AUTO_LOANS_BORROW', 'AUTO_LOANS_REPAY', 'SPOT_REPAYMENT_BUY', 'SPOT_REPAYMENT_SELL', 'LOANS_ASSET_REDEMPTION', 'LOANS_PLEDGE_ASSET', 'LOANS_BORROW_FUNDS', 'LOANS_REPAY_FUNDS', 'INSTITUTION_LOAN_IN', 'INSTITUTION_PAYBACK_PRINCIPAL_OUT', 'INSTITUTION_PAYBACK_INTEREST_OUT', 'INSTITUTION_EXCHANGE_SELL', 'INSTITUTION_EXCHANGE_BUY', 'INSTITUTION_LIQ_PRINCIPAL_OUT', 'INSTITUTION_LIQ_INTEREST_OUT', 'INSTITUTION_LOAN_TRANSFER_IN', 'INSTITUTION_LOAN_TRANSFER_OUT', 'INSTITUTION_LOAN_WITHOUT_WITHDRAW', 'INSTITUTION_LOAN_RESERVE_IN', 'INSTITUTION_LOAN_RESERVE_OUT', 'PREMARKET_TRANSFER_IN', 'PREMARKET_TRANSFER_OUT', 'PREMARKET_DELIVERY_SELL_NEW_COIN', 'PREMARKET_DELIVERY_BUY_NEW_COIN', 'PREMARKET_DELIVERY_PLEDGE_PAY_SELLER', 'PREMARKET_DELIVERY_PLEDGE_BACK', 'PREMARKET_ROLLBACK_PLEDGE_BACK', 'PREMARKET_ROLLBACK_PLEDGE_PENALTY_TO_BUYER', 'TOKENS_SUBSCRIPTION', 'TOKENS_REDEMPTION', 'FLEXIBLE_STAKING_SUBSCRIPTION', 'FLEXIBLE_STAKING_REDEMPTION', 'FLEXIBLE_STAKING_REFUND', 'FIXED_STAKING_SUBSCRIPTION', 'FIXED_STAKING_REFUND', 'ONCHAINEARN_SUBSCRIPTION', 'ONCHAINEARN_REFUND', 'ONCHAINEARN_REDEMPTION', 'ONCHAINEARN_REDEMPTION_PRINCIPAL', 'ONCHAINEARN_LST', 'DEFI_INVESTMENT_SUBSCRIPTION', 'DEFI_INVESTMENT_REFUND', 'DEFI_INVESTMENT_REDEMPTION', 'STRUCTURE_PRODUCT_SUBSCRIPTION', 'STRUCTURE_PRODUCT_REFUND', 'CLASSIC_WEALTH_MANAGEMENT_SUBSCRIPTION', 'PREMIUM_WEALTH_MANAGEMENT_SUBSCRIPTION', 'PREMIUM_WEALTH_MANAGEMENT_REFUND', 'LIQUIDITY_MINING_SUBSCRIPTION', 'LIQUIDITY_MINING_REFUND', 'PWM_SUBSCRIPTION', 'PWM_REFUND', 'CUSTODY_LOCK', 'CUSTODY_UNLOCK', 'CUSTODY_UNLOCK_REFUND', 'CUSTODY_NETWORK_FEE', 'CUSTODY_SETTLE_FEE', 'PLATFORM_TOKEN_MNT_LIQRECALLEDMMNT', 'PLATFORM_TOKEN_MNT_LIQRETURNEDMNT', 'PEF_TRANSFER_IN', 'PEF_TRANSFER_OUT', 'PEF_PROFIT_SHARE'],
    },
    'start-time': {
      type: 'integer',
      description: "Start timestamp in **milliseconds**. Default: 7 days before current time. With endTime: span <= 7 days",
      
    },
    'end-time': {
      type: 'integer',
      description: "End timestamp in **milliseconds**. Default: current time. With startTime: span <= 7 days",
      
    },
    'limit': {
      type: 'integer',
      description: "Number of items per page. Default: `20`, Range: [`1`, `50`]",
      
    },
    'cursor': {
      type: 'string',
      description: "Pagination cursor. Use `nextPageCursor` from the response to retrieve the next page",
      
    }
  },
  required: ['category'],
} as const

export const builder = (yargs: any) => yargs
  .option('category', { type: 'string', choices: ['linear', 'option'], demandOption: true, describe: "Product type:\n- `linear`: USDC perpetual\n- `option`: Options\n" })
  .option('base-coin', { type: 'string', describe: "Base coin, uppercase only. e.g. `BTC`" })
  .option('type', { type: 'string', choices: ['TRADE', 'SETTLEMENT', 'DELIVERY', 'LIQUIDATION', 'PART_LIQUIDATION', 'ADL', 'CLOSEPNL', 'POSITION_TAKE_OVER', 'TRANSFER_IN', 'TRANSFER_OUT', 'INSURANCE_FUND', 'FEE_REFUND', 'INTEREST', 'FIXED_INTEREST', 'FIXED_INTEREST_REFUND', 'BONUS', 'BONUS_RECOLLECT', 'BONUS_TRANSFER_IN', 'BONUS_TRANSFER_OUT', 'AIRDROP', 'AIRDROP_OUT', 'AIRDROP_EFTD', 'AIRDROP_OUT_EFTD', 'AIRDROP_FIAT', 'AIRDROP_OUT_FIAT', 'OTC_TRADE', 'CURRENCY_BUY', 'CURRENCY_SELL', 'CURRENCY_BUY_MANUEL', 'CURRENCY_SELL_MANUEL', 'AUTO_DEDUCTION', 'PERP_SYMBOL_SETTLE', 'SPREAD_FEE_OUT', 'MANUAL_LOANS_BORROW', 'MANUAL_LOANS_REPAY', 'AUTO_LOANS_BORROW', 'AUTO_LOANS_REPAY', 'SPOT_REPAYMENT_BUY', 'SPOT_REPAYMENT_SELL', 'LOANS_ASSET_REDEMPTION', 'LOANS_PLEDGE_ASSET', 'LOANS_BORROW_FUNDS', 'LOANS_REPAY_FUNDS', 'INSTITUTION_LOAN_IN', 'INSTITUTION_PAYBACK_PRINCIPAL_OUT', 'INSTITUTION_PAYBACK_INTEREST_OUT', 'INSTITUTION_EXCHANGE_SELL', 'INSTITUTION_EXCHANGE_BUY', 'INSTITUTION_LIQ_PRINCIPAL_OUT', 'INSTITUTION_LIQ_INTEREST_OUT', 'INSTITUTION_LOAN_TRANSFER_IN', 'INSTITUTION_LOAN_TRANSFER_OUT', 'INSTITUTION_LOAN_WITHOUT_WITHDRAW', 'INSTITUTION_LOAN_RESERVE_IN', 'INSTITUTION_LOAN_RESERVE_OUT', 'PREMARKET_TRANSFER_IN', 'PREMARKET_TRANSFER_OUT', 'PREMARKET_DELIVERY_SELL_NEW_COIN', 'PREMARKET_DELIVERY_BUY_NEW_COIN', 'PREMARKET_DELIVERY_PLEDGE_PAY_SELLER', 'PREMARKET_DELIVERY_PLEDGE_BACK', 'PREMARKET_ROLLBACK_PLEDGE_BACK', 'PREMARKET_ROLLBACK_PLEDGE_PENALTY_TO_BUYER', 'TOKENS_SUBSCRIPTION', 'TOKENS_REDEMPTION', 'FLEXIBLE_STAKING_SUBSCRIPTION', 'FLEXIBLE_STAKING_REDEMPTION', 'FLEXIBLE_STAKING_REFUND', 'FIXED_STAKING_SUBSCRIPTION', 'FIXED_STAKING_REFUND', 'ONCHAINEARN_SUBSCRIPTION', 'ONCHAINEARN_REFUND', 'ONCHAINEARN_REDEMPTION', 'ONCHAINEARN_REDEMPTION_PRINCIPAL', 'ONCHAINEARN_LST', 'DEFI_INVESTMENT_SUBSCRIPTION', 'DEFI_INVESTMENT_REFUND', 'DEFI_INVESTMENT_REDEMPTION', 'STRUCTURE_PRODUCT_SUBSCRIPTION', 'STRUCTURE_PRODUCT_REFUND', 'CLASSIC_WEALTH_MANAGEMENT_SUBSCRIPTION', 'PREMIUM_WEALTH_MANAGEMENT_SUBSCRIPTION', 'PREMIUM_WEALTH_MANAGEMENT_REFUND', 'LIQUIDITY_MINING_SUBSCRIPTION', 'LIQUIDITY_MINING_REFUND', 'PWM_SUBSCRIPTION', 'PWM_REFUND', 'CUSTODY_LOCK', 'CUSTODY_UNLOCK', 'CUSTODY_UNLOCK_REFUND', 'CUSTODY_NETWORK_FEE', 'CUSTODY_SETTLE_FEE', 'PLATFORM_TOKEN_MNT_LIQRECALLEDMMNT', 'PLATFORM_TOKEN_MNT_LIQRETURNEDMNT', 'PEF_TRANSFER_IN', 'PEF_TRANSFER_OUT', 'PEF_PROFIT_SHARE'], describe: "Transaction log type filter. Full list of available values:\n\n**Basic Trading**: `TRADE`, `SETTLEMENT`, `DELIVERY`, `LIQUIDATION`, `PART_LIQUIDATION`, `ADL`, `CLOSEPNL`, `POSITION_TAKE_OVER`\n**Transfer**: `TRANSFER_IN`, `TRANSFER_OUT`\n**Fee**: `INSURANCE_FUND`, `FEE_REFUND`, `INTEREST`, `FIXED_INTEREST`, `FIXED_INTEREST_REFUND`\n**Rewards/Airdrop**: `BONUS`, `BONUS_RECOLLECT`, `BONUS_TRANSFER_IN`, `BONUS_TRANSFER_OUT`, `AIRDROP`, `AIRDROP_OUT`\n**Exchange**: `OTC_TRADE`, `CURRENCY_BUY`, `CURRENCY_SELL`, `CURRENCY_BUY_MANUEL`, `CURRENCY_SELL_MANUEL`, `AUTO_DEDUCTION`\n**UTA Loan**: `MANUAL_LOANS_BORROW`, `MANUAL_LOANS_REPAY`, `AUTO_LOANS_BORROW`, `AUTO_LOANS_REPAY`\n**Institutional Loan**: `INSTITUTION_LOAN_IN`, `INSTITUTION_PAYBACK_PRINCIPAL_OUT`, etc.\n**Earn**: `FLEXIBLE_STAKING_SUBSCRIPTION`, `ONCHAINEARN_SUBSCRIPTION`, `DEFI_INVESTMENT_SUBSCRIPTION`, etc.\n" })
  .option('start-time', { type: 'number', describe: "Start timestamp in **milliseconds**. Default: 7 days before current time. With endTime: span <= 7 days" })
  .option('end-time', { type: 'number', describe: "End timestamp in **milliseconds**. Default: current time. With startTime: span <= 7 days" })
  .option('limit', { type: 'number', describe: "Number of items per page. Default: `20`, Range: [`1`, `50`]" })
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
  path: '/v5/pre-upgrade/account/transaction-log',
  requiresAuth: true,
  mapArgs: (argv) => ({
    method: 'GET',
    path: '/v5/pre-upgrade/account/transaction-log',
    query: filterDefined({ category: argv['category'], baseCoin: argv['base-coin'], type: argv['type'], startTime: argv['start-time'], endTime: argv['end-time'], limit: argv['limit'], cursor: argv['cursor'] }),
    
  }),
})

export const handler = async (argv: any) => {
  if (argv['json-schema']) {
    process.stdout.write(JSON.stringify(jsonSchema, null, 2) + '\n')
    return
  }
  return innerHandler(argv)
}
