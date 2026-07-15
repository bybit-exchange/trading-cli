import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { checkConfirm } from '../../src/runtime/confirm'
import { activateKillSwitch, deactivateKillSwitch } from '../../src/runtime/kill-switch'

describe('checkConfirm', () => {
  const stdoutWrites: string[] = []
  beforeEach(() => {
    stdoutWrites.length = 0
    vi.spyOn(process.stdout, 'write').mockImplementation((c) => {
      stdoutWrites.push(c.toString()); return true
    })
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true)
    vi.spyOn(process, 'exit').mockImplementation((() => {}) as never)
    deactivateKillSwitch()
  })
  afterEach(() => {
    deactivateKillSwitch()
  })

  const summary = {
    operation: 'trade create-order',
    method: 'POST',
    path: '/v5/order/create',
    params: { symbol: 'BTCUSDT', qty: '0.001' },
  }

  it('testnet: pass through', () => {
    process.env.BYBIT_ENV = 'testnet'
    checkConfirm({}, summary)
    expect(stdoutWrites.join('')).toBe('')
  })

  it('mainnet without --yes: reject with hint', () => {
    process.env.BYBIT_ENV = 'mainnet'
    checkConfirm({}, summary)
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.retCode).toBe(-1)
    expect(parsed.retMsg).toMatch(/requires --yes/)
    expect(parsed.cli.hint).toMatch(/append --yes/)
  })

  it('mainnet with --yes: pass through', () => {
    process.env.BYBIT_ENV = 'mainnet'
    checkConfirm({ yes: true }, summary)
    expect(stdoutWrites.join('')).toBe('')
  })

  it('mainnet with kill-switch active + --yes: still rejects', () => {
    process.env.BYBIT_ENV = 'mainnet'
    activateKillSwitch()
    checkConfirm({ yes: true }, summary)
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.retMsg).toMatch(/kill-switch/)
  })
})
