import { useAdminAuth } from '../hooks/useAdminAuth'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminApp() {
  const { authed, login, logout } = useAdminAuth()
  return authed ? <AdminDashboard onLogout={logout} /> : <AdminLogin onLogin={login} />
}
