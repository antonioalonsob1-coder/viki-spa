import { useEffect, useState } from 'react'
import { galeriaSeed, type FotoGaleria, type CategoriaGaleria } from '../data/galeriaSeed'

const STORAGE_KEY = 'viki-galeria-fotos-v1'

function readUploaded(): FotoGaleria[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as FotoGaleria[]) : []
  } catch {
    return []
  }
}

export function useLocalGallery() {
  const [uploaded, setUploaded] = useState<FotoGaleria[]>(() => readUploaded())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uploaded))
    } catch {
      // localStorage puede fallar si el cupo se llena con imágenes grandes; se ignora silenciosamente.
    }
  }, [uploaded])

  function agregarFotos(files: FileList, categoria: CategoriaGaleria) {
    Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          const nueva: FotoGaleria = {
            id: `up-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            categoria,
            titulo: file.name.replace(/\.[^.]+$/, ''),
            src: String(reader.result),
            fecha: new Date().toISOString().slice(0, 10),
          }
          setUploaded((prev) => [nueva, ...prev])
        }
        reader.readAsDataURL(file)
      })
  }

  function eliminarFoto(id: string) {
    setUploaded((prev) => prev.filter((f) => f.id !== id))
  }

  const fotos = [...uploaded, ...galeriaSeed]

  return { fotos, agregarFotos, eliminarFoto }
}
