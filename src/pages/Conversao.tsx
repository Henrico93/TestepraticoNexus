import { useState } from "react"
import { RefreshCcw, ArrowRight, Loader2, AlertCircle, TrendingUp } from "lucide-react"

type Moeda = {
  id: string
  nome: string
}

const moedas: Moeda[] = [
  { id: "bitcoin", nome: "Bitcoin" },
  { id: "ethereum", nome: "Ethereum" },
  { id: "tether", nome: "Tether" },
  { id: "solana", nome: "Solana" },
  { id: "usd", nome: "Dolar (USD)" },
  { id: "brl", nome: "Real (BRL)" },
]

export default function Conversao() {
  const [moedaOrigem, setMoedaOrigem] = useState("bitcoin")
  const [moedaDestino, setMoedaDestino] = useState("usd")
  const [valor, setValor] = useState("")
  const [resultado, setResultado] = useState<number | null>(null)
  const [cotacao, setCotacao] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")

  const converter = async () => {
    if (!valor || Number(valor) <= 0) {
      setErro("Digite um valor valido.")
      return
    }

    setLoading(true)
    setErro("")
    setResultado(null)

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${moedaOrigem}&vs_currencies=${moedaDestino}`
      )

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API.")
      }

      const data = await response.json()

      const taxa = data[moedaOrigem]?.[moedaDestino]

      if (!taxa) {
        throw new Error("Nao foi possivel obter a cotacao.")
      }

      const valorConvertido = Number(valor) * taxa

      setCotacao(taxa)
      setResultado(valorConvertido)
    } catch (error: any) {
      setErro(error.message || "Erro inesperado.")
    } finally {
      setLoading(false)
    }
  }

  const getNomeMoeda = (id: string) => moedas.find(m => m.id === id)?.nome || id

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-down">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#dc2626]/10 flex items-center justify-center">
            <RefreshCcw className="w-5 h-5 text-[#dc2626]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f2] tracking-tight">
            Conversao
          </h1>
        </div>
        <p className="text-[#9999a5] text-sm ml-[52px]">Converta entre criptomoedas em tempo real</p>
      </div>

      {/* Form Card */}
      <div className="bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden animate-fade-in-up delay-200 fill-backwards">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#dc2626]/50 to-transparent" />

        <div className="flex flex-col gap-5">
          {/* Moeda Origem */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9999a5]">Moeda de origem</label>
            <select
              value={moedaOrigem}
              onChange={(e) => setMoedaOrigem(e.target.value)}
              className="w-full bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-[#f0f0f2] text-sm focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300 cursor-pointer appearance-none"
            >
              {moedas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setMoedaOrigem(moedaDestino)
                setMoedaDestino(moedaOrigem)
                setResultado(null)
              }}
              className="w-10 h-10 rounded-full bg-[#222228] border border-[#333338] flex items-center justify-center text-[#9999a5] hover:text-[#dc2626] hover:border-[#dc2626]/40 hover:rotate-180 transition-all duration-500"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Moeda Destino */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9999a5]">Moeda de destino</label>
            <select
              value={moedaDestino}
              onChange={(e) => setMoedaDestino(e.target.value)}
              className="w-full bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-[#f0f0f2] text-sm focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300 cursor-pointer appearance-none"
            >
              {moedas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Valor */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9999a5]">Valor</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-[#f0f0f2] text-sm font-mono placeholder-[#666] focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300"
            />
          </div>

          {/* Botao */}
          <button
            onClick={converter}
            disabled={loading}
            className="group relative w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-[#dc2626]/20 hover:shadow-[#dc2626]/35 hover:from-[#ef4444] hover:to-[#dc2626] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Convertendo...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <RefreshCcw className="w-4 h-4" />
                Converter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          {/* Erro */}
          {erro && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20 animate-fade-in-up">
              <AlertCircle className="w-4 h-4 text-[#ef4444]" />
              <p className="text-[#ef4444] text-sm font-medium">{erro}</p>
            </div>
          )}

          {/* Resultado */}
          {resultado !== null && (
            <div className="bg-[#222228] border border-[#333338]/60 rounded-xl p-5 animate-scale-in">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#22c55e]" />
                <span className="text-sm font-bold text-[#f0f0f2]">Resultado da Conversao</span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between py-2 border-b border-[#333338]/40">
                  <span className="text-sm text-[#9999a5]">Valor convertido</span>
                  <span className="text-lg font-bold text-[#22c55e] font-mono">{resultado.toFixed(4)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#9999a5]">Cotacao utilizada</span>
                  <span className="text-sm font-medium text-[#f0f0f2] font-mono">
                    1 {getNomeMoeda(moedaOrigem)} = {cotacao} {getNomeMoeda(moedaDestino)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
