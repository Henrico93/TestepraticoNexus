import { useState } from "react"
import { useApp } from "../context/AppContext"
import type { Ativo } from "../types"
import { ArrowDownToLine, User, Coins, FileText, CheckCircle, AlertCircle, Wallet } from "lucide-react"

export default function Deposito() {
  const { usuarios, realizarDeposito } = useApp()

  const [usuarioId, setUsuarioId] = useState<number | "">("")
  const [ativo, setAtivo] = useState<Ativo>("BRL")
  const [valor, setValor] = useState("")
  const [observacao, setObservacao] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [sucesso, setSucesso] = useState(false)

  const handleDeposito = () => {
    if (!usuarioId || Number(valor) <= 0) {
      setMensagem("Preencha corretamente os campos.")
      setSucesso(false)
      return
    }

    realizarDeposito(usuarioId, ativo, Number(valor), observacao)

    setMensagem("Deposito realizado com sucesso!")
    setSucesso(true)
    setValor("")
    setObservacao("")

    setTimeout(() => setMensagem(""), 4000)
  }

  const usuarioSelecionado = usuarios.find((u) => u.id === usuarioId)

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-down">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
            <ArrowDownToLine className="w-5 h-5 text-[#22c55e]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f2] tracking-tight">
            Deposito
          </h1>
        </div>
        <p className="text-[#9999a5] text-sm ml-[52px]">Realize depositos nas contas dos usuarios</p>
      </div>

      {/* Form Card */}
      <div className="bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden animate-fade-in-up delay-200 fill-backwards">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#22c55e]/50 to-transparent" />

        <div className="flex flex-col gap-5">
          {/* Usuario */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9999a5] flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Usuario
            </label>
            <select
              value={usuarioId}
              onChange={(e) => setUsuarioId(Number(e.target.value))}
              className="w-full bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-[#f0f0f2] text-sm focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300 cursor-pointer appearance-none"
            >
              <option value="">Selecione o usuario</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

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
              placeholder="0.00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-[#f0f0f2] text-sm font-mono placeholder-[#666] focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300"
            />
          </div>

          {/* Observacao */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9999a5] flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Observacao (opcional)
            </label>
            <input
              type="text"
              placeholder="Adicione uma nota..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-[#f0f0f2] text-sm placeholder-[#666] focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300"
            />
          </div>

          {/* Botao */}
          <button
            onClick={handleDeposito}
            className="group relative w-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-[#22c55e]/20 hover:shadow-[#22c55e]/35 active:scale-[0.98] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowDownToLine className="w-4 h-4" />
              Confirmar Deposito
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
        </div>
      </div>

      {/* Saldos do usuario */}
      {usuarioSelecionado && (
        <div className="mt-6 bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-6 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#dc2626]/10 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-[#dc2626]" />
            </div>
            <h2 className="font-bold text-[#f0f0f2]">Saldos de {usuarioSelecionado.nome}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(usuarioSelecionado.saldos).map(([ativoKey, valorSaldo], i) => (
              <div
                key={ativoKey}
                className="bg-[#222228] border border-[#333338]/40 rounded-xl p-3 text-center hover:border-[#dc2626]/30 transition-all duration-300"
                style={{ animation: `scaleIn 0.4s ease-out ${i * 80}ms both` }}
              >
                <p className="text-xs font-mono text-[#9999a5] mb-1">{ativoKey}</p>
                <p className="text-sm font-bold text-[#f0f0f2]">{valorSaldo as number}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
