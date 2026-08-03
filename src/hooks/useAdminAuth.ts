import { useEffect, useState } from 'react'

export function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.authed)))
      .catch(() => setAuthed(false))
  }, [])

  async function login(intento: string): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: intento }),
      })
      if (res.ok) setAuthed(true)
      return res.ok
    } catch {
      return false
    }
  }

  async function logout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      // no-op
    }
    setAuthed(false)
  }

  return { authed, login, logout }
}
