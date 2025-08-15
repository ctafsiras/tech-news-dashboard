import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import App from './App.tsx'

// Initialize color mode before render to reduce FOUC
try {
  const preferred = (localStorage.getItem('color-mode') as 'light' | 'dark') || 'light'
  document.documentElement.setAttribute('data-bs-theme', preferred)
} catch {
  // Ignore errors accessing localStorage (e.g., disabled or unavailable)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
