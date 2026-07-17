import updateNotifier from 'update-notifier'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Non-blocking check for new npm version. Prints to stderr; never blocks. */
export function checkForUpdate(): void {
  if (process.env.BYBIT_CLI_NO_UPDATE_CHECK === '1') return

  try {
    // Locate package.json — works both from src/ (tsx) and dist/ (bundled)
    let pkgPath = path.join(__dirname, '..', '..', 'package.json')
    let pkg: { name: string; version: string }
    try {
      pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    } catch {
      pkgPath = path.join(__dirname, '..', 'package.json')
      pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    }

    const notifier = updateNotifier({
      pkg,
      updateCheckInterval: 24 * 60 * 60 * 1000,
    })
    if (notifier.update && notifier.update.latest !== notifier.update.current) {
      process.stderr.write(
        `⚠️  bybit-cli ${notifier.update.latest} available (current: ${notifier.update.current})\n` +
        `    Run: bybit-cli self-update\n` +
        `    Silence: BYBIT_CLI_NO_UPDATE_CHECK=1\n`
      )
    }
  } catch {
    // Never fail on update check — network issues, package.json missing, etc.
  }
}
