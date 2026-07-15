import { describe, it, expect, beforeAll } from 'vitest'
import { generateKeyPairSync } from 'node:crypto'
import { writeFileSync, mkdirSync, chmodSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { signRsa } from '../../src/runtime/rsa-signer'

let tempKeyPath: string

describe('signRsa', () => {
  beforeAll(() => {
    const { privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      publicKeyEncoding: { type: 'spki', format: 'pem' },
    })
    const dir = path.join(tmpdir(), 'bybit-cli-test-' + Date.now())
    mkdirSync(dir, { recursive: true })
    tempKeyPath = path.join(dir, 'test.pem')
    writeFileSync(tempKeyPath, privateKey)
    chmodSync(tempKeyPath, 0o600)
  })

  it('produces base64 signature', () => {
    const sig = signRsa({
      timestamp: 1672211918471,
      apiKey: 'k',
      recvWindow: 5000,
      payload: 'category=linear',
      secret: '',
    }, tempKeyPath)
    expect(sig).toMatch(/^[A-Za-z0-9+/=]+$/)
    expect(sig.length).toBeGreaterThan(100)
  })

  it('deterministic for same input', () => {
    const args = { timestamp: 1, apiKey: 'k', recvWindow: 5000, payload: 'x', secret: '' }
    expect(signRsa(args, tempKeyPath)).toBe(signRsa(args, tempKeyPath))
  })
})
