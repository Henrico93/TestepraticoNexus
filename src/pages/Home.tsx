export default function Home() {
  // ===== MOCKS LOCAIS =====
  const indicadores = {
    totalDepositado: 15420.75,
    totalSacado: 8320.4,
    usuariosAtivos: 128,
    volumeBRL: 45200.9,
  };

  const movimentacoes = [
    { id: 1, tipo: "Depósito", valor: 1200, ativo: "BRL" },
    { id: 2, tipo: "Saque", valor: 0.02, ativo: "BTC" },
    { id: 3, tipo: "Depósito", valor: 350, ativo: "BRL" },
    { id: 4, tipo: "Saque", valor: 1.5, ativo: "ETH" },
    { id: 5, tipo: "Depósito", valor: 2000, ativo: "BRL" },
  ];

  const saldos = [
    { ativo: "BRL", valor: 12450.9 },
    { ativo: "BTC", valor: 0.45 },
    { ativo: "ETH", valor: 3.2 },
    { ativo: "USDT", valor: 5200 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* TÍTULO */}
      <h1 className="text-2xl font-semibold">Resumo Geral</h1>

      {/* ===== CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Depositado</p>
          <h3 className="text-lg font-semibold">
            R$ {indicadores.totalDepositado.toFixed(2)}
          </h3>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Sacado</p>
          <h3 className="text-lg font-semibold">
            R$ {indicadores.totalSacado.toFixed(2)}
          </h3>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Usuários Ativos</p>
          <h3 className="text-lg font-semibold">
            {indicadores.usuariosAtivos}
          </h3>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Volume em BRL</p>
          <h3 className="text-lg font-semibold">
            R$ {indicadores.volumeBRL.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* ===== MOVIMENTAÇÕES ===== */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Últimas Movimentações
        </h2>

        <ul className="divide-y">
          {movimentacoes.map((mov) => (
            <li
              key={mov.id}
              className="flex justify-between py-2 text-sm"
            >
              <span>{mov.tipo}</span>
              <span>
                {mov.valor} {mov.ativo}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== SALDOS ===== */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Saldos por Ativo
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {saldos.map((saldo, index) => (
            <div
              key={index}
              className="border rounded-md p-3 text-center"
            >
              <p className="text-sm text-gray-500">{saldo.ativo}</p>
              <h3 className="font-semibold">{saldo.valor}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}