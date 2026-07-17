import { existsSync } from 'node:fs'
import { checkKeyFileMode } from './rsa-signer.js'

export type Credentials =
  | { key: string; secret: string; env: 'mainnet' | 'testnet'; signType: 'HMAC' }
  | { key: string; privateKeyPath: string; env: 'mainnet' | 'testnet'; signType: 'RSA' }

export class CredentialError extends Error {
  constructor(message: string, public hint: string) {
    super(message)
    this.name = 'CredentialError'
  }
}

export function loadCredentials(): Credentials {
  const key = process.env.BYBIT_API_KEY
  if (!key) {
    throw new CredentialError(
      'BYBIT_API_KEY not set',
      'set BYBIT_API_KEY and BYBIT_API_SECRET; see: bybit-cli agent-briefing'
    )
  }
  const env = (process.env.BYBIT_ENV ?? 'mainnet') as 'mainnet' | 'testnet'

  // RSA takes precedence when path is set + readable
  const rsaPath = process.env.BYBIT_API_PRIVATE_KEY_PATH
  if (rsaPath) {
    if (!existsSync(rsaPath)) {
      throw new CredentialError(
        `BYBIT_API_PRIVATE_KEY_PATH file not found: ${rsaPath}`,
        'check the path or unset BYBIT_API_PRIVATE_KEY_PATH to use HMAC instead'
      )
    }
    checkKeyFileMode(rsaPath)
    return { key, privateKeyPath: rsaPath, env, signType: 'RSA' }
  }

  const secret = process.env.BYBIT_API_SECRET
  if (!secret) {
    throw new CredentialError(
      'BYBIT_API_SECRET not set',
      'set BYBIT_API_SECRET for HMAC signing, or BYBIT_API_PRIVATE_KEY_PATH for RSA'
    )
  }
  return { key, secret, env, signType: 'HMAC' }
}
