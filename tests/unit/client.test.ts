import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { callBybit } from '../../src/runtime/client'

describe('callBybit', () => {
  const credentials = { key: 'k', secret: 's', env: 'testnet' as const, signType: 'HMAC' as const }
  const mockResponse = (body: unknown) => Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(body),
  } as Response)

  afterEach(() => { vi.unstubAllGlobals() })

  it('GET builds URL with query and signs headers', async () => {
    const fetchSpy = vi.fn(() => mockResponse({ retCode: 0 }))
    vi.stubGlobal('fetch', fetchSpy)

    await callBybit(
      { method: 'GET', path: '/v5/market/kline', query: { category: 'linear', symbol: 'BTCUSDT' } },
      credentials
    )

    expect(fetchSpy).toHaveBeenCalledOnce()
    const [url, init] = fetchSpy.mock.calls[0] as unknown as [URL, RequestInit]
    expect(url.toString()).toContain('api-testnet.bybit.com/v5/market/kline')
    expect(url.toString()).toContain('category=linear')
    expect(init.headers).toMatchObject({
      'X-BAPI-API-KEY': 'k',
      'X-BAPI-SIGN': expect.any(String),
      'X-BAPI-TIMESTAMP': expect.any(String),
      'X-BAPI-RECV-WINDOW': '5000',
    })
  })

  it('POST sends compact JSON body', async () => {
    const fetchSpy = vi.fn(() => mockResponse({ retCode: 0 }))
    vi.stubGlobal('fetch', fetchSpy)

    await callBybit(
      { method: 'POST', path: '/v5/order/create', body: { symbol: 'BTCUSDT', qty: '1' } },
      credentials
    )

    const [, init] = fetchSpy.mock.calls[0] as unknown as [URL, RequestInit]
    expect(init.method).toBe('POST')
    expect(init.body).toBe('{"symbol":"BTCUSDT","qty":"1"}')
    expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json')
  })

  it('mainnet env uses api.bybit.com', async () => {
    const fetchSpy = vi.fn(() => mockResponse({ retCode: 0 }))
    vi.stubGlobal('fetch', fetchSpy)

    await callBybit({ method: 'GET', path: '/v5/x' }, { key: 'k', secret: 's', env: 'mainnet', signType: 'HMAC' })
    const [url] = fetchSpy.mock.calls[0] as unknown as [URL]
    expect(url.toString()).toContain('api.bybit.com')
    expect(url.toString()).not.toContain('testnet')
  })

  it('returns parsed JSON body', async () => {
    vi.stubGlobal('fetch', () => mockResponse({ retCode: 0, retMsg: 'OK', result: { x: 1 } }))
    const result = await callBybit({ method: 'GET', path: '/v5/x' }, credentials)
    expect(result).toEqual({ retCode: 0, retMsg: 'OK', result: { x: 1 } })
  })
})
