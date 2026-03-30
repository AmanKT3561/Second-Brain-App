import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios'

// Bug fix: token must be sent as "Bearer <token>", not raw token
const token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

// keep axios header in sync if token changes in another tab
window.addEventListener('storage', (e) => {
  if (e.key === 'token') {
    const newToken = e.newValue
    if (newToken) axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    else delete axios.defaults.headers.common['Authorization']
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
