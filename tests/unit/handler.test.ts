import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createHandler } from '../../src/runtime/handler'

describe('createHandler', () => {
  const stdoutWrites: string[] = []
  beforeEach(() => {
    stdoutWrites.length = 0
    vi.spyOn(process.stdout, 'write').mockImplementation((c) => {
      stdoutWrites.push(c.toString()); return true
    })
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true)
    vi.spyOn(process, 'exit').mockImplementation((() => {}) as never)
    process.env.BYBIT_API_KEY = 'k'
    process.env.BYBIT_API_SECRET = 's'
    process.env.BYBIT_ENV = 'testnet'
  })
  afterEach(() => { vi.unstubAllGlobals() })

  it('routes retCode=0 to emitSuccess with cli.env', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true, status: 200,
      json: () => Promise.resolve({ retCode: 0, retMsg: 'OK', result: { x: 1 } }),
    } as Response))

    const handler = createHandler({
      method: 'GET',
      path: '/v5/market/kline',
      requiresAuth: false,
      mapArgs: () => ({ method: 'GET', path: '/v5/market/kline' }),
    })
    await handler({})
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.retCode).toBe(0)
    expect(parsed.cli.env).toBe('testnet')
  })

  it('routes non-zero retCode to emitError with hint from ERROR_HINTS', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve({
      ok: true, status: 200,
      json: () => Promise.resolve({ retCode: 10004, retMsg: 'invalid signature' }),
    } as Response))

    const handler = createHandler({
      method: 'GET',
      path: '/v5/x',
      requiresAuth: false,
      mapArgs: () => ({ method: 'GET', path: '/v5/x' }),
    })
    await handler({})
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.retCode).toBe(10004)
    expect(parsed.cli.hint).toMatch(/signature error/)
  })

  it('emits structured error on missing credentials for auth-required handler', async () => {
    delete process.env.BYBIT_API_KEY
    const handler = createHandler({
      method: 'GET',
      path: '/v5/account/wallet-balance',
      requiresAuth: true,
      mapArgs: () => ({ method: 'GET', path: '/v5/account/wallet-balance' }),
    })
    await handler({})
    const output = stdoutWrites.join('')
    expect(output).toContain('"retCode":-1')
    expect(output).toContain('BYBIT_API_KEY')
  })
})
