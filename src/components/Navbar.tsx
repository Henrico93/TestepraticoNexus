import { NavLink } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-indigo-600" : "text-gray-700"

  return (
    <nav className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">CryptoFinance</h1>

        {/* Botão Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6 text-sm">
          <NavLink to="/home" className={linkClass}>Home</NavLink>
          <NavLink to="/usuarios" className={linkClass}>Usuários</NavLink>
          <NavLink to="/deposito" className={linkClass}>Depósito</NavLink>
          <NavLink to="/saque" className={linkClass}>Saque</NavLink>
          <NavLink to="/conversao" className={linkClass}>Conversão</NavLink>
        </div>
      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="flex flex-col gap-3 mt-4 md:hidden text-sm">
          <NavLink to="/home" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/usuarios" className={linkClass} onClick={() => setOpen(false)}>Usuários</NavLink>
          <NavLink to="/deposito" className={linkClass} onClick={() => setOpen(false)}>Depósito</NavLink>
          <NavLink to="/saque" className={linkClass} onClick={() => setOpen(false)}>Saque</NavLink>
          <NavLink to="/conversao" className={linkClass} onClick={() => setOpen(false)}>Conversão</NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar