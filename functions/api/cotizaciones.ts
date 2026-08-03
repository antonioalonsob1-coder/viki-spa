import type { Env } from './_lib/db'
import { mapCotizacion } from './_lib/db'
import { json, errorResponse } from './_lib/response'
import { requireAdmin } from './_lib/auth'

const TIPO_MAP: Record<string, string> = {
  Hogar: 'HOGAR',
  'Colegio / Licenciatura': 'COLEGIO_LICENCIATURA',
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json<Record<string, unknown>>()
  const nombre = typeof body.nombre === 'string' ? body.nombre : ''
  const contacto = typeof body.contacto === 'string' ? body.contacto : ''
  const tipoServicio = TIPO_MAP[body.tipo as string]
  if (!nombre || !contacto || !tipoServicio) return errorResponse(400, 'Faltan campos requeridos')

  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  await env.DB.prepare(
    `INSERT INTO cotizaciones
       (id, nombre, contacto, tipo_servicio, espacio_o_producto, colegio_o_nivel, fecha_ceremonia, mensaje, estado, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NUEVA', ?, ?)`,
  )
    .bind(
      id,
      nombre,
      contacto,
      tipoServicio,
      (body.espacioOProducto as string) || null,
      (body.colegioONivel as string) || null,
      (body.fecha as string) || null,
      (body.mensaje as string) || null,
      now,
      now,
    )
    .run()

  return json({ id }, { status: 201 })
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const { results } = await env.DB.prepare('SELECT * FROM cotizaciones ORDER BY created_at DESC').all()
  return json((results ?? []).map((r) => mapCotizacion(r as never)))
}
