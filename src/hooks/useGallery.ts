import { useEffect, useState } from 'react'
import { galeriaSeed, type FotoGaleria, type CategoriaGaleria } from '../data/galeriaSeed'

export function useGallery() {
  const [uploaded, setUploaded] = useState<FotoGaleria[]>([])

  useEffect(() => {
    fetch('/api/galeria')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: FotoGaleria[]) => setUploaded(data))
      .catch(() => {})
  }, [])

  async function agregarFotos(files: FileList, categoria: CategoriaGaleria) {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (validFiles.length === 0) return

    const form = new FormData()
    form.set('categoria', categoria)
    validFiles.forEach((file) => form.append('files', file))

    try {
      const res = await fetch('/api/galeria', { method: 'POST', body: form })
      if (!res.ok) return
      const creadas = (await res.json()) as FotoGaleria[]
      setUploaded((prev) => [...creadas, ...prev])
    } catch {
      // no-op: si falla la subida, la galería sigue mostrando lo que ya tenía
    }
  }

  async function eliminarFoto(id: string) {
    const previo = uploaded
    setUploaded((prev) => prev.filter((f) => f.id !== id))
    try {
      const res = await fetch(`/api/galeria/${id}`, { method: 'DELETE' })
      if (!res.ok) setUploaded(previo)
    } catch {
      setUploaded(previo)
    }
  }

  const fotos = [...uploaded, ...galeriaSeed]

  return { fotos, agregarFotos, eliminarFoto }
}
