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

    // Simula loading
    await new Promise(r => setTimeout(r, 800))
    setIsLoading(false)
    navigate("/home")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121214] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#dc2626]/5 rounded-full blur-[120px] animate-pulse-red" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#dc2626]/3 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dc2626]/20 to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4 animate-scale-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-down">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#b91c1c] flex items-center justify-center shadow-2xl shadow-[#dc2626]/30 animate-float">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -inset-2 bg-[#dc2626]/10 rounded-3xl blur-xl" />
          </div>
          <h1 className="text-3xl font-bold text-[#f0f0f2] tracking-tight">
            Crypto<span className="text-[#dc2626]">Finance</span>
          </h1>
          <p className="text-[#9999a5] text-sm mt-2">Acesse sua conta para continuar</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-8 shadow-2xl shadow-black/40 relative overflow-hidden">
          {/* Red top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" />

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#9999a5]">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9999a5] group-focus-within:text-[#dc2626] transition-colors duration-300" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-[#222228] border border-[#404048] rounded-xl pl-11 pr-4 py-3 text-[#f0f0f2] text-sm placeholder-[#666] focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#9999a5]">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9999a5] group-focus-within:text-[#dc2626] transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="w-full bg-[#222228] border border-[#404048] rounded-xl pl-11 pr-11 py-3 text-[#f0f0f2] text-sm placeholder-[#666] focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9999a5] hover:text-[#f0f0f2] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#dc2626]/10 border border-[#dc2626]/20 animate-fade-in-up">
                <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                <p className="text-[#ef4444] text-sm">{error}</p>
              </div>
            )}

            {/* Botao */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-[#dc2626]/25 hover:shadow-[#dc2626]/40 hover:from-[#ef4444] hover:to-[#dc2626] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Entrar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[#666] text-xs mt-6 animate-fade-in-up delay-500 fill-backwards">
          Plataforma segura de investimentos em criptomoedas
        </p>
      </div>
    </div>
  )
}

export default Login
