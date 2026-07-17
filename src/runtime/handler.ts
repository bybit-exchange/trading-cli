import { loadCredentials, CredentialError } from './credentials.js'
import { callBybit, type RequestSpec } from './client.js'
import { emitSuccess, emitError } from './output.js'
import { lookupHint } from './error-hints.js'
import { ensureClockSynced, ClockSkewError } from './time-sync.js'
import { armSigintHandler, disarmSigintHandler } from './sigint-handler.js'
import { checkKeyFingerprint } from './fingerprint.js'
import { checkVersionForWrite } from './manifest-verify.js'

export type HandlerConfig = {
  method: 'GET' | 'POST'
  path: string
  requiresAuth: boolean
  mapArgs: (argv: any) => RequestSpec
}

type BybitResponse = {
  retCode?: number
  retMsg?: string
  [k: string]: unknown
}

export function createHandler(config: HandlerConfig) {
  return async function handler(argv: any): Promise<void> {
    const env = (process.env.BYBIT_ENV ?? 'mainnet') as 'mainnet' | 'testnet'
    try {
      let credentials: import('./credentials.js').Credentials
      if (config.requiresAuth) {
        credentials = loadCredentials()
        checkKeyFingerprint(credentials.env, credentials.key)
        await ensureClockSynced(credentials.env)
      } else {
        // Public endpoints don't sign but callBybit still requires the union type.
        credentials = {
          key: process.env.BYBIT_API_KEY ?? '',
          secret: process.env.BYBIT_API_SECRET ?? '',
          env,
          signType: 'HMAC',
        }
      }
      const spec = config.mapArgs(argv)
      const linkId = argv['order-link-id'] ?? argv.orderLinkId
      // Layer-2 integrity gate: for every write op, verify local install matches
      // Bybit's published manifest before we hit the wire. Runs AFTER checkConfirm
      // (in generated wrapper) and AFTER credential/clock checks (fail-fast on
      // local misconfig), but is the LAST thing before I/O — a tampered binary
      // must not be able to send a signed POST. Exits process on skew.
      if (spec.method === 'POST') await checkVersionForWrite()
      if (spec.method === 'POST' && linkId) armSigintHandler(String(linkId))
      const result = await callBybit(spec, credentials) as BybitResponse
      disarmSigintHandler()

      // Route non-zero retCode to emitError with looked-up hint
      if (result.retCode !== undefined && result.retCode !== 0) {
        const hint = lookupHint(result.retCode)
        emitError({
          retCode: result.retCode,
          retMsg: result.retMsg ?? 'unknown error',
          ...(hint ?? {}),
        })
        return process.exit(1) as never
      }

      emitSuccess(result, { env })
    } catch (e) {
      if (e instanceof ClockSkewError) {
        emitError({
          retCode: -1,
          retMsg: e.message,
          hint: 'your system clock is off — sync it',
          nextSteps: ['sudo sntp -sS time.apple.com', 'or enable automatic date/time in system settings'],
        })
      } else if (e instanceof CredentialError) {
        emitError({ retCode: -1, retMsg: e.message, hint: e.hint })
      } else {
        emitError({
          retCode: -1,
          retMsg: e instanceof Error ? e.message : String(e),
        })
      }
      process.exit(1)
    }
  }
}
