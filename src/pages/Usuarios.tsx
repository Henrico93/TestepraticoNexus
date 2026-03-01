import { useState, useMemo } from "react"
import { useApp } from "../context/AppContext"
import { Search, Filter, ChevronLeft, ChevronRight, Users as UsersIcon, Circle } from "lucide-react"

export default function Usuarios() {
  const { usuarios } = useApp()

  const [busca, setBusca] = useState("")
  const [statusFiltro, setStatusFiltro] = useState("Todos")
  const [paginaAtual, setPaginaAtual] = useState(1)

  const itensPorPagina = 5

  const usuariosFiltrados = useMemo(() => {
    return usuarios
      .filter(
        (u) =>
          u.nome.toLowerCase().includes(busca.toLowerCase()) ||
          u.email.toLowerCase().includes(busca.toLowerCase())
      )
      .filter((u) =>
        statusFiltro === "Todos" ? true : u.status === statusFiltro
      )
  }, [usuarios, busca, statusFiltro])

  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina)

  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  )

  const statusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20"
      case "Pendente": return "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20"
      case "Bloqueado": return "bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20"
      default: return "bg-[#9999a5]/10 text-[#9999a5] border-[#9999a5]/20"
    }
  }

  const statusDot = (status: string) => {
    switch (status) {
      case "Ativo": return "text-[#22c55e]"
      case "Pendente": return "text-[#f59e0b]"
      case "Bloqueado": return "text-[#ef4444]"
      default: return "text-[#9999a5]"
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-down">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#dc2626]/10 flex items-center justify-center">
            <UsersIcon className="w-5 h-5 text-[#dc2626]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f2] tracking-tight">
            Usuarios
          </h1>
        </div>
        <p className="text-[#9999a5] text-sm ml-[52px]">Gerencie todos os usuarios da plataforma</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-4 mb-6 animate-fade-in-up delay-200 fill-backwards">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9999a5]" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value)
              setPaginaAtual(1)
            }}
            className="w-full bg-[#1a1a1e] border border-[#333338]/60 rounded-xl pl-11 pr-4 py-3 text-[#f0f0f2] text-sm placeholder-[#666] focus:outline-none focus:border-[#dc2626]/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] transition-all duration-300"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-[#9999a5] mr-1" />
          {(["Todos", "Ativo", "Pendente", "Bloqueado"] as const).map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFiltro(status)
                setPaginaAtual(1)
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-300 cursor-pointer ${
                statusFiltro === status
                  ? status === "Ativo"
                    ? "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/40"
                    : status === "Pendente"
                    ? "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/40"
                    : status === "Bloqueado"
                    ? "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/40"
                    : "bg-[#dc2626]/15 text-[#dc2626] border-[#dc2626]/40"
                  : "bg-[#222228] text-[#9999a5] border-[#333338]/60 hover:border-[#9999a5]/40 hover:text-[#f0f0f2]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-[#1a1a1e] border border-[#333338]/60 rounded-2xl overflow-hidden animate-fade-in-up delay-300 fill-backwards">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-[#333338]/60">
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#9999a5] uppercase tracking-wider">Nome</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#9999a5] uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#9999a5] uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#9999a5] uppercase tracking-wider hidden sm:table-cell">Criado em</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#9999a5] uppercase tracking-wider hidden md:table-cell">Ultima atividade</th>
              </tr>
            </thead>
            <tbody>
              {usuariosPaginados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <UsersIcon className="w-10 h-10 text-[#333338] mx-auto mb-3" />
                    <p className="text-sm text-[#9999a5]">Nenhum usuario encontrado</p>
                    <p className="text-xs text-[#666] mt-1">Tente ajustar os filtros de busca</p>
                  </td>
                </tr>
              ) : (
              usuariosPaginados.map((u, i) => (
                <tr
                  key={u.id}
                  className="border-b border-[#333338]/30 hover:bg-[#222228] transition-colors duration-300 group"
                  style={{ animation: `fadeInUp 0.4s ease-out ${i * 60}ms both` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dc2626] to-[#b91c1c] flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-[#dc2626]/20">
                        {u.nome.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-[#f0f0f2] group-hover:text-white transition-colors">{u.nome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#9999a5] font-mono">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusColor(u.status)}`}>
                      <Circle className={`w-2 h-2 fill-current ${statusDot(u.status)}`} />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#9999a5] hidden sm:table-cell">{u.criadoEm.toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-[#9999a5] hidden md:table-cell">{u.ultimaAtividade.toLocaleDateString()}</td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginacao */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#333338]/60">
          <p className="text-xs text-[#9999a5]">
            Mostrando {((paginaAtual - 1) * itensPorPagina) + 1} a {Math.min(paginaAtual * itensPorPagina, usuariosFiltrados.length)} de {usuariosFiltrados.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={paginaAtual === 1}
              onClick={() => setPaginaAtual((p) => p - 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#222228] border border-[#333338]/60 text-[#9999a5] hover:text-[#f0f0f2] hover:border-[#dc2626]/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#333338]/60"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Anterior
            </button>

            <span className="text-xs text-[#9999a5] px-2">
              {paginaAtual} / {totalPaginas || 1}
            </span>

            <button
              disabled={paginaAtual === totalPaginas || totalPaginas === 0}
              onClick={() => setPaginaAtual((p) => p + 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#222228] border border-[#333338]/60 text-[#9999a5] hover:text-[#f0f0f2] hover:border-[#dc2626]/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#333338]/60"
            >
              Proxima
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
