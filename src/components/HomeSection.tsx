import { Layers, Scissors, Sofa } from 'lucide-react'

const SERVICIOS = [
  {
    icon: Scissors,
    titulo: 'Cortinaje a Medida y Alta Confección',
    descripcion:
      'Cortinas roller, visillos y blackout confeccionados a la medida exacta de cada ventano, con la caída y el control de luz que cada ambiente necesita.',
    items: ['Roller mecánico y motorizado', 'Visillos de lino y voile', 'Blackout térmico y acústico'],
  },
  {
    icon: Sofa,
    titulo: 'Fundas de Sillas y Mantelería Fina',
    descripcion:
      'Vestimos comedores y salones completos: fundas ajustadas a cada modelo de silla y mantelería con terminaciones de alta costura.',
    items: ['Fundas a medida por modelo', 'Mantelería para eventos íntimos', 'Caminos de mesa y runners'],
  },
  {
    icon: Layers,
    titulo: 'Textilería Integral para el Hogar',
    descripcion:
      'El detalle final de la decoración: cojines, pieceras y fundas que unifican la paleta textil de cada espacio.',
    items: ['Cojines y fundas decorativas', 'Pieceras y cubrecamas', 'Fundas y protectores para muebles a medida'],
  },
]

export default function HomeSection() {
  return (
    <section id="hogar" className="scroll-mt-[72px] bg-cream py-24">
      <div className="container-viki">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">Hogar</p>
          <h2 className="text-3xl sm:text-4xl">Diseño de Interiores para tu Hogar</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">
            Cada espacio se mide, se diseña y se confecciona en taller propio. Trabajamos junto a ti
            desde la elección de la tela hasta la instalación final.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICIOS.map((s) => (
            <article key={s.titulo} className="swatch-card p-7">
              <div className="grid h-11 w-11 place-items-center rounded-sm bg-emerald/8 text-emerald">
                <s.icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-emerald">{s.titulo}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-charcoal/70">{s.descripcion}</p>
              <ul className="mt-5 space-y-2 border-t border-gold/20 pt-4">
                {s.items.map((it) => (
                  <li key={it} className="flex items-baseline gap-2 text-[13px] text-charcoal/75">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold-deep" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
