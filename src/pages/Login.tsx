import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TrendingUp, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !password) {
      setError("Preencha todos os campos.")
      return
    }

    if (!email.includes("@")) {
      setError("Email invalido.")
      return
    }

    setError("")
    setIsLoading(true)

    await new Promise(r => setTimeout(r, 800))

    const adminEmail = "UserAdminNexus@gmail.com"
    const adminPassword = "admin123"

    if (email === adminEmail && password === adminPassword) {
      const adminUser = {
        nome: "Administrador",
        email: adminEmail,
        role: "ADMIN"
      }

      localStorage.setItem("auth", JSON.stringify(adminUser))
      setIsLoading(false)
      navigate("/home")
    } else {
      setIsLoading(false)
      setError("Credenciais inválidas.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121214] relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#b91c1c] flex items-center justify-center shadow-2xl shadow-[#dc2626]/30">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#f0f0f2] tracking-tight mt-4">
            Crypto<span className="text-[#dc2626]">Finance</span>
          </h1>
          <p className="text-[#9999a5] text-sm mt-2">Acesse sua conta</p>
        </div>

        <div className="bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-8 shadow-2xl shadow-black/40">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#9999a5]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9999a5]" />
                <input
                  type="email"
                  className="w-full bg-[#222228] border border-[#404048] rounded-xl pl-10 pr-4 py-3 text-[#f0f0f2] text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#9999a5]">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9999a5]" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-[#222228] border border-[#404048] rounded-xl pl-10 pr-10 py-3 text-[#f0f0f2] text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9999a5]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white py-3 rounded-xl font-semibold"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login