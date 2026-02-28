import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";

export default function Usuarios() {
  const { usuarios } = useApp();

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 5;

  const usuariosFiltrados = useMemo(() => {
    return usuarios
      .filter(
        (u) =>
          u.nome.toLowerCase().includes(busca.toLowerCase()) ||
          u.email.toLowerCase().includes(busca.toLowerCase())
      )
      .filter((u) =>
        statusFiltro === "Todos" ? true : u.status === statusFiltro
      );
  }, [usuarios, busca, statusFiltro]);

  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);

  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Usuários</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nome ou email"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPaginaAtual(1);
          }}
          className="border rounded-md px-3 py-2 w-full sm:w-1/2"
        />

        <select
          value={statusFiltro}
          onChange={(e) => {
            setStatusFiltro(e.target.value);
            setPaginaAtual(1);
          }}
          className="border rounded-md px-3 py-2 w-full sm:w-1/4"
        >
          <option value="Todos">Todos</option>
          <option value="Ativo">Ativo</option>
          <option value="Pendente">Pendente</option>
          <option value="Bloqueado">Bloqueado</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Criado em</th>
              <th className="text-left p-3">Última atividade</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.nome}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.status}</td>
                <td className="p-3">{u.criadoEm}</td>
                <td className="p-3">{u.ultimaAtividade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <button
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual((p) => p - 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          disabled={paginaAtual === totalPaginas}
          onClick={() => setPaginaAtual((p) => p + 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}