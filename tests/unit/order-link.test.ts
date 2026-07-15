import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { makeOrderLinkId } from '../../src/runtime/order-link'

describe('makeOrderLinkId', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('produces "cli-<16 hex>" format', () => {
    const id = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1' })
    expect(id).toMatch(/^cli-[a-f0-9]{16}$/)
  })

  it('same argv in same second → same id (idempotent)', () => {
    vi.setSystemTime(new Date('2026-07-14T12:00:00Z'))
    const a = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1' })
    const b = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1' })
    expect(a).toBe(b)
  })

  it('different argv → different id', () => {
    const a = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1' })
    const b = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '2' })
    expect(a).not.toBe(b)
  })

  it('different second → different id', () => {
    vi.setSystemTime(new Date('2026-07-14T12:00:00Z'))
    const a = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1' })
    vi.setSystemTime(new Date('2026-07-14T12:00:05Z'))
    const b = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1' })
    expect(a).not.toBe(b)
  })

  it('key order in argv does not affect id', () => {
    const a = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1' })
    const b = makeOrderLinkId({ qty: '1', symbol: 'BTCUSDT' })
    expect(a).toBe(b)
  })

  it('ignores yargs-internal keys ($0, _, json-schema, yes)', () => {
    const a = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1' })
    const b = makeOrderLinkId({ symbol: 'BTCUSDT', qty: '1', '$0': 'bybit-cli', _: ['order', 'create-order'], yes: true, 'json-schema': undefined })
    expect(a).toBe(b)
  })
})
