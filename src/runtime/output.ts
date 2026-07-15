export type CliMeta = {
  env?: string
  hint?: string
  retry?: boolean
  nextSteps?: string[]
}

function isPretty(): boolean {
  return process.argv.includes('--pretty')
}

export function emitSuccess(data: unknown, meta?: CliMeta): void {
  const payload = meta
    ? { ...(data as object), cli: meta }
    : data
  const serialized = isPretty()
    ? JSON.stringify(payload, null, 2)
    : JSON.stringify(payload)
  process.stdout.write(serialized + '\n')
}

export type CliError = {
  retCode: number
  retMsg: string
  hint?: string
  retry?: boolean
  nextSteps?: string[]
}

export function emitError(err: CliError): void {
  const cli: Record<string, unknown> = {}
  if (err.hint) cli.hint = err.hint
  if (err.retry !== undefined) cli.retry = err.retry
  if (err.nextSteps) cli.nextSteps = err.nextSteps

  const payload: Record<string, unknown> = {
    retCode: err.retCode,
    retMsg: err.retMsg,
  }
  if (Object.keys(cli).length > 0) payload.cli = cli
  const serialized = isPretty()
    ? JSON.stringify(payload, null, 2)
    : JSON.stringify(payload)
  process.stdout.write(serialized + '\n')
  process.stderr.write(`[bybit-cli] ${err.retMsg}\n`)
}
