import type { Env } from '../_lib/db'
import { json, errorResponse } from '../_lib/response'
import { verifyPassword, signSession, sessionCookieHeader } from '../_lib/auth'

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json<Record<string, unknown>>()
  const password = typeof body.password === 'string' ? body.password : ''
  if (!password) return errorResponse(400, 'Falta la contraseña')

  const row = await env.DB.prepare('SELECT password_hash, password_salt FROM admin_settings WHERE id = 1').first<{
    password_hash: string
    password_salt: string
  }>()
  if (!row) return errorResponse(500, 'Panel admin no configurado')

  const ok = await verifyPassword(password, row.password_hash, row.password_salt)
  if (!ok) return errorResponse(401, 'Contraseña incorrecta')

  const cookieValue = await signSession(env.SESSION_SECRET)
  return json({ ok: true }, { headers: { 'Set-Cookie': sessionCookieHeader(cookieValue) } })
}
