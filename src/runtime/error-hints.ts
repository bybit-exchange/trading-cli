export type ErrorHint = {
  hint: string
  nextSteps?: string[]
  retry?: boolean
}

// retCode → hint mapping. Non-exhaustive; add as needed.
export const ERROR_HINTS: Record<number, ErrorHint> = {
  10001: { hint: 'invalid parameter — check required fields and formats' },
  10002: {
    hint: 'timestamp expired (recvWindow) — likely clock skew',
    nextSteps: [
      'sudo sntp -sS time.apple.com',
      'or enable automatic date/time in system settings',
    ],
  },
  10003: {
    hint: 'API key invalid — check BYBIT_API_KEY value and env (testnet vs mainnet)',
  },
  10004: {
    hint: 'signature error — usually clock skew, wrong secret, or wrong signature type (HMAC vs RSA)',
  },
  10005: {
    hint: 'permission denied — API key lacks required permission',
    nextSteps: ['https://www.bybit.com/app/user/api-management'],
  },
  10006: {
    hint: 'rate limited — CLI auto-backoff engaged; retry after 1s',
    retry: true,
  },
  10010: { hint: 'IP not whitelisted — add current IP in API key settings' },
  10014: { hint: 'duplicate request — CLI orderLinkId dedup may be working' },
  10016: { hint: 'server error', retry: true },
  10017: { hint: 'path not found — check request path and HTTP method' },
  110001: { hint: 'order does not exist — check orderId/orderLinkId' },
  110003: { hint: 'price out of range — check instruments-info priceFilter' },
  110004: { hint: 'insufficient wallet balance' },
  110007: { hint: 'insufficient available balance — balance may be locked by open orders' },
  110009: { hint: 'too many stop orders — reduce conditional order count' },
  110020: { hint: 'active order limit exceeded — cancel some first' },
  110040: { hint: 'would trigger liquidation — reduce qty or add margin' },
  110072: { hint: 'duplicate orderLinkId — reuse a fresh one' },
  110094: { hint: 'order notional below minimum — increase order size' },
  170005: { hint: 'spot rate limit exceeded — slow down' },
  170121: { hint: 'invalid symbol — check spelling (uppercase, e.g. BTCUSDT)' },
  170131: { hint: 'spot balance insufficient' },
  170136: { hint: 'qty below minimum — check instruments-info lotSizeFilter' },
  170140: { hint: 'order value below minimum — check minOrderAmt' },
}

export function lookupHint(retCode: number): ErrorHint | undefined {
  return ERROR_HINTS[retCode]
}
