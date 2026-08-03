import { useEffect, useState } from 'react'

interface Identifiable {
  id: string
}

interface ObjectStore<T> {
  value: T
  listeners: Set<() => void>
  fetched: boolean
  saveTimeout?: number
}

interface ListStore<T> {
  value: T[]
  listeners: Set<() => void>
  fetched: boolean
  saveTimeouts: Map<string, number>
}

const objectStores = new Map<string, ObjectStore<unknown>>()
const listStores = new Map<string, ListStore<Identifiable>>()

const SAVE_DEBOUNCE_MS = 600

function notify(listeners: Set<() => void>) {
  listeners.forEach((listener) => listener())
}

async function apiJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })
    if (!res.ok) return null
    if (res.status === 204) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

/**
 * Fábrica de hooks para un objeto único respaldado por una API (Cloudflare
 * Functions + D1). El primer render usa `defaultValue` (viene del bundle, así
 * que es instantáneo) y se reemplaza en cuanto resuelve el primer fetch a
 * `endpoint` (stale-while-revalidate). `setValue` actualiza el estado local al
 * instante y sincroniza con la API con un pequeño debounce; si la escritura
 * falla, el valor local se mantiene y se autocorrige en el próximo fetch.
 */
export function createApiObjectStoreHook<T>(endpoint: string, defaultValue: T) {
  function getStore(): ObjectStore<T> {
    const existing = objectStores.get(endpoint)
    if (existing) return existing as ObjectStore<T>
    const store: ObjectStore<T> = { value: defaultValue, listeners: new Set(), fetched: false }
    objectStores.set(endpoint, store as ObjectStore<unknown>)
    return store
  }

  function useStore(): [T, (value: T | ((prev: T) => T)) => void] {
    const store = getStore()
    const [, setTick] = useState(0)

    useEffect(() => {
      const listener = () => setTick((n) => n + 1)
      store.listeners.add(listener)

      if (!store.fetched) {
        store.fetched = true
        apiJson<T>(endpoint).then((data) => {
          if (data !== null) {
            store.value = data
            notify(store.listeners)
          }
        })
      }

      return () => {
        store.listeners.delete(listener)
      }
    }, [store])

    function setValue(next: T | ((prev: T) => T)) {
      const resolved = typeof next === 'function' ? (next as (prev: T) => T)(store.value) : next
      store.value = resolved
      notify(store.listeners)

      window.clearTimeout(store.saveTimeout)
      store.saveTimeout = window.setTimeout(() => {
        apiJson<T>(endpoint, { method: 'PUT', body: JSON.stringify(resolved) })
      }, SAVE_DEBOUNCE_MS)
    }

    return [store.value, setValue]
  }

  return useStore
}

/**
 * Fábrica de hooks para una lista de entidades (con `id`) respaldada por una
 * API. Igual patrón de store singleton + listeners y stale-while-revalidate
 * que la versión de objeto único, pero `setValue` diffea contra el valor
 * anterior por `id`: altas y bajas se sincronizan de inmediato (POST/DELETE),
 * y los cambios de campos existentes se sincronizan con debounce por item
 * (PUT), para no saturar la API mientras se escribe.
 */
export function createApiListStoreHook<T extends Identifiable>(endpoint: string, defaultValue: T[]) {
  function getStore(): ListStore<T> {
    const existing = listStores.get(endpoint)
    if (existing) return existing as unknown as ListStore<T>
    const store: ListStore<T> = { value: defaultValue, listeners: new Set(), fetched: false, saveTimeouts: new Map() }
    listStores.set(endpoint, store as unknown as ListStore<Identifiable>)
    return store
  }

  function useStore(): [T[], (value: T[] | ((prev: T[]) => T[])) => void] {
    const store = getStore()
    const [, setTick] = useState(0)

    useEffect(() => {
      const listener = () => setTick((n) => n + 1)
      store.listeners.add(listener)

      if (!store.fetched) {
        store.fetched = true
        apiJson<T[]>(endpoint).then((data) => {
          if (data !== null) {
            store.value = data
            notify(store.listeners)
          }
        })
      }

      return () => {
        store.listeners.delete(listener)
      }
    }, [store])

    function setValue(next: T[] | ((prev: T[]) => T[])) {
      const previous = store.value
      const resolved = typeof next === 'function' ? (next as (prev: T[]) => T[])(previous) : next
      store.value = resolved
      notify(store.listeners)

      const previousById = new Map(previous.map((item) => [item.id, item]))
      const resolvedIds = new Set(resolved.map((item) => item.id))

      for (const item of previous) {
        if (!resolvedIds.has(item.id)) {
          window.clearTimeout(store.saveTimeouts.get(item.id))
          store.saveTimeouts.delete(item.id)
          apiJson(`${endpoint}/${item.id}`, { method: 'DELETE' })
        }
      }

      for (const item of resolved) {
        const prevItem = previousById.get(item.id)
        if (!prevItem) {
          apiJson<T>(endpoint, { method: 'POST', body: JSON.stringify(item) }).then((created) => {
            if (!created) return
            store.value = store.value.map((cur) => (cur.id === item.id ? created : cur))
            notify(store.listeners)
          })
        } else if (JSON.stringify(prevItem) !== JSON.stringify(item)) {
          window.clearTimeout(store.saveTimeouts.get(item.id))
          const timeout = window.setTimeout(() => {
            apiJson(`${endpoint}/${item.id}`, { method: 'PUT', body: JSON.stringify(item) })
          }, SAVE_DEBOUNCE_MS)
          store.saveTimeouts.set(item.id, timeout)
        }
      }
    }

    return [store.value, setValue]
  }

  return useStore
}

export function nuevoId(prefijo: string) {
  return `${prefijo}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
