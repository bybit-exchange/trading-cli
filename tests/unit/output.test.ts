import { describe, it, expect, vi, beforeEach } from 'vitest'
import { emitSuccess, emitError } from '../../src/runtime/output'

describe('output', () => {
  let stdoutWrites: string[] = []
  let stderrWrites: string[] = []

  beforeEach(() => {
    stdoutWrites = []
    stderrWrites = []
    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      stdoutWrites.push(chunk.toString()); return true
    })
    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      stderrWrites.push(chunk.toString()); return true
    })
  })

  it('emitSuccess writes JSON with trailing newline', () => {
    emitSuccess({ retCode: 0, retMsg: 'OK', result: { orderId: 'abc' } })
    expect(stdoutWrites.join('')).toBe('{"retCode":0,"retMsg":"OK","result":{"orderId":"abc"}}\n')
  })

  it('emitSuccess attaches cli.env when meta provided', () => {
    emitSuccess({ retCode: 0, retMsg: 'OK' }, { env: 'testnet' })
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.cli.env).toBe('testnet')
  })

  it('emitError writes structured JSON with cli.hint', () => {
    emitError({ retCode: -1, retMsg: 'missing key', hint: 'set BYBIT_API_KEY' })
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed).toEqual({ retCode: -1, retMsg: 'missing key', cli: { hint: 'set BYBIT_API_KEY' } })
  })

  it('emitError includes nextSteps if provided', () => {
    emitError({ retCode: 10002, retMsg: 'expired', nextSteps: ['sync clock'] })
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.cli.nextSteps).toEqual(['sync clock'])
  })

  it('emitError includes retry flag if provided', () => {
    emitError({ retCode: 10006, retMsg: 'rate limited', retry: true })
    const parsed = JSON.parse(stdoutWrites.join('').trim())
    expect(parsed.cli.retry).toBe(true)
  })

  it('emitError also writes diagnostic to stderr', () => {
    emitError({ retCode: -1, retMsg: 'boom' })
    expect(stderrWrites.join('')).toContain('boom')
  })
})
