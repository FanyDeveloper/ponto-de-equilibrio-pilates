import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Modalidades from './pages/Modalidades'
import ModalidadeDetalhe from './pages/ModalidadeDetalhe'
import PlanosHorarios from './pages/PlanosHorarios'
import Faq from './pages/Faq'
import Contato from './pages/Contato'
import Privacidade from './pages/Privacidade'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="modalidades" element={<Modalidades />} />
        <Route path="modalidades/:slug" element={<ModalidadeDetalhe />} />
        <Route path="planos-e-horarios" element={<PlanosHorarios />} />
        <Route path="perguntas-frequentes" element={<Faq />} />
        <Route path="contato" element={<Contato />} />
        {/* atalhos comuns */}
        <Route path="servicos" element={<Navigate to="/modalidades" replace />} />
        <Route path="agendamento" element={<Navigate to="/planos-e-horarios#agenda" replace />} />
        <Route path="politica-de-privacidade" element={<Privacidade />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
