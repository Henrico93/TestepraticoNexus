import { useScrollReveal } from "../hooks/useScrollReveal"
import { TrendingUp, TrendingDown, Users, DollarSign, ArrowDownToLine, ArrowUpFromLine, Wallet, Activity } from "lucide-react"

export default function Home() {
  const indicadores = {
    totalDepositado: 15420.75,
    totalSacado: 8320.4,
    usuariosAtivos: 128,
    volumeBRL: 45200.9,
  }

  const movimentacoes = [
    { id: 1, tipo: "Deposito", valor: 1200, ativo: "BRL" },
    { id: 2, tipo: "Saque", valor: 0.02, ativo: "BTC" },
    { id: 3, tipo: "Deposito", valor: 350, ativo: "BRL" },
    { id: 4, tipo: "Saque", valor: 1.5, ativo: "ETH" },
    { id: 5, tipo: "Deposito", valor: 2000, ativo: "BRL" },
  ]

  const saldos = [
    { ativo: "BRL", valor: 12450.9, icon: DollarSign, variacao: "+5.2%" },
    { ativo: "BTC", valor: 0.45, icon: TrendingUp, variacao: "+2.8%" },
    { ativo: "ETH", valor: 3.2, icon: Activity, variacao: "-1.4%" },
    { ativo: "USDT", valor: 5200, icon: Wallet, variacao: "+0.1%" },
  ]

  const cards = [
    { label: "Total Depositado", value: `R$ ${indicadores.totalDepositado.toFixed(2)}`, icon: ArrowDownToLine, color: "text-[#22c55e]" },
    { label: "Total Sacado", value: `R$ ${indicadores.totalSacado.toFixed(2)}`, icon: ArrowUpFromLine, color: "text-[#ef4444]" },
    { label: "Usuarios Ativos", value: indicadores.usuariosAtivos.toString(), icon: Users, color: "text-[#3b82f6]" },
    { label: "Volume em BRL", value: `R$ ${indicadores.volumeBRL.toFixed(2)}`, icon: DollarSign, color: "text-[#f59e0b]" },
  ]

  const movSection = useScrollReveal()
  const saldoSection = useScrollReveal()

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-down">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f2] tracking-tight">
          Resumo <span className="text-[#dc2626]">Geral</span>
        </h1>
        <p className="text-[#9999a5] mt-2 text-sm">Acompanhe os principais indicadores da plataforma</p>
      </div>

      {/* Cards Indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className="group relative bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-5 hover:border-[#dc2626]/30 hover:shadow-lg hover:shadow-[#dc2626]/5 transition-all duration-500 cursor-default animate-fade-in-up fill-backwards overflow-hidden"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {/* Shimmer */}
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-[#9999a5] uppercase tracking-wider">{card.label}</p>
                <div className={`w-8 h-8 rounded-lg bg-[#222228] flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#f0f0f2] animate-count-up" style={{ animationDelay: `${i * 120 + 300}ms` }}>
                {card.value}
              </h3>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#dc2626]/0 to-transparent group-hover:via-[#dc2626]/40 transition-all duration-500" />
          </div>
        ))}
      </div>

      {/* Movimentacoes */}
      <div
        ref={movSection.ref}
        className={`bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-6 mb-8 transition-all duration-700 ${
          movSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-[#dc2626]/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#dc2626]" />
          </div>
          <h2 className="text-lg font-bold text-[#f0f0f2]">Ultimas Movimentacoes</h2>
        </div>

        <div className="flex flex-col gap-2">
          {movimentacoes.map((mov, i) => (
            <div
              key={mov.id}
              className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#222228] transition-all duration-300"
              style={{
                animation: movSection.isVisible ? `fadeInLeft 0.5s ease-out ${i * 80}ms both` : "none"
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  mov.tipo === "Deposito"
                    ? "bg-[#22c55e]/10 text-[#22c55e]"
                    : "bg-[#ef4444]/10 text-[#ef4444]"
                }`}>
                  {mov.tipo === "Deposito" ? (
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpFromLine className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm font-medium text-[#f0f0f2]">{mov.tipo}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${
                  mov.tipo === "Deposito" ? "text-[#22c55e]" : "text-[#ef4444]"
                }`}>
                  {mov.tipo === "Deposito" ? "+" : "-"}{mov.valor}
                </span>
                <span className="text-xs text-[#9999a5] bg-[#2a2a30] px-2 py-0.5 rounded-md font-mono">
                  {mov.ativo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saldos */}
      <div
        ref={saldoSection.ref}
        className={`bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-6 transition-all duration-700 ${
          saldoSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-[#dc2626]/10 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-[#dc2626]" />
          </div>
          <h2 className="text-lg font-bold text-[#f0f0f2]">Saldos por Ativo</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {saldos.map((saldo, i) => (
            <div
              key={i}
              className="group relative bg-[#222228] border border-[#333338]/40 rounded-xl p-4 text-center hover:border-[#dc2626]/30 hover:shadow-lg hover:shadow-[#dc2626]/5 transition-all duration-500 hover:-translate-y-1"
              style={{
                animation: saldoSection.isVisible ? `scaleIn 0.5s ease-out ${i * 100}ms both` : "none"
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#2a2a30] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#dc2626]/10 transition-colors duration-300">
                <saldo.icon className="w-5 h-5 text-[#9999a5] group-hover:text-[#dc2626] transition-colors duration-300" />
              </div>
              <p className="text-xs font-mono text-[#9999a5] mb-1">{saldo.ativo}</p>
              <h3 className="text-lg font-bold text-[#f0f0f2]">{saldo.valor}</h3>
              <span className={`text-xs font-medium mt-1 inline-block ${
                saldo.variacao.startsWith("+") ? "text-[#22c55e]" : "text-[#ef4444]"
              }`}>
                {saldo.variacao.startsWith("+") ? (
                  <TrendingUp className="w-3 h-3 inline mr-0.5" />
                ) : (
                  <TrendingDown className="w-3 h-3 inline mr-0.5" />
                )}
                {saldo.variacao}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
