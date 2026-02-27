import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-indigo-600">
        CryptoFinance
      </h1>

      <div className="flex gap-6 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-indigo-600" : "text-gray-600"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/conversao"
          className={({ isActive }) =>
            isActive ? "text-indigo-600" : "text-gray-600"
          }
        >
          Conversão
        </NavLink>

        <NavLink
          to="/historico"
          className={({ isActive }) =>
            isActive ? "text-indigo-600" : "text-gray-600"
          }
        >
          Histórico
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar