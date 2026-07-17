// shebang added by tsup banner.js at bundle time — do not add here (would duplicate)
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { commands } from './generated/index.js'
import { catalog } from './generated/catalog.js'
import { generateBriefing } from './runtime/agent-briefing.js'
import { activateKillSwitch, deactivateKillSwitch } from './runtime/kill-switch.js'
import { checkForUpdate } from './runtime/update-check.js'
import { selfUpdate } from './runtime/self-update.js'
import { installSkill, uninstallSkill, listPlatforms, type Platform } from './runtime/install-skill.js'
import { verifyIntegrity } from './runtime/manifest-verify.js'
import { maybeOfferSkillRegistration } from './runtime/first-run.js'

// Non-blocking update check; prints to stderr, never blocks main flow.
checkForUpdate()

// First-run: offer to register agent skill (interactive TTY only, silent otherwise).
// Fire-and-forget; if user takes too long we just don't await.
maybeOfferSkillRegistration().catch(() => { /* never block CLI on first-run prompt */ })

// Pre-yargs intercept: --json-schema bypasses arg validation.
// Match by scanning argv for the domain + command tokens, then look up the module.
const args = hideBin(process.argv)
if (args.includes('--json-schema') && args.length >= 2) {
  const [maybeDomain, maybeCommand] = args
  const found = commands.find(
    (c) => c.domain === maybeDomain && (c.module as any).command === maybeCommand
  )
  if (found) {
    const schema = (found.module as any).jsonSchema
    if (schema) {
      process.stdout.write(JSON.stringify(schema, null, 2) + '\n')
      process.exit(0)
    }
  }
}

const cli = yargs(hideBin(process.argv))
  .scriptName('bybit-cli')
  .usage('$0 <domain> <command> [args]')

// Group commands by domain
const byDomain: Record<string, typeof commands> = {}
for (const c of commands) {
  byDomain[c.domain] ??= []
  byDomain[c.domain].push(c)
}

for (const [domain, domainCommands] of Object.entries(byDomain)) {
  cli.command(
    domain,
    `${domain} operations`,
    (y) => {
      for (const { module } of domainCommands) {
        y.command(module.command, module.describe, module.builder, module.handler)
      }
      return y.demandCommand(1)
    }
  )
}

// catalog subcommand
cli.command(
  'catalog',
  'List all available commands as JSON',
  {},
  () => {
    process.stdout.write(JSON.stringify(catalog, null, 2) + '\n')
  }
)

// agent-briefing subcommand (~300 words for AI agents to bootstrap)
cli.command(
  'agent-briefing',
  'Print ~300-word markdown briefing for AI agents',
  {},
  () => {
    process.stdout.write(generateBriefing())
  }
)

// kill-switch / enable-switch — halt all mainnet writes from any shell
cli.command('kill-switch', 'Block all mainnet writes until enable-switch', {}, () => {
  activateKillSwitch()
  process.stdout.write(JSON.stringify({
    retCode: 0,
    retMsg: 'OK',
    cli: { message: '🛑 kill-switch activated — mainnet writes will be blocked' },
  }) + '\n')
})

cli.command('enable-switch', 'Clear kill-switch', {}, () => {
  deactivateKillSwitch()
  process.stdout.write(JSON.stringify({
    retCode: 0,
    retMsg: 'OK',
    cli: { message: '✓ kill-switch cleared — mainnet writes re-enabled' },
  }) + '\n')
})

// install-skill / uninstall-skill / list-platforms
cli.command(
  'install-skill',
  'Install bootstrap skill to agent platform(s)',
  (y) => y
    .option('platform', { type: 'string', choices: ['claude-code', 'openclaw', 'cursor', 'windsurf', 'codex'], describe: 'Force a specific platform (default: auto-detect all)' })
    .option('dry-run', { type: 'boolean', describe: 'Show what would be installed, do not write files' })
    .option('list', { type: 'boolean', describe: 'List supported platforms and their install status' }),
  (argv) => {
    if (argv.list) { listPlatforms(); return }
    const results = installSkill({
      platform: argv.platform as Platform | undefined,
      dryRun: !!argv['dry-run'],
    })
    process.stdout.write(JSON.stringify({
      retCode: 0,
      retMsg: 'OK',
      result: { installed: results, dryRun: !!argv['dry-run'] },
    }) + '\n')
    for (const r of results) {
      if (r.ok) process.stderr.write(`  ✓ ${r.platform}: ${r.dst}\n`)
      else process.stderr.write(`  ⚠ ${r.platform}: ${r.err}\n`)
    }
  }
)

cli.command('uninstall-skill', 'Remove bootstrap skill from all agent platforms', {}, () => {
  uninstallSkill()
  process.stdout.write(JSON.stringify({ retCode: 0, retMsg: 'OK' }) + '\n')
})

// verify: fetch Bybit-hosted manifest, check SHA256 of local install
cli.command('verify', 'Verify local install against Bybit-hosted manifest (supply-chain check)', {}, async () => {
  const result = await verifyIntegrity()
  process.stdout.write(JSON.stringify({
    retCode: result.status === 'ok' ? 0 : -1,
    retMsg: result.status,
    result,
  }) + '\n')
  if (result.status === 'skew') {
    process.stderr.write(
      `\n🔴 SECURITY: install does not match Bybit's official manifest.\n` +
      `   file: ${result.file}\n` +
      `   expected sha256: ${result.expected}\n` +
      `   local sha256:    ${result.actual}\n` +
      `   Reinstall: npm uninstall -g bybit-official-trading-cli && npm i -g bybit-official-trading-cli@latest --registry https://registry.npmjs.org\n` +
      `   Report: security@bybit.com\n`
    )
    process.exit(1)
  }
})

// self-update: spawn `npm i -g @latest`
cli.command(
  'self-update',
  'Install latest bybit-official-trading-cli from npm',
  (y) => y.option('dry-run', { type: 'boolean', describe: 'Test network + permissions without installing' }),
  (argv) => selfUpdate(!!argv['dry-run'])
)

cli
  .option('pretty', { type: 'boolean', describe: 'Pretty-print JSON output (indented)', global: true })
  .demandCommand(1).strict().help().parse()
