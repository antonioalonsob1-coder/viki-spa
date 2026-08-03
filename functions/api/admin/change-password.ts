import type { Env } from '../_lib/db'
import { json, errorResponse } from '../_lib/response'
import { requireAdmin, verifyPassword, hashPassword } from '../_lib/auth'

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const body = await request.json<Record<string, unknown>>()
  const actual = typeof body.actual === 'string' ? body.actual : ''
  const nueva = typeof body.nueva === 'string' ? body.nueva : ''
  if (nueva.length < 4) return errorResponse(400, 'La nueva contraseña debe tener al menos 4 caracteres.')

  const row = await env.DB.prepare('SELECT password_hash, password_salt FROM admin_settings WHERE id = 1').first<{
    password_hash: string
    password_salt: string
  }>()
  if (!row) return errorResponse(500, 'Panel admin no configurado')

  const ok = await verifyPassword(actual, row.password_hash, row.password_salt)
  if (!ok) return errorResponse(401, 'La contraseña actual no es correcta.')

  const { hashHex, saltHex } = await hashPassword(nueva)
  await env.DB.prepare('UPDATE admin_settings SET password_hash=?, password_salt=?, updated_at=? WHERE id = 1')
    .bind(hashHex, saltHex, new Date().toISOString())
    .run()

  return json({ ok: true })
}
