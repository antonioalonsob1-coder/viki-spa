import type { Env } from './db'
import { errorResponse } from './response'

const PBKDF2_ITERATIONS = 100_000
const SESSION_COOKIE = 'viki_admin_session'
const SESSION_TTL_SECONDS = 8 * 60 * 60 // 8h

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  return bytes
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function hashPassword(password: string): Promise<{ hashHex: string; saltHex: string }> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hashHex = await derivePbkdf2(password, salt)
  return { hashHex, saltHex: toHex(salt.buffer as ArrayBuffer) }
}

export async function verifyPassword(password: string, hashHex: string, saltHex: string): Promise<boolean> {
  const salt = fromHex(saltHex)
  const computed = await derivePbkdf2(password, salt)
  return constantTimeEqual(computed, hashHex)
}

async function derivePbkdf2(password: string, salt: Uint8Array): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
    'deriveBits',
  ])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as unknown as BufferSource, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    256,
  )
  return toHex(bits)
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ])
}

export async function signSession(secret: string): Promise<string> {
  const payload = JSON.stringify({ admin: true, exp: Date.now() + SESSION_TTL_SECONDS * 1000 })
  const payloadB64 = btoa(payload)
  const key = await hmacKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64))
  return `${payloadB64}.${toHex(signature)}`
}

export function sessionCookieHeader(value: string): string {
  return `${SESSION_COOKIE}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`
}

export function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie')
  if (!header) return null
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return null
}

export async function verifySessionCookie(request: Request, secret: string): Promise<boolean> {
  const cookie = readCookie(request, SESSION_COOKIE)
  if (!cookie) return false
  const [payloadB64, signatureHex] = cookie.split('.')
  if (!payloadB64 || !signatureHex) return false

  const key = await hmacKey(secret)
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    fromHex(signatureHex) as unknown as BufferSource,
    new TextEncoder().encode(payloadB64),
  )
  if (!valid) return false

  try {
    const payload = JSON.parse(atob(payloadB64))
    return payload.admin === true && typeof payload.exp === 'number' && payload.exp > Date.now()
  } catch {
    return false
  }
}

export async function requireAdmin(request: Request, env: Env): Promise<Response | null> {
  const ok = await verifySessionCookie(request, env.SESSION_SECRET)
  return ok ? null : errorResponse(401, 'No autorizado')
}
