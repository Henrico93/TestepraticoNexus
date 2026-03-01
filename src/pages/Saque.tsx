import { useState, useMemo } from "react"
import { useApp } from "../context/AppContext"
import type { Ativo } from "../types"
import { ArrowUpFromLine, User, Coins, CheckCircle, AlertCircle, Wallet } from "lucide-react"

export default function Saque() {
  const { usuarios, realizarSaque } = useApp()

  const [usuarioId, setUsuarioId] = useState<number>(0)
  const [ativo, setAtivo] = useState<Ativo>("BRL")
  const [valor, setValor] = useState<number>(0)
  const [mensagem, setMensagem] = useState<string>("")
  const [sucesso, setSucesso] = useState(false)

  const usuarioSelecionado = useMemo(
    () => usuarios.find((u) => u.id === usuarioId),
    [usuarioId, usuarios]
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const resultado = realizarSaque(usuarioId, ativo, valor)
    setMensagem(resultado.mensagem)
    setSucesso(resultado.sucesso)

    if (resultado.sucesso) {
      setValor(0)
      setTimeout(() => setMensagem(""), 4000)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-down">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#ef4444]/10 flex items-center justify-center">
            <ArrowUpFromLine className="w-5 h-5 text-[#ef4444]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f2] tracking-tight">
            Saque
          </h1>
        </div>
        <p className="text-[#9999a5] text-sm ml-[52px]">Realize saques das contas dos usuarios</p>
      </div>

      {/* Form Card */}
      <div className="bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden animate-fade-in-up delay-200 fill-backwards">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ef4444]/50 to-transparent" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Usuario */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9999a5] flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Usuario
            </label>
            <select
              value={usuarioId}
              onChange={(e) => setUsuarioId(Number(e.target.value))}
              required
              className="w-full bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-[#f0f0f2] text-sm focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300 cursor-pointer appearance-none"
            >
              <option value={0}>Selecione</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Saldos */}
          {usuarioSelecionado && (
            <div className="bg-[#222228] border border-[#333338]/40 rounded-xl p-4 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-4 h-4 text-[#dc2626]" />
                <span className="text-sm font-bold text-[#f0f0f2]">Saldos Disponiveis</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["BRL", "BTC", "ETH", "USDT"] as Ativo[]).map((a, i) => (
                  <div
                    key={a}
                    className={`bg-[#2a2a30] rounded-lg p-2.5 text-center border transition-all duration-300 ${
                      ativo === a ? "border-[#dc2626]/40 bg-[#dc2626]/5" : "border-transparent"
                    }`}
                    style={{ animation: `scaleIn 0.3s ease-out ${i * 60}ms both` }}
                  >
                    <p className="text-[10px] font-mono text-[#9999a5]">{a}</p>
                    <p className="text-xs font-bold text-[#f0f0f2]">{usuarioSelecionado.saldos[a]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ativo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9999a5] flex items-center gap-2">
              <Coins className="w-3.5 h-3.5" />
              Ativo
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["BRL", "BTC", "ETH", "USDT"] as Ativo[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAtivo(a)}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                    ativo === a
                      ? "bg-[#dc2626]/10 border-[#dc2626]/40 text-[#dc2626] shadow-[0_0_12px_rgba(220,38,38,0.1)]"
                      : "bg-[#222228] border-[#404048] text-[#9999a5] hover:text-[#f0f0f2] hover:border-[#9999a5]/40"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Valor */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9999a5]">Valor</label>
            <input
              type="number"
              value={valor || ""}
              onChange={(e) => setValor(Number(e.target.value))}
              placeholder="0.00"
              required
              className="w-full bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-[#f0f0f2] text-sm font-mono placeholder-[#666] focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300"
            />
          </div>

          {/* Botao */}
          <button
            type="submit"
            className="group relative w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-[#dc2626]/20 hover:shadow-[#dc2626]/35 hover:from-[#ef4444] hover:to-[#dc2626] active:scale-[0.98] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowUpFromLine className="w-4 h-4" />
              Confirmar Saque
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          {/* Mensagem */}
          {mensagem && (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border animate-fade-in-up ${
              sucesso
                ? "bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e]"
                : "bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444]"
            }`}>
              {sucesso ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <p className="text-sm font-medium">{mensagem}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
