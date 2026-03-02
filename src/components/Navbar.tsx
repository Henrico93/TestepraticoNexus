import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  Menu,
  X,
  TrendingUp,
  Home,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCcw,
  LogOut,
} from "lucide-react"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-[#dc2626]/10 text-[#ef4444] shadow-[inset_0_0_0_1px_rgba(220,38,38,0.3)]"
        : "text-[#9999a5] hover:text-[#f0f0f2] hover:bg-[#2a2a30]"
    }`

  const navItems = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/usuarios", label: "Usuarios", icon: Users },
    { to: "/deposito", label: "Deposito", icon: ArrowDownToLine },
    { to: "/saque", label: "Saque", icon: ArrowUpFromLine },
    { to: "/conversao", label: "Conversao", icon: RefreshCcw },
  ]

  const handleLogout = () => {
    localStorage.removeItem("auth") // ajuste se sua chave for diferente
    navigate("/login")
    setOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-fade-in-down ${
        scrolled
          ? "bg-[#121214]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-[#333338]/50"
          : "bg-[#121214]/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#dc2626] to-[#b91c1c] flex items-center justify-center shadow-lg shadow-[#dc2626]/20 group-hover:shadow-[#dc2626]/40 transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-[#dc2626]/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-lg font-bold text-[#f0f0f2] tracking-tight">
              Crypto<span className="text-[#dc2626]">Finance</span>
            </span>
          </NavLink>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}

            {/* BOTÃO LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#9999a5] hover:text-[#f87171] hover:bg-[#2a2a30] transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Botao Mobile */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#222228] border border-[#333338] text-[#9999a5] hover:text-[#f0f0f2] hover:border-[#dc2626]/50 transition-all duration-300"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <div className={`transition-all duration-300 ${open ? "rotate-90 scale-110" : ""}`}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </div>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 bg-[#1a1a1e]/95 backdrop-blur-xl border-t border-[#333338]/50 flex flex-col gap-1">
          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              onClick={() => setOpen(false)}
              style={{
                animationDelay: `${i * 60}ms`,
                animation: open ? `fadeInLeft 0.4s ease-out ${i * 60}ms both` : "none",
              }}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}

          {/* LOGOUT MOBILE */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#9999a5] hover:text-[#f87171] hover:bg-[#2a2a30] transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar