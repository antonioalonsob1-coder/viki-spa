import { useAdminAuth } from '../hooks/useAdminAuth'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminApp() {
  const { authed, login, logout } = useAdminAuth()

  if (authed === null) {
    return <div className="grid min-h-screen place-items-center bg-cream text-charcoal/50">Cargando…</div>
  }

  return authed ? <AdminDashboard onLogout={logout} /> : <AdminLogin onLogin={login} />
}
