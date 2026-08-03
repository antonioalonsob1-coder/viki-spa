import type { Env } from './_lib/db'
import { mapTela, serializeUsos } from './_lib/db'
import { json, errorResponse } from './_lib/response'
import { requireAdmin } from './_lib/auth'

const CATEGORIAS = ['Hogar', 'Institucional']

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT * FROM telas ORDER BY created_at DESC').all()
  return json((results ?? []).map((r) => mapTela(r as never)))
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const body = await request.json<Record<string, unknown>>()
  if (typeof body.nombre !== 'string' || !body.nombre) return errorResponse(400, 'Falta el nombre')
  if (!CATEGORIAS.includes(body.categoria as string)) return errorResponse(400, 'Categoría inválida')
  const usos = Array.isArray(body.usos) ? body.usos.map(String) : []

  const id = `tela-${crypto.randomUUID()}`
  const now = new Date().toISOString()
  await env.DB.prepare(
    `INSERT INTO telas (id, nombre, categoria, descripcion, usos, swatch, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, body.nombre, body.categoria, body.descripcion ?? '', serializeUsos(usos), body.swatch ?? '', now, now)
    .run()

  const row = await env.DB.prepare('SELECT * FROM telas WHERE id = ?').bind(id).first()
  return json(mapTela(row as never), { status: 201 })
}
