import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Usuarios from "./pages/Usuarios"
import Deposito from "./pages/Deposito"
import Saque from "./pages/Saque"
import Conversao from "./pages/Conversao"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/home" element={<Layout><Home /></Layout>} />
      <Route path="/usuarios" element={<Layout><Usuarios /></Layout>} />
      <Route path="/deposito" element={<Layout><Deposito /></Layout>} />
      <Route path="/saque" element={<Layout><Saque /></Layout>} />
      <Route path="/conversao" element={<Layout><Conversao /></Layout>} />
    </Routes>
  )
}

export default App