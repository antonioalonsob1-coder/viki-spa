import { useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useContacto, type Contacto } from '../../hooks/useSiteContent'

const CAMPOS: { key: keyof Contacto; label: string; placeholder: string; type?: string }[] = [
  { key: 'nombre', label: 'Nombre del negocio', placeholder: 'Viki SpA' },
  { key: 'eslogan', label: 'Eslogan', placeholder: 'Diseño y Decoración de Interiores' },
  { key: 'telefonoDisplay', label: 'Teléfono (para mostrar)', placeholder: '+56 9 7822 9188' },
  {
    key: 'whatsappNumber',
    label: 'Número de WhatsApp (solo dígitos, con código de país)',
    placeholder: '56978229188',
  },
  { key: 'email', label: 'Correo de contacto', placeholder: 'contacto@vikispa.cl', type: 'email' },
  { key: 'direccion', label: 'Ubicación', placeholder: 'Alto Hospicio, Tarapacá' },
  { key: 'horario', label: 'Horario de atención', placeholder: 'Lun a Vie 9:30–18:30 · Sáb 10:00–14:00' },
  { key: 'instagram', label: 'Instagram', placeholder: '@vikispa.interiores' },
]

export default function ContactoEditor() {
  const [contacto, setContacto] = useContacto()
  const [guardado, setGuardado] = useState(false)
  const timeoutRef = useRef<number>()

  function update(key: keyof Contacto, value: string) {
    setContacto((prev) => ({ ...prev, [key]: value }))
    setGuardado(true)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setGuardado(false), 1600)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-emerald">Datos de contacto</h2>
          <p className="mt-1 text-[13px] text-charcoal/60">
            Estos datos se usan en el navbar, el botón de WhatsApp, el pie de página y el
            formulario de cotización.
          </p>
        </div>
        {guardado && (
          <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-emerald">
            <CheckCircle2 size={15} /> Guardado
          </span>
        )}
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {CAMPOS.map((c) => (
          <label key={c.key} className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">{c.label}</span>
            <input
              type={c.type ?? 'text'}
              value={contacto[c.key]}
              onChange={(e) => update(c.key, e.target.value)}
              placeholder={c.placeholder}
              className="viki-input"
            />
          </label>
        ))}
      </div>
    </div>
  )
}
