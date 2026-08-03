import { MessageCircle } from 'lucide-react'
import { waLink } from '../data/config'
import { useContacto } from '../hooks/useSiteContent'

export default function WhatsAppFloat() {
  const [contacto] = useContacto()

  return (
    <a
      href={waLink(`Hola ${contacto.nombre}, quisiera más información.`, contacto.whatsappNumber)}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald text-cream shadow-lg transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 rounded-full bg-emerald animate-pulseRing" aria-hidden="true" />
      <MessageCircle size={26} className="relative text-gold" strokeWidth={2} />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-sm bg-emerald px-3 py-1.5 text-xs font-medium text-cream opacity-0 shadow transition-opacity group-hover:opacity-100 sm:block">
        Escríbenos por WhatsApp
      </span>
    </a>
  )
}
