import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Status = "Ativo" | "Pendente" | "Bloqueado";
export type Ativo = "BRL" | "BTC" | "ETH" | "USDT";

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  status: Status;
  criadoEm: string;
  ultimaAtividade: string;
  saldos: Record<Ativo, number>;
};

export type Movimentacao = {
  usuarioId: number;
  tipo: "Depósito" | "Saque";
  ativo: Ativo;
  valor: number;
  data: string;
  observacao?: string;
};

type AppContextType = {
  usuarios: Usuario[];
  movimentacoes: Movimentacao[];
  realizarDeposito: (
    usuarioId: number,
    ativo: Ativo,
    valor: number,
    observacao?: string
  ) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // ===== 10 USUÁRIOS MOCKADOS =====
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "Ana Silva",
      email: "ana@email.com",
      status: "Ativo",
      criadoEm: "2024-01-10",
      ultimaAtividade: "2024-02-01",
      saldos: { BRL: 1000, BTC: 0.2, ETH: 1.5, USDT: 500 },
    },
    {
      id: 2,
      nome: "Bruno Lima",
      email: "bruno@email.com",
      status: "Pendente",
      criadoEm: "2024-01-12",
      ultimaAtividade: "2024-01-30",
      saldos: { BRL: 2000, BTC: 0.1, ETH: 0.8, USDT: 300 },
    },
    {
      id: 3,
      nome: "Carlos Souza",
      email: "carlos@email.com",
      status: "Bloqueado",
      criadoEm: "2024-01-15",
      ultimaAtividade: "2024-01-25",
      saldos: { BRL: 1500, BTC: 0.05, ETH: 0.3, USDT: 100 },
    },
    {
      id: 4,
      nome: "Daniela Rocha",
      email: "daniela@email.com",
      status: "Ativo",
      criadoEm: "2024-01-18",
      ultimaAtividade: "2024-02-02",
      saldos: { BRL: 3200, BTC: 0.15, ETH: 2.1, USDT: 900 },
    },
    {
      id: 5,
      nome: "Eduardo Mendes",
      email: "eduardo@email.com",
      status: "Ativo",
      criadoEm: "2024-01-20",
      ultimaAtividade: "2024-02-03",
      saldos: { BRL: 500, BTC: 0.03, ETH: 0.5, USDT: 50 },
    },
    {
      id: 6,
      nome: "Fernanda Alves",
      email: "fernanda@email.com",
      status: "Pendente",
      criadoEm: "2024-01-22",
      ultimaAtividade: "2024-01-29",
      saldos: { BRL: 4100, BTC: 0.25, ETH: 1.2, USDT: 1200 },
    },
    {
      id: 7,
      nome: "Gabriel Costa",
      email: "gabriel@email.com",
      status: "Bloqueado",
      criadoEm: "2024-01-25",
      ultimaAtividade: "2024-01-28",
      saldos: { BRL: 780, BTC: 0.07, ETH: 0.9, USDT: 200 },
    },
    {
      id: 8,
      nome: "Helena Martins",
      email: "helena@email.com",
      status: "Ativo",
      criadoEm: "2024-01-27",
      ultimaAtividade: "2024-02-04",
      saldos: { BRL: 6000, BTC: 0.4, ETH: 3.5, USDT: 2500 },
    },
    {
      id: 9,
      nome: "Igor Fernandes",
      email: "igor@email.com",
      status: "Pendente",
      criadoEm: "2024-01-29",
      ultimaAtividade: "2024-01-31",
      saldos: { BRL: 950, BTC: 0.02, ETH: 0.4, USDT: 80 },
    },
    {
      id: 10,
      nome: "Juliana Castro",
      email: "juliana@email.com",
      status: "Ativo",
      criadoEm: "2024-02-01",
      ultimaAtividade: "2024-02-05",
      saldos: { BRL: 7200, BTC: 0.5, ETH: 4.2, USDT: 3000 },
    },
  ]);

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  const realizarDeposito = (
    usuarioId: number,
    ativo: Ativo,
    valor: number,
    observacao?: string
  ) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === usuarioId
          ? {
              ...u,
              saldos: {
                ...u.saldos,
                [ativo]: u.saldos[ativo] + valor,
              },
              ultimaAtividade: new Date().toISOString().split("T")[0],
            }
          : u
      )
    );

    setMovimentacoes((prev) => [
      ...prev,
      {
        usuarioId,
        tipo: "Depósito",
        ativo,
        valor,
        data: new Date().toLocaleString(),
        observacao,
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{ usuarios, movimentacoes, realizarDeposito }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve estar dentro do AppProvider");
  return context;
}