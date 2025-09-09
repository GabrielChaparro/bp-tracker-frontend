import { Link, Outlet } from 'react-router-dom'

export default function App() {
  const token = localStorage.getItem('token')
  const logout = () => { localStorage.removeItem('token'); location.href='/login' }
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto p-4 flex items-center gap-4">
          <Link to="/" className="font-semibold">BP Tracker</Link>
          {token && (
            <>
              <Link to="/" className="text-sm text-slate-600">Dashboard</Link>
              <Link to="/measurements" className="text-sm text-slate-600">Mediciones</Link>
              <button onClick={logout} className="ml-auto text-sm text-red-600">Salir</button>
            </>
          )}
          {!token && <div className="ml-auto flex gap-3">
            <Link to="/login" className="text-sm text-blue-600">Entrar</Link>
            <Link to="/register" className="text-sm text-slate-600">Registro</Link>
          </div>}
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <Outlet/>
      </main>
    </div>
  )
}
