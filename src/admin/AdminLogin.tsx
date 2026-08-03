import { useState, type FormEvent } from 'react'
import { Lock } from 'lucide-react'
import Logo from '../components/Logo'

export default function AdminLogin({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = onLogin(password)
    setError(!ok)
  }

  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6">
      <form onSubmit={handleSubmit} className="swatch-card w-full max-w-sm p-8">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <p className="font-display text-lg font-semibold text-emerald">Panel administrador</p>
            <p className="text-[12px] text-charcoal/55">Viki SpA</p>
          </div>
        </div>

        <label className="mt-7 block">
          <span className="mb-1.5 block text-[12.5px] font-medium text-charcoal/70">Contraseña</span>
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-deep" />
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              className="viki-input pl-9"
              placeholder="Ingresa la contraseña"
            />
          </div>
        </label>

        {error && (
          <p className="mt-2 text-[12.5px] text-red-700">Contraseña incorrecta. Inténtalo de nuevo.</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-sm bg-emerald px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-emerald-deep"
        >
          Entrar
        </button>

        <p className="mt-5 text-center text-[11.5px] text-charcoal/45">
          Acceso solo para el equipo de Viki SpA
        </p>
      </form>
    </div>
  )
}
