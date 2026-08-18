import { ArrowRight, GraduationCap } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-cream pt-[72px]">
      {/* Draped fabric silhouette — signature background shape */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <svg
          className="absolute -right-24 -top-16 h-[520px] w-[520px] opacity-90 md:right-[-60px] md:top-[-40px]"
          viewBox="0 0 500 500"
        >
          <path
            d="M120 40 C 60 140, 60 260, 140 320 C 220 380, 260 300, 320 340 C 380 380, 360 460, 300 480"
            fill="none"
            stroke="#C7A445"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <path
            d="M420 10 C 500 120, 480 260, 400 320 C 320 380, 340 440, 300 480"
            fill="none"
            stroke="#0B3D2E"
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
        </svg>
        <div className="absolute right-[-140px] top-[110px] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-gold-soft/60 to-transparent blur-2xl animate-drift" />
        <div className="absolute -left-32 bottom-[-120px] h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-emerald/10 to-transparent blur-2xl" />
      </div>

      <div className="container-viki grid gap-14 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
        <div className="reveal">
          <p className="eyebrow mb-5">Alta confección textil desde 2007</p>
          <h1 className="max-w-xl text-[2.6rem] leading-[1.08] tracking-tight sm:text-[3.2rem] lg:text-[3.6rem]">
            Vestimos espacios y
            <br />
            <span className="italic font-medium text-gold-deep">ceremonias</span> con la
            <br />
            misma precisión de aguja.
          </h1>
          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-charcoal/75">
            Diseño y confección a medida para el hogar y para los grandes hitos institucionales:
            cortinaje, cojines, túnicas de graduación y confección de grandes formatos, hechos en
            nuestro propio taller.
          </p>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <a
              href="#hogar"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-emerald px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-emerald-deep"
            >
              Ver Servicios Hogar
              <ArrowRight size={16} className="text-gold" />
            </a>
            <a
              href="#licenciaturas"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-emerald/25 bg-transparent px-6 py-3.5 text-sm font-semibold text-emerald transition-colors hover:border-emerald hover:bg-emerald/5"
            >
              <GraduationCap size={16} />
              Soluciones para Colegios y Graduaciones
            </a>
          </div>

          <div className="thread-divider mt-10 max-w-md" />
          <p className="mt-4 max-w-md text-[12.5px] uppercase tracking-[0.16em] text-charcoal/55">
            Confección a medida · Bordado institucional · Instalación incluida
          </p>
        </div>

        <div className="reveal [animation-delay:150ms]">
          <div className="swatch-card mx-auto max-w-sm p-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="col-span-2 h-40 rounded-sm bg-[linear-gradient(135deg,#0B3D2E,#155C45_60%,#0B3D2E)]" />
              <div className="h-28 rounded-sm bg-[linear-gradient(135deg,#C7A445,#E8DCB8_60%,#C7A445)]" />
              <div className="h-28 rounded-sm bg-[repeating-linear-gradient(45deg,#EDE4CE_0_2px,#E4D8B9_2px_4px)]" />
            </div>
            <div className="flex items-center justify-between px-1.5 pt-3 pb-1">
              <span className="font-display text-sm italic text-emerald">Muestrario en vivo</span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-gold-deep">8 texturas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
