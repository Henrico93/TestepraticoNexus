import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppProvider } from "./context/AppContext"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Usuarios from "./pages/Usuarios"
import Deposito from "./pages/Deposito"
import Saque from "./pages/Saque"
import Conversao from "./pages/Conversao"
import Login from "./pages/Login"

function LayoutComNavbar() {
  return (
    <div className="min-h-screen bg-[#121214]">
      <Navbar />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/deposito" element={<Deposito />} />
          <Route path="/saque" element={<Saque />} />
          <Route path="/conversao" element={<Conversao />} />

          {/* qualquer rota inválida vai para home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* sempre iniciar em login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* tela de login SEM navbar */}
          <Route path="/login" element={<Login />} />

          {/* todas as outras rotas usam layout */}
          <Route path="/*" element={<LayoutComNavbar />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App