import type { Env } from '../../_lib/db'

export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const id = params.id as string
  const row = await env.DB.prepare('SELECT r2_key, content_type FROM galeria_fotos WHERE id = ?').bind(id).first<{
    r2_key: string
    content_type: string
  }>()
  if (!row) return new Response('No encontrada', { status: 404 })

  const object = await env.GALERIA_BUCKET.get(row.r2_key)
  if (!object) return new Response('No encontrada', { status: 404 })

  return new Response(object.body, {
    headers: {
      'Content-Type': row.content_type,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
