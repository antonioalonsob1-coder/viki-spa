import { Download, Eye, GraduationCap, PartyPopper, Tent } from 'lucide-react'
import { waLink } from '../data/config'
import { useContacto } from '../hooks/useSiteContent'

const BLOQUES = [
  {
    icon: GraduationCap,
    titulo: 'Confección Académica',
    descripcion: 'Túnicas, estolas bordadas y birretes confeccionados según el protocolo de cada institución.',
    items: ['Túnicas y togas por talla', 'Estolas con bordado de escudo', 'Birretes y borlas por color de generación'],
  },
  {
    icon: PartyPopper,
    titulo: 'Indumentaria para Eventos',
    descripcion: 'Vestimos el salón completo para la ceremonia: mesas, sillas y el fondo del escenario.',
    items: ['Fundas de sillas por generación', 'Cubre-mesas y manteles institucionales', 'Telones de fondo de escenario'],
  },
  {
    icon: Tent,
    titulo: 'Montajes y Estructuras',
    descripcion: 'Instalación completa del espacio de la ceremonia, dentro o fuera del establecimiento.',
    items: ['Encarpados y toldos', 'Decoración de escenarios', 'Pasarelas para desfile de honor'],
  },
]

const DOSSIER_HREF = '/dossier-licenciaturas-2026.pdf'

export default function InstitutionalSection() {
  const [contacto] = useContacto()

  return (
    <section id="licenciaturas" className="scroll-mt-[72px] bg-emerald py-24 text-cream">
      <div className="container-viki">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-body text-xs uppercase tracking-[0.28em] text-gold font-semibold">
              Colegios y Liceos
            </p>
            <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl">
              Decoración Institucional y Licenciaturas
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/75">
              Coordinamos con centros de padres y colegios cada ceremonia de graduación, de la
              medida de la túnica al último metro del telón de fondo.
            </p>
          </div>

          <div className="swatch-card shrink-0 bg-cream/95 p-6 md:w-[300px]">
            <p className="eyebrow mb-2 text-gold-deep">Descarga</p>
            <h3 className="font-display text-lg text-emerald">Dossier de Licenciaturas 2026</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-charcoal/70">
              Catálogo completo de túnicas, estolas y paquetes de montaje con precios referenciales.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={DOSSIER_HREF}
                download
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-emerald px-4 py-2.5 text-[13px] font-semibold text-cream transition-colors hover:bg-emerald-deep"
              >
                <Download size={15} className="text-gold" />
                Descargar PDF
              </a>
              <a
                href={DOSSIER_HREF}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-emerald/25 px-4 py-2.5 text-[13px] font-semibold text-emerald transition-colors hover:bg-emerald/5"
              >
                <Eye size={15} />
                Ver en línea
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {BLOQUES.map((b) => (
            <article key={b.titulo} className="relative border border-gold/25 bg-emerald-deep/40 p-7">
              <div className="grid h-11 w-11 place-items-center rounded-sm bg-gold/15 text-gold">
                <b.icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-display font-semibold text-cream">{b.titulo}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-cream/70">{b.descripcion}</p>
              <ul className="mt-5 space-y-2 border-t border-gold/20 pt-4">
                {b.items.map((it) => (
                  <li key={it} className="flex items-baseline gap-2 text-[13px] text-cream/75">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={waLink(
              `Hola ${contacto.nombre}, somos de un colegio y quisiéramos cotizar la licenciatura 2026.`,
              contacto.whatsappNumber,
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-emerald-deep transition-colors hover:bg-gold-soft"
          >
            Cotizar licenciatura de mi colegio
          </a>
        </div>
      </div>
    </section>
  )
}
