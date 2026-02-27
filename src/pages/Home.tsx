import { cryptoSummary } from "../data/cryptoData"

function Home() {
  return (
    <main className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {cryptoSummary.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {item.title}
            </p>
            <p className="text-2xl font-semibold mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Home