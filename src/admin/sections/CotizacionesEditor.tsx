import { useCotizaciones } from '../../hooks/useCotizaciones'

const TIPO_LABEL: Record<string, string> = {
  HOGAR: 'Hogar',
  COLEGIO_LICENCIATURA: 'Colegio / Licenciatura',
}

function formatFecha(iso: string): string {
  try {
    return new Date(iso).toLocaleString('es-CL', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

export default function CotizacionesEditor() {
  const { cotizaciones, loading, error } = useCotizaciones()

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-emerald">Cotizaciones recibidas</h2>
      <p className="mt-1 text-[13px] text-charcoal/60">
        Cada envío del formulario público queda registrado aquí, además de abrir WhatsApp.
      </p>

      {loading && <p className="mt-8 text-center text-sm text-charcoal/50">Cargando…</p>}
      {error && (
        <p className="mt-8 text-center text-sm text-red-700">No se pudieron cargar las cotizaciones.</p>
      )}

      {!loading && !error && cotizaciones.length === 0 && (
        <p className="mt-8 text-center text-sm text-charcoal/50">Todavía no se ha recibido ninguna cotización.</p>
      )}

      {!loading && cotizaciones.length > 0 && (
        <div className="mt-7 space-y-3">
          {cotizaciones.map((c) => (
            <div key={c.id} className="border border-emerald/15 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-emerald">{c.nombre}</p>
                <span className="rounded-full bg-cream-alt px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gold-deep">
                  {c.estado}
                </span>
              </div>
              <p className="mt-1 text-[13px] text-charcoal/70">{c.contacto}</p>
              <p className="mt-2 text-[12.5px] text-charcoal/60">
                <span className="font-medium text-charcoal/80">{TIPO_LABEL[c.tipoServicio] ?? c.tipoServicio}</span>
                {c.espacioOProducto && ` · ${c.espacioOProducto}`}
                {c.colegioONivel && ` · ${c.colegioONivel}`}
                {c.fechaCeremonia && ` · Fecha ceremonia: ${c.fechaCeremonia}`}
              </p>
              {c.mensaje && <p className="mt-2 text-[13px] text-charcoal/75">{c.mensaje}</p>}
              <p className="mt-2 text-[11.5px] text-charcoal/40">{formatFecha(c.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
