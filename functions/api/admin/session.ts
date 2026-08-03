import type { Env } from '../_lib/db'
import { json } from '../_lib/response'
import { verifySessionCookie } from '../_lib/auth'

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const authed = await verifySessionCookie(request, env.SESSION_SECRET)
  return json({ authed })
}
