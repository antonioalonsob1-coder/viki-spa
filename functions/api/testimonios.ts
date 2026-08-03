import type { Env } from './_lib/db'
import { mapTestimonio } from './_lib/db'
import { json, errorResponse } from './_lib/response'
import { requireAdmin } from './_lib/auth'

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT * FROM testimonios ORDER BY created_at DESC').all()
  return json((results ?? []).map((r) => mapTestimonio(r as never)))
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const body = await request.json<Record<string, unknown>>()
  if (typeof body.nombre !== 'string' || !body.nombre) return errorResponse(400, 'Falta el nombre')
  const estrellas = Number(body.estrellas)
  if (!Number.isInteger(estrellas) || estrellas < 1 || estrellas > 5) return errorResponse(400, 'Estrellas inválidas')

  const id = `testimonio-${crypto.randomUUID()}`
  const now = new Date().toISOString()
  await env.DB.prepare(
    `INSERT INTO testimonios (id, nombre, rol, texto, estrellas, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, body.nombre, body.rol ?? '', body.texto ?? '', estrellas, now, now)
    .run()

  const row = await env.DB.prepare('SELECT * FROM testimonios WHERE id = ?').bind(id).first()
  return json(mapTestimonio(row as never), { status: 201 })
}
