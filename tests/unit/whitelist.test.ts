import { describe, it, expect, vi, beforeEach } from 'vitest'
import { isRestrictedEndpoint, checkWhitelist } from '../../src/runtime/whitelist'

describe('whitelist', () => {
  it('withdraw is restricted', () => {
    expect(isRestrictedEndpoint('/v5/asset/withdraw/create')).toBe(true)
  })
  it('inter-transfer is restricted', () => {
    expect(isRestrictedEndpoint('/v5/asset/transfer/inter-transfer')).toBe(true)
  })
  it('universal-transfer is restricted', () => {
    expect(isRestrictedEndpoint('/v5/asset/universal-transfer')).toBe(true)
  })
  it('fiat routes are restricted', () => {
    expect(isRestrictedEndpoint('/v5/fiat/convert')).toBe(true)
  })
  it('p2p routes are restricted', () => {
    expect(isRestrictedEndpoint('/v5/p2p/ad/list')).toBe(true)
  })
  it('trade create-order is NOT restricted', () => {
    expect(isRestrictedEndpoint('/v5/order/create')).toBe(false)
  })
  it('market kline is NOT restricted', () => {
    expect(isRestrictedEndpoint('/v5/market/kline')).toBe(false)
  })

  describe('checkWhitelist', () => {
    const stdoutWrites: string[] = []
    beforeEach(() => {
      stdoutWrites.length = 0
      vi.spyOn(process.stdout, 'write').mockImplementation((c) => {
        stdoutWrites.push(c.toString()); return true
      })
      vi.spyOn(process.stderr, 'write').mockImplementation(() => true)
      vi.spyOn(process, 'exit').mockImplementation((() => {}) as never)
    })

    it('non-restricted endpoint: pass through', () => {
      checkWhitelist('/v5/order/create', {})
      expect(stdoutWrites.join('')).toBe('')
    })

    it('restricted endpoint without flag: reject', () => {
      checkWhitelist('/v5/asset/withdraw/create', {})
      const parsed = JSON.parse(stdoutWrites.join('').trim())
      expect(parsed.retMsg).toMatch(/restricted/)
    })

    it('restricted endpoint with --enable-advanced-money-ops: pass', () => {
      checkWhitelist('/v5/asset/withdraw/create', { 'enable-advanced-money-ops': true })
      expect(stdoutWrites.join('')).toBe('')
    })
  })
})
