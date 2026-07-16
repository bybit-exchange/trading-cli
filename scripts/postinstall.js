#!/usr/bin/env node
// postinstall — print a hint. Nothing else.
//
// SECURITY (was P0): the previous version silently wrote skill/SKILL.md into
// ~/.claude/skills/ (etc.) at install time. If npm publish tokens were ever
// compromised, an attacker could inject arbitrary AI-agent-executed instructions
// via a tampered SKILL.md — with users seeing nothing at install time.
// AI agents treat SKILL.md as authoritative system prompts; that is a direct
// path to guided fund-transfer / order-manipulation attacks.
//
// Now: registration happens **on first run** of the CLI (interactive, TTY-only),
// see src/runtime/first-run.ts. postinstall does NOT touch the user's filesystem.

console.log('')
console.log('  ✓ bybit-official-trading-cli installed')
console.log('  ℹ AI-agent skill will be configured on first run (or run `bybit-cli install-skill` manually)')
console.log('')
process.exit(0)
