import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { waLink } from '../data/config'
import { useContacto } from '../hooks/useSiteContent'
import Logo from './Logo'

export default function Footer() {
  const [contacto] = useContacto()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-emerald-deep text-cream/80">
      <div className="container-viki grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo variant="onDark" size={30} />
            <span className="font-display text-base font-semibold text-cream">{contacto.nombre}</span>
          </div>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-cream/60">
            Diseño y confección textil a medida para el hogar y para las ceremonias más importantes
            de tu colegio.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4 text-gold">Navegación</p>
          <ul className="space-y-2.5 text-[13.5px]">
            {[
              ['Hogar', '#hogar'],
              ['Licenciaturas & Colegios', '#licenciaturas'],
              ['Muestrario de Telas', '#muestrario'],
              ['Galería', '#galeria'],
              ['Reseñas', '#resenas'],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-cream/65 transition-colors hover:text-gold">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-gold">Contacto</p>
          <ul className="space-y-3 text-[13.5px] text-cream/65">
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-gold" />
              <a
                href={waLink('Hola, quisiera más información.', contacto.whatsappNumber)}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                {contacto.telefonoDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-gold" />
              <a href={`mailto:${contacto.email}`} className="hover:text-gold">
                {contacto.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={15} className="text-gold" />
              {contacto.direccion}
            </li>
            <li className="flex items-center gap-2.5">
              <Instagram size={15} className="text-gold" />
              {contacto.instagram}
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-gold">Horario de atención</p>
          <p className="text-[13.5px] text-cream/65">{contacto.horario}</p>
        </div>
      </div>

      <div className="thread-divider opacity-40" />

      <div className="container-viki flex flex-col items-center justify-between gap-2 py-6 text-[12px] text-cream/50 sm:flex-row">
        <p>&copy; {year} {contacto.nombre}. Todos los derechos reservados.</p>
        <p>Diseño y desarrollo con dedicación artesanal.</p>
      </div>
    </footer>
  )
}
