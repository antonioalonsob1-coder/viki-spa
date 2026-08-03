import type { Env } from './_lib/db'
import { mapContacto } from './_lib/db'
import { json, errorResponse } from './_lib/response'
import { requireAdmin } from './_lib/auth'

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const row = await env.DB.prepare('SELECT * FROM contacto WHERE id = 1').first()
  if (!row) return errorResponse(404, 'Contacto no configurado')
  return json(mapContacto(row as never))
}

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const body = await request.json<Record<string, unknown>>()
  const required = ['nombre', 'eslogan', 'telefonoDisplay', 'whatsappNumber', 'email', 'direccion', 'horario', 'instagram']
  for (const key of required) {
    if (typeof body[key] !== 'string') return errorResponse(400, `Falta el campo ${key}`)
  }

  await env.DB.prepare(
    `UPDATE contacto SET nombre=?, eslogan=?, telefono_display=?, whatsapp_number=?, email=?, direccion=?, horario=?, instagram=?, updated_at=?
     WHERE id = 1`,
  )
    .bind(
      body.nombre,
      body.eslogan,
      body.telefonoDisplay,
      body.whatsappNumber,
      body.email,
      body.direccion,
      body.horario,
      body.instagram,
      new Date().toISOString(),
    )
    .run()

  const row = await env.DB.prepare('SELECT * FROM contacto WHERE id = 1').first()
  return json(mapContacto(row as never))
}
