import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { Ativo } from "../context/AppContext";

export default function Deposito() {
  const { usuarios, realizarDeposito } = useApp();

  const [usuarioId, setUsuarioId] = useState<number | "">("");
  const [ativo, setAtivo] = useState<Ativo>("BRL");
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleDeposito = () => {
    if (!usuarioId || Number(valor) <= 0) {
      setMensagem("Preencha corretamente os campos.");
      return;
    }

    realizarDeposito(usuarioId, ativo, Number(valor), observacao);

    setMensagem("Depósito realizado com sucesso!");
    setValor("");
    setObservacao("");
  };

  const usuarioSelecionado = usuarios.find((u) => u.id === usuarioId);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Depósito</h1>

      <div className="space-y-4 border p-4 rounded-lg">
        <select
          value={usuarioId}
          onChange={(e) => setUsuarioId(Number(e.target.value))}
          className="border w-full px-3 py-2 rounded"
        >
          <option value="">Selecione o usuário</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome}
            </option>
          ))}
        </select>

        <select
          value={ativo}
          onChange={(e) => setAtivo(e.target.value as Ativo)}
          className="border w-full px-3 py-2 rounded"
        >
          <option value="BRL">BRL</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
        </select>

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="border w-full px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Observação (opcional)"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className="border w-full px-3 py-2 rounded"
        />

        <button
          onClick={handleDeposito}
          className="bg-black text-white w-full py-2 rounded"
        >
          Confirmar Depósito
        </button>

        {mensagem && (
          <p className="text-sm text-center">{mensagem}</p>
        )}
      </div>

      {usuarioSelecionado && (
        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Saldos</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(usuarioSelecionado.saldos).map(
              ([ativo, valor]) => (
                <div key={ativo} className="border p-2 rounded">
                  {ativo}: {valor}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}