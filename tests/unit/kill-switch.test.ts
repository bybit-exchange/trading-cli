import { describe, it, expect, beforeEach } from 'vitest'
import {
  activateKillSwitch,
  deactivateKillSwitch,
  isKillSwitchActive,
} from '../../src/runtime/kill-switch'

describe('kill-switch', () => {
  beforeEach(() => deactivateKillSwitch())

  it('starts inactive', () => {
    expect(isKillSwitchActive()).toBe(false)
  })

  it('activate + isActive → true', () => {
    activateKillSwitch()
    expect(isKillSwitchActive()).toBe(true)
  })

  it('deactivate → inactive', () => {
    activateKillSwitch()
    deactivateKillSwitch()
    expect(isKillSwitchActive()).toBe(false)
  })

  it('deactivate when inactive is a no-op', () => {
    expect(() => deactivateKillSwitch()).not.toThrow()
  })
})
