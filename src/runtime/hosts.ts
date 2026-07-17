export const HOSTS = {
  mainnet: 'https://api.bybit.com',
  testnet: 'https://api-testnet.bybit.com',
} as const

export type BybitEnv = keyof typeof HOSTS
