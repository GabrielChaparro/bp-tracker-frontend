import { useState } from 'react'
import api from '../api/client'

export default function Register() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [fullName,setFullName] = useState('')
  const [err,setErr] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/register', { email, password, fullName })
      localStorage.setItem('token', data.token)
      location.href = '/'
    } catch (e) {
      setErr('No se pudo registrar')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-2xl">
      <h1 className="text-xl font-semibold mb-4">Registro</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="border rounded p-2" placeholder="Nombre" value={fullName} onChange={e=>setFullName(e.target.value)}/>
        <input className="border rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="border rounded p-2" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="bg-blue-600 text-white rounded p-2">Crear cuenta</button>
      </form>
    </div>
  )
}
