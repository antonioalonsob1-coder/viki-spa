import { useState, type FormEvent } from 'react'
import { CheckCircle2, KeyRound, RotateCcw } from 'lucide-react'
import { useAdminPassword } from '../../hooks/useAdminAuth'

export default function AjustesEditor() {
  const [, setPassword] = useAdminPassword()

  const [actual, setActual] = useState('')
  const [nueva, setNueva] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)

  const [currentPassword] = useAdminPassword()

  function cambiarPassword(e: FormEvent) {
    e.preventDefault()
    if (actual !== currentPassword) {
      setMensaje({ tipo: 'error', texto: 'La contraseña actual no es correcta.' })
      return
    }
    if (nueva.length < 4) {
      setMensaje({ tipo: 'error', texto: 'La nueva contraseña debe tener al menos 4 caracteres.' })
      return
    }
    if (nueva !== confirmar) {
      setMensaje({ tipo: 'error', texto: 'Las contraseñas nuevas no coinciden.' })
      return
    }
    setPassword(nueva)
    setActual('')
    setNueva('')
    setConfirmar('')
    setMensaje({ tipo: 'ok', texto: 'Contraseña actualizada.' })
  }

  function restablecerContenido() {
    const confirmado = window.confirm(
      'Esto borra tus cambios de contacto, telas y testimonios en este navegador y vuelve a los valores originales del sitio. Las fotos subidas a la galería no se ven afectadas. ¿Continuar?',
    )
    if (!confirmado) return
    localStorage.removeItem('viki-admin-contacto')
    localStorage.removeItem('viki-admin-telas')
    localStorage.removeItem('viki-admin-testimonios')
    window.location.reload()
  }

  return (
    <div className="max-w-lg space-y-10">
      <div>
        <h2 className="font-display text-xl font-semibold text-emerald">Cambiar contraseña</h2>
        <p className="mt-1 text-[13px] text-charcoal/60">
          Esta contraseña protege el acceso a este panel en este navegador.
        </p>

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
            className="inline-flex items-center gap-2 rounded-sm bg-emerald px-5 py-2.5 text-[13px] font-semibold text-cream transition-colors hover:bg-emerald-deep"
          >
            <KeyRound size={15} className="text-gold" />
            Actualizar contraseña
          </button>
        </form>
      </div>

      <div className="border-t border-gold/20 pt-8">
        <h2 className="font-display text-xl font-semibold text-emerald">Restablecer contenido</h2>
        <p className="mt-1 text-[13px] text-charcoal/60">
          Vuelve el contacto, el muestrario de telas y los testimonios a los valores originales del
          sitio en este navegador.
        </p>
        <button
          onClick={restablecerContenido}
          className="mt-5 inline-flex items-center gap-2 rounded-sm border border-red-700/30 px-5 py-2.5 text-[13px] font-semibold text-red-700 transition-colors hover:bg-red-50"
        >
          <RotateCcw size={15} />
          Restablecer a valores originales
        </button>
      </div>
    </div>
  )
}
