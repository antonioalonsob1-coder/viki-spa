import { useState } from 'react'
import { useGallery } from '../hooks/useGallery'
import type { CategoriaGaleria } from '../data/galeriaSeed'

type Filtro = CategoriaGaleria | 'Todos'
const FILTROS: Filtro[] = ['Todos', 'Hogar & Cortinaje', 'Licenciaturas & Colegios']

export default function Gallery() {
  const { fotos } = useGallery()
  const [filtro, setFiltro] = useState<Filtro>('Todos')

  const visibles = filtro === 'Todos' ? fotos : fotos.filter((f) => f.categoria === filtro)

  return (
    <section id="galeria" className="scroll-mt-[72px] bg-cream py-24">
      <div className="container-viki">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">Portafolio</p>
          <h2 className="text-3xl sm:text-4xl">Galería de Trabajos</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">
            Una muestra de proyectos entregados en el hogar y en ceremonias de graduación.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                filtro === f
                  ? 'border-emerald bg-emerald text-cream'
                  : 'border-emerald/25 text-emerald hover:bg-emerald/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibles.map((f) => (
            <figure key={f.id} className="swatch-card group relative overflow-hidden">
              <img src={f.src} alt={f.titulo} className="h-40 w-full object-cover" loading="lazy" />
              <figcaption className="px-3.5 py-3">
                <p className="truncate text-[13px] font-semibold text-emerald">{f.titulo}</p>
                <p className="text-[11px] uppercase tracking-wide text-gold-deep">{f.categoria}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {visibles.length === 0 && (
          <p className="mt-10 text-center text-sm text-charcoal/50">
            Aún no hay fotos en esta categoría.
          </p>
        )}
      </div>
    </section>
  )
}
