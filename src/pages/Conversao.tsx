import { useState } from "react"
import { RefreshCcw, AlertCircle, } from "lucide-react"

type Moeda = {
  id: string
  nome: string
}

const moedas: Moeda[] = [
  { id: "bitcoin", nome: "Bitcoin" },
  { id: "ethereum", nome: "Ethereum" },
  { id: "tether", nome: "Tether" },
  { id: "solana", nome: "Solana" },
  { id: "usd", nome: "Dólar (USD)" },
  { id: "brl", nome: "Real (BRL)" },
]

// cache simples para evitar bloqueio
let cache: any = null
let cacheTime = 0

export default function Conversao() {
  const [moedaOrigem, setMoedaOrigem] = useState("bitcoin")
  const [moedaDestino, setMoedaDestino] = useState("usd")
  const [valor, setValor] = useState("")
  const [resultado, setResultado] = useState<number | null>(null)
  const [cotacao, setCotacao] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")

  const buscarCotacoes = async () => {
    const agora = Date.now()

    // usa cache por 30 segundos
    if (cache && agora - cacheTime < 30000) {
      return cache
    }

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,solana&vs_currencies=usd,brl"
    )

    if (!response.ok) {
      throw new Error("Erro ao buscar cotações.")
    }

    const data = await response.json()

    cache = data
    cacheTime = agora

    return data
  }

  const converter = async () => {
    if (!valor || Number(valor) <= 0) {
      setErro("Digite um valor válido.")
      return
    }

    setLoading(true)
    setErro("")
    setResultado(null)

    try {
      const data = await buscarCotacoes()

      const valorNumero = Number(valor)

      // Caso USD ↔ BRL
      if (moedaOrigem === "usd" && moedaDestino === "brl") {
        const taxa = data.bitcoin.brl / data.bitcoin.usd
        setCotacao(taxa)
        setResultado(valorNumero * taxa)
        return
      }

      if (moedaOrigem === "brl" && moedaDestino === "usd") {
        const taxa = data.bitcoin.usd / data.bitcoin.brl
        setCotacao(taxa)
        setResultado(valorNumero * taxa)
        return
      }

      // Origem é cripto
      if (data[moedaOrigem]) {
        if (moedaDestino === "usd" || moedaDestino === "brl") {
          const taxa = data[moedaOrigem][moedaDestino]
          setCotacao(taxa)
          setResultado(valorNumero * taxa)
          return
        }

        // cripto → cripto
        const origemUSD = data[moedaOrigem].usd
        const destinoUSD = data[moedaDestino].usd

        const taxa = origemUSD / destinoUSD
        setCotacao(taxa)
        setResultado(valorNumero * taxa)
        return
      }

      // Moeda física → cripto
      if (moedaOrigem === "usd" || moedaOrigem === "brl") {
        const destinoUSD = data[moedaDestino].usd

        const valorEmUSD =
          moedaOrigem === "usd"
            ? valorNumero
            : valorNumero * (data.bitcoin.usd / data.bitcoin.brl)

        const taxa = 1 / destinoUSD
        setCotacao(taxa)
        setResultado(valorEmUSD * taxa)
        return
      }

      throw new Error("Conversão não suportada.")
    } catch (error: any) {
      setErro(error.message || "Erro inesperado.")
    } finally {
      setLoading(false)
    }
  }

  const getNomeMoeda = (id: string) =>
    moedas.find((m) => m.id === id)?.nome || id

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#dc2626]/10 flex items-center justify-center">
            <RefreshCcw className="w-5 h-5 text-[#dc2626]" />
          </div>
          <h1 className="text-3xl font-bold text-[#f0f0f2]">
            Conversão
          </h1>
        </div>
        <p className="text-[#9999a5] text-sm ml-[52px]">
          Converta entre criptomoedas e moedas físicas
        </p>
      </div>

      <div className="bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl p-6">
        <div className="flex flex-col gap-5">

          <select
            value={moedaOrigem}
            onChange={(e) => setMoedaOrigem(e.target.value)}
            className="bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-white"
          >
            {moedas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              setMoedaOrigem(moedaDestino)
              setMoedaDestino(moedaOrigem)
              setResultado(null)
            }}
            className="flex justify-center"
          >
            <RefreshCcw className="text-white" />
          </button>

          <select
            value={moedaDestino}
            onChange={(e) => setMoedaDestino(e.target.value)}
            className="bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-white"
          >
            {moedas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0.00"
            className="bg-[#222228] border border-[#404048] rounded-xl px-4 py-3 text-white"
          />

          <button
            onClick={converter}
            disabled={loading}
            className="bg-red-600 text-white py-3 rounded-xl"
          >
            {loading ? "Convertendo..." : "Converter"}
          </button>

          {erro && (
            <div className="text-red-500 flex items-center gap-2">
              <AlertCircle size={16} />
              {erro}
            </div>
          )}

          {resultado !== null && (
            <div className="bg-[#222228] p-4 rounded-xl">
              <p className="text-green-400 font-bold text-lg">
                {resultado.toFixed(6)}
              </p>
              <p className="text-sm text-gray-400">
                1 {getNomeMoeda(moedaOrigem)} = {cotacao}{" "}
                {getNomeMoeda(moedaDestino)}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}