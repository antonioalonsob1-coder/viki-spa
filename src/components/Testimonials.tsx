import { Star } from 'lucide-react'
import { useTestimoniosStore } from '../hooks/useSiteContent'

export default function Testimonials() {
  const [testimonios] = useTestimoniosStore()

  return (
    <section id="resenas" className="scroll-mt-[72px] bg-cream-alt py-24">
      <div className="container-viki">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">Confianza</p>
          <h2 className="text-3xl sm:text-4xl">Lo que dicen quienes ya confiaron en nosotros</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonios.map((t) => (
            <blockquote key={t.id} className="swatch-card flex flex-col p-7">
              <div className="flex gap-1" aria-label={`${t.estrellas} de 5 estrellas`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < t.estrellas ? 'fill-gold text-gold' : 'text-gold/25'}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-charcoal/80">
                &ldquo;{t.texto}&rdquo;
              </p>
              <footer className="mt-5 border-t border-gold/20 pt-4">
                <p className="text-[13.5px] font-semibold text-emerald">{t.nombre}</p>
                <p className="text-[12px] text-charcoal/55">{t.rol}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        {testimonios.length === 0 && (
          <p className="mt-10 text-center text-sm text-charcoal/50">Aún no hay reseñas cargadas.</p>
        )}
      </div>
    </section>
  )
}
