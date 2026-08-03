import type { Env } from '../_lib/db'
import { errorResponse } from '../_lib/response'
import { requireAdmin } from '../_lib/auth'

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env)
  if (denied) return denied

  const id = params.id as string
  const row = await env.DB.prepare('SELECT r2_key FROM galeria_fotos WHERE id = ?').bind(id).first<{
    r2_key: string
  }>()
  if (!row) return errorResponse(404, 'Foto no encontrada')

  await env.GALERIA_BUCKET.delete(row.r2_key)
  await env.DB.prepare('DELETE FROM galeria_fotos WHERE id = ?').bind(id).run()
  return new Response(null, { status: 204 })
}
