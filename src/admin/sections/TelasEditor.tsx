import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useTelasStore } from '../../hooks/useSiteContent'
import { nuevoId } from '../../hooks/useContentStore'
import type { CategoriaTela, Tela } from '../../data/telas'

const CATEGORIAS: CategoriaTela[] = ['Hogar', 'Institucional']

const VACIO = {
  nombre: '',
  categoria: 'Hogar' as CategoriaTela,
  descripcion: '',
  usos: '',
  color1: '#0B3D2E',
  color2: '#C7A445',
}

export default function TelasEditor() {
  const [telas, setTelas] = useTelasStore()
  const [nuevo, setNuevo] = useState(VACIO)

  function actualizarTela(id: string, cambios: Partial<Tela>) {
    setTelas((prev) => prev.map((t) => (t.id === id ? { ...t, ...cambios } : t)))
  }

  function eliminarTela(id: string) {
    setTelas((prev) => prev.filter((t) => t.id !== id))
  }

  function agregarTela() {
    if (!nuevo.nombre.trim()) return
    const tela: Tela = {
      id: nuevoId('tela'),
      nombre: nuevo.nombre.trim(),
      categoria: nuevo.categoria,
      descripcion: nuevo.descripcion.trim(),
      usos: nuevo.usos
        .split(',')
        .map((u) => u.trim())
        .filter(Boolean),
      swatch: `linear-gradient(135deg, ${nuevo.color1}, ${nuevo.color2})`,
    }
    setTelas((prev) => [tela, ...prev])
    setNuevo(VACIO)
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-emerald">Muestrario de telas</h2>
      <p className="mt-1 text-[13px] text-charcoal/60">
        Agrega, edita o quita las telas que aparecen en el muestrario público. Los cambios se ven de
        inmediato al recargar la página del sitio.
      </p>

      <div className="mt-7 border border-gold/30 bg-cream-alt/60 p-6">
        <p className="text-sm font-semibold text-emerald">Agregar nueva tela</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Nombre</span>
            <input
              value={nuevo.nombre}
              onChange={(e) => setNuevo((n) => ({ ...n, nombre: e.target.value }))}
              className="viki-input"
              placeholder="Ej: Pana Gruesa"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Categoría</span>
            <select
              value={nuevo.categoria}
              onChange={(e) => setNuevo((n) => ({ ...n, categoria: e.target.value as CategoriaTela }))}
              className="viki-input"
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Descripción</span>
            <input
              value={nuevo.descripcion}
              onChange={(e) => setNuevo((n) => ({ ...n, descripcion: e.target.value }))}
              className="viki-input"
              placeholder="Textura, caída y para qué sirve"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">
              Usos frecuentes (separados por coma)
            </span>
            <input
              value={nuevo.usos}
              onChange={(e) => setNuevo((n) => ({ ...n, usos: e.target.value }))}
              className="viki-input"
              placeholder="Cojines, Cortinas de living"
            />
          </label>
          <div className="flex items-end gap-4">
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Color 1</span>
              <input
                type="color"
                value={nuevo.color1}
                onChange={(e) => setNuevo((n) => ({ ...n, color1: e.target.value }))}
                className="h-10 w-16 rounded-sm border border-emerald/20"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Color 2</span>
              <input
                type="color"
                value={nuevo.color2}
                onChange={(e) => setNuevo((n) => ({ ...n, color2: e.target.value }))}
                className="h-10 w-16 rounded-sm border border-emerald/20"
              />
            </label>
            <div
              className="h-10 flex-1 rounded-sm"
              style={{ backgroundImage: `linear-gradient(135deg, ${nuevo.color1}, ${nuevo.color2})` }}
            />
          </div>
        </div>
        <button
          onClick={agregarTela}
          className="mt-5 inline-flex items-center gap-2 rounded-sm bg-emerald px-4 py-2.5 text-[13px] font-semibold text-cream transition-colors hover:bg-emerald-deep"
        >
          <Plus size={15} className="text-gold" />
          Agregar tela
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {telas.map((t) => (
          <div key={t.id} className="flex flex-col gap-3 border border-emerald/15 bg-white p-4 sm:flex-row sm:items-center">
            <div className="h-14 w-14 shrink-0 rounded-sm" style={{ backgroundImage: t.swatch }} />
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              <input
                value={t.nombre}
                onChange={(e) => actualizarTela(t.id, { nombre: e.target.value })}
                className="viki-input"
              />
              <select
                value={t.categoria}
                onChange={(e) => actualizarTela(t.id, { categoria: e.target.value as CategoriaTela })}
                className="viki-input"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                value={t.descripcion}
                onChange={(e) => actualizarTela(t.id, { descripcion: e.target.value })}
                className="viki-input sm:col-span-2"
              />
              <input
                value={t.usos.join(', ')}
                onChange={(e) =>
                  actualizarTela(t.id, {
                    usos: e.target.value.split(',').map((u) => u.trim()).filter(Boolean),
                  })
                }
                className="viki-input sm:col-span-2"
              />
            </div>
            <button
              onClick={() => eliminarTela(t.id)}
              aria-label={`Eliminar ${t.nombre}`}
              className="grid h-9 w-9 shrink-0 place-items-center self-start rounded-sm text-charcoal/40 transition-colors hover:bg-red-50 hover:text-red-700 sm:self-center"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {telas.length === 0 && (
          <p className="py-8 text-center text-sm text-charcoal/50">No hay telas cargadas todavía.</p>
        )}
      </div>
    </div>
  )
}
