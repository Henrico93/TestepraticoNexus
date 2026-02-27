import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Conversao from "./pages/Conversao"
import Historico from "./pages/Historico"
import Login from "./pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />

      <Route
        path="/conversao"
        element={
          <>
            <Navbar />
            <Conversao />
          </>
        }
      />

      <Route
        path="/historico"
        element={
          <>
            <Navbar />
            <Historico />
          </>
        }
      />
    </Routes>
  )
}

export default App