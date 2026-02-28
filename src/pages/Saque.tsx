import { useState, useMemo } from "react"
import { useApp } from "../context/AppContext"
import type { Ativo } from "../types"

export default function Saque() {
  const { usuarios, realizarSaque } = useApp()

  const [usuarioId, setUsuarioId] = useState<number>(0)
  const [ativo, setAtivo] = useState<Ativo>("BRL")
  const [valor, setValor] = useState<number>(0)
  const [mensagem, setMensagem] = useState<string>("")

  const usuarioSelecionado = useMemo(
    () => usuarios.find(u => u.id === usuarioId),
    [usuarioId, usuarios]
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const resultado = realizarSaque(usuarioId, ativo, valor)
    setMensagem(resultado.mensagem)

    if (resultado.sucesso) {
      setValor(0)
    }
  }

  return (
    <div>
      <h2>Saque</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(Number(e.target.value))}
            required
          >
            <option value={0}>Selecione</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>

        {usuarioSelecionado && (
          <div style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc" }}>
            <strong>Saldos do Usuário:</strong>
            <ul>
              <li>BRL: {usuarioSelecionado.saldos.BRL}</li>
              <li>BTC: {usuarioSelecionado.saldos.BTC}</li>
              <li>ETH: {usuarioSelecionado.saldos.ETH}</li>
              <li>USDT: {usuarioSelecionado.saldos.USDT}</li>
            </ul>
          </div>
        )}

        <div>
          <label>Ativo:</label>
          <select
            value={ativo}
            onChange={(e) => setAtivo(e.target.value as Ativo)}
          >
            <option value="BRL">BRL</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        <div>
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit">Confirmar Saque</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  )
}