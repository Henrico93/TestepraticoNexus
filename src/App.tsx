import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Conversao from "./pages/Conversao"
import Historico from "./pages/Historico"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conversao" element={<Conversao />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </div>
  )
}

export default App