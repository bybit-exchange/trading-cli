import { spawn } from 'node:child_process'

/**
 * Run `npm i -g bybit-official-trading-cli@latest` in a subprocess.
 * Inherits stdio so user sees npm's progress and errors directly.
 * Never falls back to internal state — user retains full control.
 */
export function selfUpdate(dryRun: boolean): void {
  const args = ['i', '-g', 'bybit-official-trading-cli@latest']
  if (dryRun) args.push('--dry-run')

  const child = spawn('npm', args, { stdio: 'inherit' })

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
