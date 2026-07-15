import { createSign, constants } from 'node:crypto'
import { readFileSync, statSync } from 'node:fs'
import type { SignHmacInput } from './signer.js'

/**
 * Sign with RSA-SHA256 using PKCS#1 v1.5 padding (Bybit's expected padding).
 * Output is base64. param_str format identical to HMAC.
 * Requires X-BAPI-SIGN-TYPE: 2 header.
 */
export function signRsa(input: SignHmacInput, privateKeyPath: string): string {
  const paramStr = `${input.timestamp}${input.apiKey}${input.recvWindow}${input.payload}`
  const privateKey = readFileSync(privateKeyPath, 'utf-8')
  const signer = createSign('RSA-SHA256')
  signer.update(paramStr)
  signer.end()
  return signer.sign({
    key: privateKey,
    padding: constants.RSA_PKCS1_PADDING,
  }, 'base64')
}

/**
 * Check RSA private key file permissions.
 * Warns to stderr (does not block) if mode is not 0600 (owner-only rw).
 * Cross-shell / shared filesystem contexts where 0644 is common are still allowed
 * with warning — some CI/container setups can't set 0600.
 */
export function checkKeyFileMode(privateKeyPath: string): void {
  try {
    const stat = statSync(privateKeyPath)
    const mode = stat.mode & 0o777
    if (mode !== 0o600) {
      process.stderr.write(
        `⚠️ ${privateKeyPath} permissions ${mode.toString(8)} — recommended 600 (owner-only rw)\n` +
        `   fix: chmod 600 "${privateKeyPath}"\n`
      )
    }
  } catch {
    // stat failed — credentials.ts will handle the missing-file case
  }
}
