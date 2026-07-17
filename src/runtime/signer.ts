import { createHmac } from 'node:crypto'

export type SignHmacInput = {
  timestamp: number
  apiKey: string
  recvWindow: number
  payload: string
  secret: string
}

export function signHmac(input: SignHmacInput): string {
  const paramStr = `${input.timestamp}${input.apiKey}${input.recvWindow}${input.payload}`
  return createHmac('sha256', input.secret).update(paramStr).digest('hex')
}
