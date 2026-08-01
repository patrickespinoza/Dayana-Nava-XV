import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Portada from './portada'
import PaginaPrincipal from './PaginaPrincipal'
import Generador from './pages/Generador'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Invitación */}
      <Route path="/" element={
        <>
          <Portada />
          <PaginaPrincipal />
        </>
      } />

      {/* Generador */}
      <Route path="/generador" element={<Generador />} />
    </Routes>
  </BrowserRouter>
)