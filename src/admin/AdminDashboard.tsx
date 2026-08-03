import { useState } from 'react'
import { ExternalLink, Images, LogOut, MessageSquareQuote, Settings, Shirt, UserRound } from 'lucide-react'
import Logo from '../components/Logo'
import { useContacto } from '../hooks/useSiteContent'
import ContactoEditor from './sections/ContactoEditor'
import TelasEditor from './sections/TelasEditor'
import GaleriaEditor from './sections/GaleriaEditor'
import TestimoniosEditor from './sections/TestimoniosEditor'
import AjustesEditor from './sections/AjustesEditor'

const TABS = [
  { id: 'contacto', label: 'Contacto', icon: UserRound, Component: ContactoEditor },
  { id: 'telas', label: 'Muestrario de Telas', icon: Shirt, Component: TelasEditor },
  { id: 'galeria', label: 'Galería', icon: Images, Component: GaleriaEditor },
  { id: 'testimonios', label: 'Testimonios', icon: MessageSquareQuote, Component: TestimoniosEditor },
  { id: 'ajustes', label: 'Ajustes', icon: Settings, Component: AjustesEditor },
] as const

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [contacto] = useContacto()
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('contacto')

  const Activo = TABS.find((t) => t.id === tab)?.Component ?? ContactoEditor

  return (
    <div className="min-h-screen bg-cream-alt">
      <header className="border-b border-gold/25 bg-cream">
        <div className="container-viki flex h-[68px] items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={30} />
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold text-emerald">{contacto.nombre}</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold-deep">Panel administrador</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-sm border border-emerald/25 px-3.5 py-2 text-[12.5px] font-semibold text-emerald hover:bg-emerald/5"
            >
              <ExternalLink size={14} />
              Ver sitio
            </a>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-sm bg-emerald px-3.5 py-2 text-[12.5px] font-semibold text-cream hover:bg-emerald-deep"
            >
              <LogOut size={14} className="text-gold" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="container-viki grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-sm px-3.5 py-2.5 text-left text-[13.5px] font-medium transition-colors lg:shrink ${
                tab === t.id ? 'bg-emerald text-cream' : 'text-charcoal/70 hover:bg-cream'
              }`}
            >
              <t.icon size={16} className={tab === t.id ? 'text-gold' : 'text-gold-deep'} />
              {t.label}
            </button>
          ))}
        </nav>

        <main className="swatch-card p-7">
          <Activo />
        </main>
      </div>
    </div>
  )
}
