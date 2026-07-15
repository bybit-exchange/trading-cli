import { signHmac } from './signer.js'
import { signRsa } from './rsa-signer.js'
import type { Credentials } from './credentials.js'
import { HOSTS } from './hosts.js'

export type RequestSpec = {
  method: 'GET' | 'POST'
  path: string
  query?: Record<string, string>
  body?: Record<string, unknown>
}

const RECV_WINDOW = 5000

export async function callBybit(spec: RequestSpec, credentials: Credentials): Promise<unknown> {
  const host = HOSTS[credentials.env]
  const timestamp = Date.now()

  let url: URL
  let payload: string
  let bodyToSend: string | undefined

  if (spec.method === 'GET') {
    url = new URL(host + spec.path)
    if (spec.query) {
      for (const [k, v] of Object.entries(spec.query)) url.searchParams.set(k, v)
    }
    payload = url.searchParams.toString()
  } else {
    url = new URL(host + spec.path)
    bodyToSend = JSON.stringify(spec.body ?? {})
    payload = bodyToSend
  }

  const signInput = {
    timestamp,
    apiKey: credentials.key,
    recvWindow: RECV_WINDOW,
    payload,
  }
  const signature = credentials.signType === 'RSA'
    ? signRsa({ ...signInput, secret: '' }, credentials.privateKeyPath)
    : signHmac({ ...signInput, secret: credentials.secret })

  const headers: Record<string, string> = {
    'X-BAPI-API-KEY': credentials.key,
    'X-BAPI-SIGN': signature,
    'X-BAPI-TIMESTAMP': String(timestamp),
    'X-BAPI-RECV-WINDOW': String(RECV_WINDOW),
  }
  if (credentials.signType === 'RSA') headers['X-BAPI-SIGN-TYPE'] = '2'
  if (spec.method === 'POST') headers['Content-Type'] = 'application/json'

  const response = await fetch(url, {
    method: spec.method,
    headers,
    body: bodyToSend,
  })

  return response.json()
}
