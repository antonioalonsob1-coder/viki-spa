import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { waLink } from '../data/config'
import { useContacto } from '../hooks/useSiteContent'
import Logo from './Logo'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#hogar', label: 'Hogar' },
  { href: '#licenciaturas', label: 'Licenciaturas & Colegios' },
  { href: '#muestrario', label: 'Muestrario de Telas' },
  { href: '#galeria', label: 'Galería' },
  { href: '#resenas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [contacto] = useContacto()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 shadow-[0_1px_0_rgba(199,164,69,0.35)] backdrop-blur' : 'bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container-viki flex h-[72px] items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 shrink-0" aria-label={`${contacto.nombre} — inicio`}>
          <Logo />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-emerald">
              {contacto.nombre.toUpperCase()}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-deep">
              {contacto.eslogan}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 xl:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13.5px] font-medium text-charcoal/80 transition-colors hover:text-emerald"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center lg:flex">
          <a
            href={waLink(`Hola ${contacto.nombre}, me gustaría cotizar un proyecto.`, contacto.whatsappNumber)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm bg-emerald px-3.5 py-1.5 text-[12.5px] font-semibold text-cream transition-colors hover:bg-emerald-deep"
          >
            <MessageCircle size={14} className="text-gold" />
            Cotizar por WhatsApp
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center text-emerald xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gold/30 bg-cream xl:hidden">
          <ul className="container-viki flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-2 py-3 text-[15px] font-medium text-charcoal/85 hover:bg-cream-alt hover:text-emerald"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={waLink(`Hola ${contacto.nombre}, me gustaría cotizar un proyecto.`, contacto.whatsappNumber)}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-emerald px-5 py-3 text-sm font-semibold text-cream"
              >
                <MessageCircle size={16} className="text-gold" />
                Cotizar por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
