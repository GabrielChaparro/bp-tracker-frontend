import { useState } from 'react'
import api from '../api/client'

export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      location.href = '/'
    } catch (e) {
      setErr('Credenciales inválidas')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-2xl">
      <h1 className="text-xl font-semibold mb-4">Entrar</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="border rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="border rounded p-2" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="bg-blue-600 text-white rounded p-2">Entrar</button>
      </form>
    </div>
  )
}
