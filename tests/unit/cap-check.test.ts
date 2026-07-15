import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkCaps } from '../../src/runtime/cap-check'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const LEDGER_FILE = path.join(os.homedir(), '.bybit-cli/spend-ledger.jsonl')

describe('checkCaps', () => {
  const stdoutWrites: string[] = []
  beforeEach(async () => {
    stdoutWrites.length = 0
    try { await fs.rm(LEDGER_FILE) } catch { /* ignore */ }
    vi.spyOn(process.stdout, 'write').mockImplementation((c) => {
      stdoutWrites.push(c.toString()); return true
    })
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true)
    vi.spyOn(process, 'exit').mockImplementation((() => {}) as never)
  })

  const summary = {
    operation: 'order create-order',
    method: 'POST',
    path: '/v5/order/create',
    params: {},
  }

  it('cap-usd blocks a single big order (limit order estimate)', () => {
    checkCaps(
      { 'cap-usd': 100, qty: '2', price: '100' },  // estimate 200 > 100
      summary
    )
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.retMsg).toMatch(/exceeds --cap-usd/)
  })

  it('cap-usd passes when estimate under limit', () => {
    checkCaps(
      { 'cap-usd': 100, qty: '0.5', price: '100' },  // estimate 50 < 100
      summary
    )
    expect(stdoutWrites.join('')).toBe('')  // no error output
  })

  it('cap-usd skipped when qty/price not both available', () => {
    // qty only, no price → can't estimate → pass
    checkCaps({ 'cap-usd': 100, qty: '2' }, summary)
    expect(stdoutWrites.join('')).toBe('')
  })

  it('cap-usd works with marketUnit=quoteCoin', () => {
    checkCaps(
      { 'cap-usd': 100, qty: '150', 'market-unit': 'quoteCoin' },  // 150 USDT > 100
      summary
    )
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.retMsg).toMatch(/exceeds --cap-usd/)
  })

  it('max-orders-per-hour blocks after limit reached', () => {
    // Simulate 3 prior orders in ledger
    checkCaps({ qty: '0.1', price: '100' }, summary)
    checkCaps({ qty: '0.1', price: '100' }, summary)
    checkCaps({ qty: '0.1', price: '100' }, summary)
    // 4th should hit --max-orders-per-hour 3
    stdoutWrites.length = 0
    checkCaps({ 'max-orders-per-hour': 3, qty: '0.1', price: '100' }, summary)
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.retMsg).toMatch(/hourly count/)
  })

  it('cap-usd-total-hour blocks aggregate exceed', () => {
    checkCaps({ qty: '1', price: '100' }, summary)  // records 100 USD
    stdoutWrites.length = 0
    checkCaps({ 'cap-usd-total-hour': 150, qty: '1', price: '100' }, summary)
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.retMsg).toMatch(/hourly total/)
  })
})
