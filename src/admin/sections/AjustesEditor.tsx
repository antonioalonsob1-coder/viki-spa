import { useState, type FormEvent } from 'react'
import { CheckCircle2, KeyRound } from 'lucide-react'

export default function AjustesEditor() {
  const [actual, setActual] = useState('')
  const [nueva, setNueva] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)
  const [enviando, setEnviando] = useState(false)

  async function cambiarPassword(e: FormEvent) {
    e.preventDefault()
    if (nueva.length < 4) {
      setMensaje({ tipo: 'error', texto: 'La nueva contraseña debe tener al menos 4 caracteres.' })
      return
    }
    if (nueva !== confirmar) {
      setMensaje({ tipo: 'error', texto: 'Las contraseñas nuevas no coinciden.' })
      return
    }

    setEnviando(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actual, nueva }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setMensaje({ tipo: 'error', texto: body.error ?? 'La contraseña actual no es correcta.' })
        return
      }
      setActual('')
      setNueva('')
      setConfirmar('')
      setMensaje({ tipo: 'ok', texto: 'Contraseña actualizada.' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="max-w-lg space-y-10">
      <div>
        <h2 className="font-display text-xl font-semibold text-emerald">Cambiar contraseña</h2>
        <p className="mt-1 text-[13px] text-charcoal/60">Esta contraseña protege el acceso a este panel.</p>

        <form onSubmit={cambiarPassword} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Contraseña actual</span>
            <input
              type="password"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              className="viki-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Contraseña nueva</span>
            <input
              type="password"
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
              className="viki-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Confirmar contraseña nueva</span>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              className="viki-input"
            />
          </label>

          {mensaje && (
            <p className={`flex items-center gap-1.5 text-[12.5px] ${mensaje.tipo === 'ok' ? 'text-emerald' : 'text-red-700'}`}>
              {mensaje.tipo === 'ok' && <CheckCircle2 size={15} />}
              {mensaje.texto}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="inline-flex items-center gap-2 rounded-sm bg-emerald px-5 py-2.5 text-[13px] font-semibold text-cream transition-colors hover:bg-emerald-deep disabled:opacity-60"
          >
            <KeyRound size={15} className="text-gold" />
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  )
}
