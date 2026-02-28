import { useState } from "react";

type Moeda = {
  id: string;
  nome: string;
};

const moedas: Moeda[] = [
  { id: "bitcoin", nome: "Bitcoin" },
  { id: "ethereum", nome: "Ethereum" },
  { id: "tether", nome: "Tether" },
  { id: "solana", nome: "Solana" },
  { id: "usd", nome: "Dólar (USD)" },
  { id: "brl", nome: "Real (BRL)" },
];

export default function Conversao() {
  const [moedaOrigem, setMoedaOrigem] = useState("bitcoin");
  const [moedaDestino, setMoedaDestino] = useState("usd");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [cotacao, setCotacao] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const converter = async () => {
    if (!valor || Number(valor) <= 0) {
      setErro("Digite um valor válido.");
      return;
    }

    setLoading(true);
    setErro("");
    setResultado(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${moedaOrigem}&vs_currencies=${moedaDestino}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API.");
      }

      const data = await response.json();

      const taxa = data[moedaOrigem]?.[moedaDestino];

      if (!taxa) {
        throw new Error("Não foi possível obter a cotação.");
      }

      const valorConvertido = Number(valor) * taxa;

      setCotacao(taxa);
      setResultado(valorConvertido);
    } catch (error: any) {
      setErro(error.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Conversão de Criptomoedas</h2>

      <div>
        <label>Moeda de origem:</label>
        <select
          value={moedaOrigem}
          onChange={(e) => setMoedaOrigem(e.target.value)}
        >
          {moedas.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Moeda de destino:</label>
        <select
          value={moedaDestino}
          onChange={(e) => setMoedaDestino(e.target.value)}
        >
          {moedas.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Valor:</label>
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      <button onClick={converter} disabled={loading}>
        {loading ? "Convertendo..." : "Converter"}
      </button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {resultado !== null && (
        <div>
          <p>
            <strong>Resultado:</strong> {resultado.toFixed(4)}
          </p>
          <p>
            <strong>Cotação utilizada:</strong> 1 {moedaOrigem} = {cotacao}{" "}
            {moedaDestino}
          </p>
        </div>
      )}
    </div>
  );
}