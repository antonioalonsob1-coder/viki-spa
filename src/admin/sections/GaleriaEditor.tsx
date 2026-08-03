import { useRef, useState } from 'react'
import { Trash2, Upload } from 'lucide-react'
import { useLocalGallery } from '../../hooks/useLocalGallery'
import type { CategoriaGaleria } from '../../data/galeriaSeed'

const CATEGORIAS: CategoriaGaleria[] = ['Hogar & Cortinaje', 'Licenciaturas & Colegios']

export default function GaleriaEditor() {
  const { fotos, agregarFotos, eliminarFoto } = useLocalGallery()
  const [categoriaSubida, setCategoriaSubida] = useState<CategoriaGaleria>('Hogar & Cortinaje')
  const [arrastrando, setArrastrando] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    agregarFotos(files, categoriaSubida)
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-emerald">Galería de trabajos</h2>
      <p className="mt-1 text-[13px] text-charcoal/60">
        Sube fotos de proyectos terminados. Las fotos de ejemplo (marcadas como semilla) no se
        pueden borrar desde aquí; las que subas tú sí.
      </p>

      <div className="mt-7 border border-dashed border-gold/60 bg-cream-alt/60 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-emerald">Subir fotos nuevas</p>
          <select
            value={categoriaSubida}
            onChange={(e) => setCategoriaSubida(e.target.value as CategoriaGaleria)}
            className="viki-input sm:w-64"
          >
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault()
            setArrastrando(true)
          }}
          onDragLeave={() => setArrastrando(false)}
          onDrop={(e) => {
            e.preventDefault()
            setArrastrando(false)
            handleFiles(e.dataTransfer.files)
          }}
          onClick={() => inputRef.current?.click()}
          className={`mt-5 grid cursor-pointer place-items-center rounded-sm border-2 border-dashed py-10 text-center transition-colors ${
            arrastrando ? 'border-emerald bg-emerald/5' : 'border-gold/40 hover:border-gold'
          }`}
        >
          <Upload size={22} className="text-gold-deep" />
          <p className="mt-2 text-[13.5px] font-medium text-emerald">
            Arrastra tus fotos aquí o haz clic para elegirlas
          </p>
          <p className="mt-1 text-[12px] text-charcoal/50">JPG, PNG o WEBP</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {fotos.map((f) => (
          <figure key={f.id} className="swatch-card group relative overflow-hidden">
            <img src={f.src} alt={f.titulo} className="h-36 w-full object-cover" loading="lazy" />
            <figcaption className="px-3.5 py-3">
              <p className="truncate text-[13px] font-semibold text-emerald">{f.titulo}</p>
              <p className="text-[11px] uppercase tracking-wide text-gold-deep">{f.categoria}</p>
            </figcaption>
            {!f.seed && (
              <button
                onClick={() => eliminarFoto(f.id)}
                aria-label={`Eliminar ${f.titulo}`}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-charcoal/70 text-cream opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-700"
              >
                <Trash2 size={15} />
              </button>
            )}
            {f.seed && (
              <span className="absolute left-2 top-2 rounded-full bg-charcoal/60 px-2 py-0.5 text-[10px] font-medium text-cream">
                Semilla
              </span>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
