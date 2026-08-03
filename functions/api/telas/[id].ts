import type { Env } from '../_lib/db'
import { mapTela, serializeUsos } from '../_lib/db'
import { json, errorResponse } from '../_lib/response'
import { requireAdmin } from '../_lib/auth'

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const id = params.id as string
  const existing = await env.DB.prepare('SELECT * FROM telas WHERE id = ?').bind(id).first()
  if (!existing) return errorResponse(404, 'Tela no encontrada')

  const body = await request.json<Record<string, unknown>>()
  const current = mapTela(existing as never)
  const nombre = typeof body.nombre === 'string' ? body.nombre : current.nombre
  const categoria = typeof body.categoria === 'string' ? body.categoria : current.categoria
  const descripcion = typeof body.descripcion === 'string' ? body.descripcion : current.descripcion
  const usos = Array.isArray(body.usos) ? body.usos.map(String) : current.usos
  const swatch = typeof body.swatch === 'string' ? body.swatch : current.swatch

  await env.DB.prepare(
    `UPDATE telas SET nombre=?, categoria=?, descripcion=?, usos=?, swatch=?, updated_at=? WHERE id=?`,
  )
    .bind(nombre, categoria, descripcion, serializeUsos(usos), swatch, new Date().toISOString(), id)
    .run()

  const row = await env.DB.prepare('SELECT * FROM telas WHERE id = ?').bind(id).first()
  return json(mapTela(row as never))
}

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const id = params.id as string
  await env.DB.prepare('DELETE FROM telas WHERE id = ?').bind(id).run()
  return new Response(null, { status: 204 })
}
