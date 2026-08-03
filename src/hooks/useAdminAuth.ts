import { useState } from 'react'
import { createLocalStoreHook } from './useContentStore'

const SESSION_KEY = 'viki-admin-session'

export const useAdminPassword = createLocalStoreHook<string>('viki-admin-password', 'vikispa2026')

function leerSesion(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

export function useAdminAuth() {
  const [password] = useAdminPassword()
  const [authed, setAuthed] = useState(leerSesion)

  function login(intento: string): boolean {
    const ok = intento === password
    if (ok) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true')
      } catch {
        // sessionStorage no disponible: la sesión no persiste al recargar, pero el login igual funciona.
      }
      setAuthed(true)
    }
    return ok
  }

  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // no-op
    }
    setAuthed(false)
  }

  return { authed, login, logout }
}
