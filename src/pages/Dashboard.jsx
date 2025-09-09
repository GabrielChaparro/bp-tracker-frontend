import { useEffect, useMemo, useState } from 'react'
import api from '../api/client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function Dashboard() {
  const [summary,setSummary] = useState(null)
  const [measurements,setMeasurements] = useState([])

  useEffect(() => {
    (async () => {
      const s = await api.get('/me/stats/summary?days=30'); setSummary(s.data)
      const to = new Date().toISOString()
      const from = new Date(Date.now()-30*24*3600*1000).toISOString()
      const m = await api.get(`/me/measurements?from=${from}&to=${to}&size=200`)
      setMeasurements(m.data.content || [])
    })()
  }, [])

  const data = useMemo(() =>
    measurements.slice().reverse().map(m => ({
      date: new Date(m.takenAt).toLocaleDateString(),
      sys: m.systolic, dia: m.diastolic
    })), [measurements])

  const share = async () => {
    const { data } = await api.post('/me/reports/share')
    alert(`Link público (72h): ${location.origin}${data.url}`)
  }

  const exportCsv = async () => {
    const to = new Date().toISOString()
    const from = new Date(Date.now()-90*24*3600*1000).toISOString()
    const res = await api.get(`/me/export/csv?from=${from}&to=${to}`, { responseType: 'blob' })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a'); a.href = url; a.download = 'bp_export.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const exportPdf = async () => {
    const to = new Date().toISOString()
    const from = new Date(Date.now()-30*24*3600*1000).toISOString()
    const res = await api.get(`/me/export/pdf?from=${from}&to=${to}`, { responseType: 'blob' })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a'); a.href = url; a.download = 'bp_report.pdf'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-6">
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Resumen 30 días</h2>
        {!summary ? <p>Cargando...</p> : (
          <div className="flex gap-6 text-sm">
            <div>Promedio sistólica: <span className="font-semibold">{summary.avgSystolic?.toFixed?.(1) ?? '-'}</span></div>
            <div>Promedio diastólica: <span className="font-semibold">{summary.avgDiastolic?.toFixed?.(1) ?? '-'}</span></div>
            <div>Registros: <span className="font-semibold">{summary.count}</span></div>
            <div>Última clasificación: <span className="font-semibold">{summary.lastClassification ?? '-'}</span></div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Evolución</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sys" />
              <Line type="monotone" dataKey="dia" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={share} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Compartir reporte</button>
        <button onClick={exportCsv} className="bg-slate-200 px-4 py-2 rounded-lg">Export CSV</button>
        <button onClick={exportPdf} className="bg-slate-200 px-4 py-2 rounded-lg">Export PDF</button>
      </div>
    </div>
  )
}
