import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RoutesPortfolio from './routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesPortfolio />
  </StrictMode>,
)
