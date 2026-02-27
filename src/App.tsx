import { cryptoSummary, cryptoAssets } from "./data/cryptoData"

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">
          Crypto Dashboard
        </h1>
        <span className="text-sm text-gray-500">
          Bem-vindo, Investidor 👋
        </span>
      </header>

      <main className="p-6 space-y-8">
        
        {/* Resumo */}
        <section className="grid gap-4 md:grid-cols-3">
          {cryptoSummary.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-sm text-gray-500">
                {item.title}
              </h2>
              <p className="text-2xl font-semibold mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Lista de ativos */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Seus Ativos
          </h2>

          <div className="space-y-4">
            {cryptoAssets.map((crypto, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-3 last:border-none"
              >
                <div>
                  <p className="font-medium">
                    {crypto.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {crypto.symbol}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    {crypto.price}
                  </p>
                  <p
                    className={`text-sm ${
                      crypto.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default App