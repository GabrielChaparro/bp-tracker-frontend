# BP Tracker — Frontend

React + Vite + Tailwind + Recharts

## ✨ Features
- Registro/Login (JWT en `localStorage`).
- Dashboard con resumen y gráfico Sys/Dia.
- Alta y listado de mediciones.
- Compartir reporte y export CSV/PDF.
- Manejo de 401 (redirige a /login).
- SPA con rewrites para producción.

## 📦 Estructura
```
src/
  api/client.js
  components/ProtectedRoute.jsx
  pages/
    Login.jsx
    Register.jsx
    Dashboard.jsx
    Measurements.jsx
  App.jsx
  main.jsx
  index.css
```

## ⚙️ Variables
`.env` (dev) y `.env.production` (prod):
```
VITE_API_BASE_URL=http://localhost:8080           # dev
# VITE_API_BASE_URL=https://tu-api.onrender.com   # prod
```

## 🏃 Scripts
```bash
npm i
npm run dev       # http://localhost:5173
npm run build     # genera /dist
npm run preview
```

## 🔗 Rewrites (SPA)
### Vercel
`vercel.json` en la raíz:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify
`public/_redirects`:
```
/* /index.html 200
```

## ☁️ Deploy (Vercel)
1) Importa repo.
2) Env var **Production**: `VITE_API_BASE_URL=https://tu-api.onrender.com`
3) Build: `npm run build` · Output: `dist`
4) Deploy → `https://tu-frontend.vercel.app`

## 🔒 CORS (backend)
En el backend:  
`APP_CORS_ALLOWEDORIGINS=https://tu-frontend.vercel.app,http://localhost:5173`

## 🧪 Flujo de prueba
1) Registro → Login
2) Crear medición → ver en Measurements
3) Dashboard (resumen + gráfico)
4) Export CSV/PDF
5) Compartir reporte

## 🐞 Troubleshooting
- 404 al refrescar `/login`: faltan rewrites.
- CORS en navegador: añade el dominio del front en `APP_CORS_ALLOWEDORIGINS`.
- 401: revisa URL de API y token en `localStorage`.
- Descargas: asegurarse `responseType: 'blob'` (ya incluído).
