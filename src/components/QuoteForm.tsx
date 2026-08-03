import { useState, type FormEvent, type ReactNode } from 'react'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { waLink } from '../data/config'
import { useContacto } from '../hooks/useSiteContent'

type TipoServicio = 'Hogar' | 'Colegio / Licenciatura'

interface FormState {
  nombre: string
  contacto: string
  tipo: TipoServicio
  espacioOProducto: string
  colegioONivel: string
  fecha: string
  mensaje: string
}

const INITIAL: FormState = {
  nombre: '',
  contacto: '',
  tipo: 'Hogar',
  espacioOProducto: '',
  colegioONivel: '',
  fecha: '',
  mensaje: '',
}

export default function QuoteForm() {
  const [contacto] = useContacto()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [enviado, setEnviado] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const lineas = [
      `Hola ${contacto.nombre}, quisiera cotizar un proyecto.`,
      '',
      `*Nombre:* ${form.nombre}`,
      `*Contacto:* ${form.contacto}`,
      `*Tipo de servicio:* ${form.tipo}`,
    ]

    if (form.tipo === 'Hogar') {
      lineas.push(`*Espacio / producto:* ${form.espacioOProducto || 'No especificado'}`)
    } else {
      lineas.push(`*Colegio / institución:* ${form.colegioONivel || 'No especificado'}`)
      lineas.push(`*Fecha estimada de la ceremonia:* ${form.fecha || 'No especificada'}`)
    }

    if (form.mensaje.trim()) {
      lineas.push('', `*Detalle:* ${form.mensaje.trim()}`)
    }

    fetch('/api/cotizaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).catch(() => {
      // no bloquea el envío por WhatsApp si la API falla
    })

    window.open(waLink(lineas.join('\n'), contacto.whatsappNumber), '_blank', 'noreferrer')
    setEnviado(true)
  }

  return (
    <section id="contacto" className="scroll-mt-[72px] bg-cream py-24">
      <div className="container-viki grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow mb-4">Contacto</p>
          <h2 className="text-3xl sm:text-4xl">Cuéntanos tu proyecto</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-charcoal/70">
            Completa el formulario y lo enviaremos directo a nuestro WhatsApp, listo para
            responderte con una propuesta.
          </p>

          <ul className="mt-9 space-y-4 text-[14px] text-charcoal/75">
            <li className="flex items-center gap-3">
              <Phone size={17} className="text-gold-deep" /> {contacto.telefonoDisplay}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={17} className="text-gold-deep" /> {contacto.email}
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={17} className="text-gold-deep" /> {contacto.direccion}
            </li>
            <li className="flex items-center gap-3">
              <Clock size={17} className="text-gold-deep" /> {contacto.horario}
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="swatch-card space-y-5 p-8">
          <div className="flex gap-2">
            {(['Hogar', 'Colegio / Licenciatura'] as TipoServicio[]).map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => update('tipo', t)}
                className={`flex-1 rounded-sm border px-3 py-2.5 text-[13px] font-semibold transition-colors ${
                  form.tipo === t
                    ? 'border-emerald bg-emerald text-cream'
                    : 'border-emerald/25 text-emerald hover:bg-emerald/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre completo" required>
              <input
                required
                value={form.nombre}
                onChange={(e) => update('nombre', e.target.value)}
                className="viki-input"
                placeholder="Tu nombre"
              />
            </Field>
            <Field label="Teléfono o email" required>
              <input
                required
                value={form.contacto}
                onChange={(e) => update('contacto', e.target.value)}
                className="viki-input"
                placeholder="+56 9 ... o correo"
              />
            </Field>
          </div>

          {form.tipo === 'Hogar' ? (
            <Field label="Espacio y producto de interés">
              <input
                value={form.espacioOProducto}
                onChange={(e) => update('espacioOProducto', e.target.value)}
                className="viki-input"
                placeholder="Ej: cortinas roller para living"
              />
            </Field>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Colegio o institución">
                <input
                  value={form.colegioONivel}
                  onChange={(e) => update('colegioONivel', e.target.value)}
                  className="viki-input"
                  placeholder="Nombre del colegio"
                />
              </Field>
              <Field label="Fecha estimada de la ceremonia">
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => update('fecha', e.target.value)}
                  className="viki-input"
                />
              </Field>
            </div>
          )}

          <Field label="Cuéntanos el detalle de tu proyecto">
            <textarea
              value={form.mensaje}
              onChange={(e) => update('mensaje', e.target.value)}
              rows={4}
              className="viki-input resize-none"
              placeholder="Medidas, cantidad, colores, referencias..."
            />
          </Field>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-emerald px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-emerald-deep"
          >
            <MessageCircle size={17} className="text-gold" />
            Enviar Cotización por WhatsApp
          </button>

          {enviado && (
            <p className="text-center text-[12.5px] text-emerald">
              Se abrió WhatsApp con tu mensaje. Si no ves la ventana, revisa los bloqueadores de
              pop-ups del navegador.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">
        {label}
        {required && <span className="text-gold-deep"> *</span>}
      </span>
      {children}
    </label>
  )
}
