import { useEffect, useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import type { CategoriaTela } from '../data/telas'
import { waLink } from '../data/config'
import { useContacto, useTelasStore } from '../hooks/useSiteContent'

type Filtro = CategoriaTela | 'Todas'
const FILTROS: Filtro[] = ['Todas', 'Hogar', 'Institucional']

export default function FabricSwatches() {
  const [telas] = useTelasStore()
  const [contacto] = useContacto()
  const [filtro, setFiltro] = useState<Filtro>('Todas')
  const [activa, setActiva] = useState<string | null>(telas[0]?.id ?? null)

  const visibles = useMemo(
    () => (filtro === 'Todas' ? telas : telas.filter((t) => t.categoria === filtro)),
    [filtro, telas],
  )

  useEffect(() => {
    if (!visibles.some((t) => t.id === activa)) {
      setActiva(visibles[0]?.id ?? null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibles])

  const seleccionada = telas.find((t) => t.id === activa) ?? visibles[0]

  return (
    <section id="muestrario" className="scroll-mt-[72px] bg-cream-alt py-24">
      <div className="container-viki">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Materiales</p>
            <h2 className="text-3xl sm:text-4xl">Muestrario Digital de Telas</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">
              Explora las texturas con las que trabajamos antes de tu visita al taller. Filtra por
              tipo de proyecto y toca una tela para ver su detalle.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
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
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibles.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiva(t.id)}
              className={`swatch-card group text-left transition-shadow ${
                seleccionada?.id === t.id ? 'ring-2 ring-gold' : ''
              }`}
            >
              <div
                className="h-28 w-full rounded-t-[2px] transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundImage: t.swatch }}
              />
              <div className="px-3.5 py-3">
                <p className="text-[13.5px] font-semibold text-emerald">{t.nombre}</p>
                <p className="text-[11px] uppercase tracking-wide text-gold-deep">{t.categoria}</p>
              </div>
            </button>
          ))}
        </div>

        {visibles.length === 0 && (
          <p className="mt-10 text-center text-sm text-charcoal/50">
            Aún no hay telas cargadas en esta categoría.
          </p>
        )}

        {seleccionada && (
          <div className="mt-8 grid gap-6 border border-gold/25 bg-white p-7 sm:grid-cols-[180px_1fr] sm:items-center">
            <div className="h-32 rounded-sm sm:h-full" style={{ backgroundImage: seleccionada.swatch }} />
            <div>
              <p className="eyebrow mb-2">{seleccionada.categoria}</p>
              <h3 className="text-xl font-display font-semibold text-emerald">{seleccionada.nombre}</h3>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-charcoal/70">
                {seleccionada.descripcion}
              </p>
              <p className="mt-3 text-[12.5px] text-charcoal/60">
                <span className="font-semibold text-charcoal/80">Usos frecuentes: </span>
                {seleccionada.usos.join(' · ')}
              </p>
              <a
                href={waLink(
                  `Hola ${contacto.nombre}, me interesa la tela "${seleccionada.nombre}" del muestrario. ¿Me pueden dar más información?`,
                  contacto.whatsappNumber,
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-emerald hover:text-emerald-deep"
              >
                <MessageCircle size={15} className="text-gold" />
                Consultar por esta tela
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
