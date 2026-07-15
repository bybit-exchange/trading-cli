import { describe, it, expect } from 'vitest'
import { signHmac } from '../../src/runtime/signer'

describe('signHmac', () => {
  it('produces expected HMAC-SHA256 hex signature', () => {
    const sig = signHmac({
      timestamp: 1672211918471,
      apiKey: 'XYZapikey',
      recvWindow: 5000,
      payload: 'category=linear&symbol=BTCUSDT',
      secret: 'test-secret',
    })
    expect(sig).toMatch(/^[a-f0-9]{64}$/)
    const sig2 = signHmac({
      timestamp: 1672211918471,
      apiKey: 'XYZapikey',
      recvWindow: 5000,
      payload: 'category=linear&symbol=BTCUSDT',
      secret: 'test-secret',
    })
    expect(sig).toBe(sig2)
  })

  it('different secret produces different signature', () => {
    const args = { timestamp: 1, apiKey: 'k', recvWindow: 5000, payload: 'x' }
    expect(signHmac({ ...args, secret: 'a' })).not.toBe(signHmac({ ...args, secret: 'b' }))
  })

  it('POST body payload is compact JSON string', () => {
    const sig = signHmac({
      timestamp: 1,
      apiKey: 'k',
      recvWindow: 5000,
      payload: '{"symbol":"BTCUSDT","qty":"1"}',
      secret: 's',
    })
    expect(sig).toMatch(/^[a-f0-9]{64}$/)
  })
})
