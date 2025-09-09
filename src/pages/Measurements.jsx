import { useEffect, useState } from 'react'
import api from '../api/client'

export default function Measurements() {
  const [items,setItems] = useState([])
  const [form,setForm] = useState({ systolic:'', diastolic:'', pulse:'', takenAt:'', tag:'', note:'' })

  const load = async () => {
    const to = new Date().toISOString()
    const from = new Date(Date.now()-30*24*3600*1000).toISOString()
    const res = await api.get(`/me/measurements?from=${from}&to=${to}&size=100`)
    setItems(res.data.content || [])
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      systolic: Number(form.systolic),
      diastolic: Number(form.diastolic),
      pulse: form.pulse ? Number(form.pulse) : null,
      takenAt: form.takenAt || new Date().toISOString(),
      tag: form.tag || null,
      note: form.note || null
    }
    await api.post('/me/measurements', payload)
    setForm({ systolic:'', diastolic:'', pulse:'', takenAt:'', tag:'', note:'' })
    load()
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={submit} className="bg-white p-4 rounded-2xl shadow grid gap-3 md:grid-cols-6">
        <input className="border rounded p-2 md:col-span-1" placeholder="Sistólica" value={form.systolic} onChange={e=>setForm({...form,systolic:e.target.value})}/>
        <input className="border rounded p-2 md:col-span-1" placeholder="Diastólica" value={form.diastolic} onChange={e=>setForm({...form,diastolic:e.target.value})}/>
        <input className="border rounded p-2 md:col-span-1" placeholder="Pulso" value={form.pulse} onChange={e=>setForm({...form,pulse:e.target.value})}/>
        <input className="border rounded p-2 md:col-span-2" placeholder="Fecha ISO (opcional)" value={form.takenAt} onChange={e=>setForm({...form,takenAt:e.target.value})}/>
        <input className="border rounded p-2 md:col-span-1" placeholder="Etiqueta" value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})}/>
        <input className="border rounded p-2 md:col-span-6" placeholder="Nota" value={form.note} onChange={e=>setForm({...form,note:e.target.value})}/>
        <div className="md:col-span-6">
          <button className="bg-blue-600 text-white rounded px-4 py-2">Guardar</button>
        </div>
      </form>

      <div className="bg-white p-4 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left">
            <th className="p-2">Fecha</th><th className="p-2">Sys</th><th className="p-2">Dia</th><th className="p-2">Pulso</th><th className="p-2">Etiqueta</th><th className="p-2">Nota</th><th className="p-2">Clasificación</th>
          </tr></thead>
          <tbody>
          {items.map(m => (
            <tr key={m.id} className="border-t">
              <td className="p-2">{new Date(m.takenAt).toLocaleString()}</td>
              <td className="p-2">{m.systolic}</td>
              <td className="p-2">{m.diastolic}</td>
              <td className="p-2">{m.pulse ?? '-'}</td>
              <td className="p-2">{m.tag ?? ''}</td>
              <td className="p-2">{m.note ?? ''}</td>
              <td className="p-2">{m.classification}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
