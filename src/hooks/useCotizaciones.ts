import { useEffect, useState } from 'react'

export interface Cotizacion {
  id: string
  nombre: string
  contacto: string
  tipoServicio: 'HOGAR' | 'COLEGIO_LICENCIATURA'
  espacioOProducto: string | null
  colegioONivel: string | null
  fechaCeremonia: string | null
  mensaje: string | null
  estado: string
  createdAt: string
}

export function useCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/cotizaciones')
      .then((r) => {
        if (!r.ok) throw new Error('request failed')
        return r.json()
      })
      .then((data: Cotizacion[]) => setCotizaciones(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return { cotizaciones, loading, error }
}
