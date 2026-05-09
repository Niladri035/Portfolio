import { createRoot } from 'react-dom/client'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import './styles.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)
