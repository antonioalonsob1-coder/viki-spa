import type { Env } from './_lib/db'
import { mapGaleriaFoto } from './_lib/db'
import { json, errorResponse } from './_lib/response'
import { requireAdmin } from './_lib/auth'

const CATEGORIAS = ['Hogar & Cortinaje', 'Licenciaturas & Colegios']

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT * FROM galeria_fotos ORDER BY created_at DESC').all()
  return json((results ?? []).map((r) => mapGaleriaFoto(r as never)))
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const form = await request.formData()
  const categoria = form.get('categoria')
  if (typeof categoria !== 'string' || !CATEGORIAS.includes(categoria)) {
    return errorResponse(400, 'Categoría inválida')
  }

  const files = form.getAll('files').filter((f): f is File => f instanceof File && f.type.startsWith('image/'))
  if (files.length === 0) return errorResponse(400, 'No se recibió ninguna imagen válida')

  const now = new Date().toISOString()
  const creadas = []
  for (const file of files) {
    const id = `up-${crypto.randomUUID()}`
    const r2Key = `galeria/${id}`
    await env.GALERIA_BUCKET.put(r2Key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    })
    const titulo = file.name.replace(/\.[^.]+$/, '')
    const fecha = now.slice(0, 10)
    await env.DB.prepare(
      `INSERT INTO galeria_fotos (id, categoria, titulo, r2_key, content_type, fecha, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(id, categoria, titulo, r2Key, file.type, fecha, now)
      .run()
    creadas.push(mapGaleriaFoto({ id, categoria, titulo, fecha }))
  }

  return json(creadas, { status: 201 })
}
