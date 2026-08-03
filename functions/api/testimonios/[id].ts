import type { Env } from '../_lib/db'
import { mapTestimonio } from '../_lib/db'
import { json, errorResponse } from '../_lib/response'
import { requireAdmin } from '../_lib/auth'

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const id = params.id as string
  const existing = await env.DB.prepare('SELECT * FROM testimonios WHERE id = ?').bind(id).first()
  if (!existing) return errorResponse(404, 'Testimonio no encontrado')

  const body = await request.json<Record<string, unknown>>()
  const current = mapTestimonio(existing as never)
  const nombre = typeof body.nombre === 'string' ? body.nombre : current.nombre
  const rol = typeof body.rol === 'string' ? body.rol : current.rol
  const texto = typeof body.texto === 'string' ? body.texto : current.texto
  const estrellas = body.estrellas !== undefined ? Number(body.estrellas) : current.estrellas

  await env.DB.prepare(`UPDATE testimonios SET nombre=?, rol=?, texto=?, estrellas=?, updated_at=? WHERE id=?`)
    .bind(nombre, rol, texto, estrellas, new Date().toISOString(), id)
    .run()

  const row = await env.DB.prepare('SELECT * FROM testimonios WHERE id = ?').bind(id).first()
  return json(mapTestimonio(row as never))
}

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const id = params.id as string
  await env.DB.prepare('DELETE FROM testimonios WHERE id = ?').bind(id).run()
  return new Response(null, { status: 204 })
}
