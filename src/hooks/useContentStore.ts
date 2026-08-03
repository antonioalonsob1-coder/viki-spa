import { useEffect, useState } from 'react'

interface Store<T> {
  value: T
  listeners: Set<() => void>
}

const stores = new Map<string, Store<unknown>>()

function getStore<T>(key: string, defaultValue: T): Store<T> {
  const existing = stores.get(key)
  if (existing) return existing as Store<T>

  let initial = defaultValue
  try {
    const raw = localStorage.getItem(key)
    if (raw) initial = JSON.parse(raw) as T
  } catch {
    initial = defaultValue
  }

  const store: Store<T> = { value: initial, listeners: new Set() }
  stores.set(key, store as Store<unknown>)
  return store
}

/**
 * Fábrica de hooks respaldados por localStorage y compartidos entre todas las
 * instancias que usan la misma `key` en la misma página (un pequeño store con
 * suscriptores, para que editar el dato en un componente se refleje al instante
 * en cualquier otro componente montado que lo esté leyendo).
 *
 * Todo el contenido editable desde /admin (contacto, telas, testimonios) vive en
 * el navegador de quien lo edita: no hay backend conectado todavía (ver
 * prisma/schema.prisma para el esquema pensado para Neon), así que los cambios
 * solo se ven en ese mismo navegador.
 */
export function createLocalStoreHook<T>(key: string, defaultValue: T) {
  function useStore(): [T, (value: T | ((prev: T) => T)) => void] {
    const store = getStore(key, defaultValue)
    const [, setTick] = useState(0)

    useEffect(() => {
      const listener = () => setTick((n) => n + 1)
      store.listeners.add(listener)
      return () => {
        store.listeners.delete(listener)
      }
    }, [store])

    function setValue(next: T | ((prev: T) => T)) {
      const resolved = typeof next === 'function' ? (next as (prev: T) => T)(store.value) : next
      store.value = resolved
      try {
        localStorage.setItem(key, JSON.stringify(resolved))
      } catch {
        // Cupo de localStorage lleno u otro error de escritura: se ignora silenciosamente.
      }
      store.listeners.forEach((listener) => listener())
    }

    return [store.value, setValue]
  }

  useStore.reset = () => {
    localStorage.removeItem(key)
    const store = stores.get(key) as Store<T> | undefined
    if (store) {
      store.value = defaultValue
      store.listeners.forEach((listener) => listener())
    }
  }

  return useStore
}

export function nuevoId(prefijo: string) {
  return `${prefijo}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
