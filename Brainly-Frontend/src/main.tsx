import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios'

// initialize axios Authorization header from stored token (if any)
const token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = token

// keep axios header in sync if token changes in another tab
window.addEventListener('storage', (e) => {
  if (e.key === 'token') {
    const newToken = e.newValue
    if (newToken) axios.defaults.headers.common['Authorization'] = newToken
    else delete axios.defaults.headers.common['Authorization']
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
