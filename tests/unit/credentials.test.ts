import { describe, it, expect, afterEach } from 'vitest'
import { loadCredentials } from '../../src/runtime/credentials'

describe('loadCredentials', () => {
  const originalEnv = { ...process.env }
  afterEach(() => { process.env = { ...originalEnv } })

  it('loads HMAC credentials from env', () => {
    process.env.BYBIT_API_KEY = 'test-key'
    process.env.BYBIT_API_SECRET = 'test-secret'
    process.env.BYBIT_ENV = 'testnet'
    delete process.env.BYBIT_API_PRIVATE_KEY_PATH
    const c = loadCredentials()
    expect(c).toEqual({ key: 'test-key', secret: 'test-secret', env: 'testnet', signType: 'HMAC' })
  })

  it('defaults env to mainnet', () => {
    process.env.BYBIT_API_KEY = 'k'
    process.env.BYBIT_API_SECRET = 's'
    delete process.env.BYBIT_ENV
    expect(loadCredentials().env).toBe('mainnet')
  })

  it('throws with helpful hint when BYBIT_API_KEY missing', () => {
    delete process.env.BYBIT_API_KEY
    expect(() => loadCredentials()).toThrow(/BYBIT_API_KEY.*not set/)
  })

  it('throws when BYBIT_API_SECRET missing', () => {
    process.env.BYBIT_API_KEY = 'k'
    delete process.env.BYBIT_API_SECRET
    expect(() => loadCredentials()).toThrow(/BYBIT_API_SECRET.*not set/)
  })
})
