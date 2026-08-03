import type { Env } from '../_lib/db'
import { json } from '../_lib/response'
import { clearSessionCookieHeader } from '../_lib/auth'

export const onRequestPost: PagesFunction<Env> = async () => {
  return json({ ok: true }, { headers: { 'Set-Cookie': clearSessionCookieHeader() } })
}
