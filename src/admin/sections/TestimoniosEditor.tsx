import { useState } from 'react'
import { Plus, Star, Trash2 } from 'lucide-react'
import { useTestimoniosStore } from '../../hooks/useSiteContent'
import { nuevoId } from '../../hooks/useContentStore'
import type { Testimonio } from '../../data/testimonios'

const VACIO = { nombre: '', rol: '', texto: '', estrellas: 5 }

export default function TestimoniosEditor() {
  const [testimonios, setTestimonios] = useTestimoniosStore()
  const [nuevo, setNuevo] = useState(VACIO)

  function actualizar(id: string, cambios: Partial<Testimonio>) {
    setTestimonios((prev) => prev.map((t) => (t.id === id ? { ...t, ...cambios } : t)))
  }

  function eliminar(id: string) {
    setTestimonios((prev) => prev.filter((t) => t.id !== id))
  }

  function agregar() {
    if (!nuevo.nombre.trim() || !nuevo.texto.trim()) return
    const testimonio: Testimonio = { id: nuevoId('test'), ...nuevo }
    setTestimonios((prev) => [testimonio, ...prev])
    setNuevo(VACIO)
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-emerald">Reseñas y testimonios</h2>
      <p className="mt-1 text-[13px] text-charcoal/60">
        Los testimonios se muestran en el orden de esta lista, de arriba hacia abajo.
      </p>

      <div className="mt-7 border border-gold/30 bg-cream-alt/60 p-6">
        <p className="text-sm font-semibold text-emerald">Agregar nuevo testimonio</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Nombre</span>
            <input
              value={nuevo.nombre}
              onChange={(e) => setNuevo((n) => ({ ...n, nombre: e.target.value }))}
              className="viki-input"
              placeholder="Nombre del cliente"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Rol / referencia</span>
            <input
              value={nuevo.rol}
              onChange={(e) => setNuevo((n) => ({ ...n, rol: e.target.value }))}
              className="viki-input"
              placeholder="Ej: Cliente residencial, Alto Hospicio"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Testimonio</span>
            <textarea
              value={nuevo.texto}
              onChange={(e) => setNuevo((n) => ({ ...n, texto: e.target.value }))}
              rows={3}
              className="viki-input resize-none"
              placeholder="Lo que dijo el cliente"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Estrellas</span>
            <select
              value={nuevo.estrellas}
              onChange={(e) => setNuevo((n) => ({ ...n, estrellas: Number(e.target.value) }))}
              className="viki-input"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} estrella{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          onClick={agregar}
          className="mt-5 inline-flex items-center gap-2 rounded-sm bg-emerald px-4 py-2.5 text-[13px] font-semibold text-cream transition-colors hover:bg-emerald-deep"
        >
          <Plus size={15} className="text-gold" />
          Agregar testimonio
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {testimonios.map((t) => (
          <div key={t.id} className="flex flex-col gap-3 border border-emerald/15 bg-white p-4 sm:flex-row">
            <div className="flex-1 space-y-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  value={t.nombre}
                  onChange={(e) => actualizar(t.id, { nombre: e.target.value })}
                  className="viki-input"
                />
                <input
                  value={t.rol}
                  onChange={(e) => actualizar(t.id, { rol: e.target.value })}
                  className="viki-input"
                />
              </div>
              <textarea
                value={t.texto}
                onChange={(e) => actualizar(t.id, { texto: e.target.value })}
                rows={2}
                className="viki-input resize-none"
              />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => actualizar(t.id, { estrellas: n })}
                    aria-label={`${n} estrellas`}
                  >
                    <Star size={16} className={n <= t.estrellas ? 'fill-gold text-gold' : 'text-gold/25'} />
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => eliminar(t.id)}
              aria-label={`Eliminar testimonio de ${t.nombre}`}
              className="grid h-9 w-9 shrink-0 place-items-center self-start rounded-sm text-charcoal/40 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {testimonios.length === 0 && (
          <p className="py-8 text-center text-sm text-charcoal/50">No hay testimonios cargados todavía.</p>
        )}
      </div>
    </div>
  )
}
