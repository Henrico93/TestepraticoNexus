import { useState, useMemo } from "react";

type Status = "Ativo" | "Pendente" | "Bloqueado";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  status: Status;
  criadoEm: string;
  ultimaAtividade: string;
};

export default function Usuarios() {
  // ===== MOCK =====
  const usuariosMock: Usuario[] = [
    { id: 1, nome: "Ana Silva", email: "ana@email.com", status: "Ativo", criadoEm: "2024-01-10", ultimaAtividade: "2024-02-01" },
    { id: 2, nome: "Bruno Lima", email: "bruno@email.com", status: "Pendente", criadoEm: "2024-01-12", ultimaAtividade: "2024-01-30" },
    { id: 3, nome: "Carlos Souza", email: "carlos@email.com", status: "Bloqueado", criadoEm: "2024-01-15", ultimaAtividade: "2024-01-25" },
    { id: 4, nome: "Daniela Rocha", email: "daniela@email.com", status: "Ativo", criadoEm: "2024-01-18", ultimaAtividade: "2024-02-02" },
    { id: 5, nome: "Eduardo Mendes", email: "eduardo@email.com", status: "Ativo", criadoEm: "2024-01-20", ultimaAtividade: "2024-02-03" },
    { id: 6, nome: "Fernanda Alves", email: "fernanda@email.com", status: "Pendente", criadoEm: "2024-01-22", ultimaAtividade: "2024-01-29" },
    { id: 7, nome: "Gabriel Costa", email: "gabriel@email.com", status: "Bloqueado", criadoEm: "2024-01-25", ultimaAtividade: "2024-01-28" },
    { id: 8, nome: "Helena Martins", email: "helena@email.com", status: "Ativo", criadoEm: "2024-01-27", ultimaAtividade: "2024-02-04" },
    { id: 9, nome: "Igor Fernandes", email: "igor@email.com", status: "Pendente", criadoEm: "2024-01-29", ultimaAtividade: "2024-01-31" },
    { id: 10, nome: "Juliana Castro", email: "juliana@email.com", status: "Ativo", criadoEm: "2024-02-01", ultimaAtividade: "2024-02-05" },
  ];

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 5;

  // ===== FILTRO + BUSCA =====
  const usuariosFiltrados = useMemo(() => {
    return usuariosMock
      .filter((u) =>
        u.nome.toLowerCase().includes(busca.toLowerCase()) ||
        u.email.toLowerCase().includes(busca.toLowerCase())
      )
      .filter((u) =>
        statusFiltro === "Todos" ? true : u.status === statusFiltro
      );
  }, [busca, statusFiltro]);

  // ===== PAGINAÇÃO =====
  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);

  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Usuários</h1>

      {/* ===== BUSCA E FILTRO ===== */}
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

      {/* ===== TABELA ===== */}
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

      {/* ===== PAGINAÇÃO ===== */}
      <div className="flex justify-between items-center">
        <p className="text-sm">
          Página {paginaAtual} de {totalPaginas}
        </p>

        <div className="flex gap-2">
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual((prev) => prev - 1)}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual((prev) => prev + 1)}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}