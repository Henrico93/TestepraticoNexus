import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Usuarios from "./pages/Usuarios"
import Deposito from "./pages/Deposito"
import Saque from "./pages/Saque"
import Conversao from "./pages/Conversao"
import Login from "./pages/Login"

function AppLayout() {
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
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
