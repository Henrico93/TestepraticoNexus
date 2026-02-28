import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from "react"
import type { Ativo } from "../types"

export type Usuario = {
  id: number
  nome: string
  email: string
  status: "ativo" | "pendente" | "bloqueado"
  criadoEm: Date
  ultimaAtividade: Date
  saldos: Record<Ativo, number>
}

export type Movimentacao = {
  id: number
  usuarioId: number
  tipo: "deposito" | "saque"
  ativo: Ativo
  valor: number
  observacao?: string
  data: Date
}

type AppContextType = {
  usuarios: Usuario[]
  movimentacoes: Movimentacao[]
  realizarDeposito: (
    usuarioId: number,
    ativo: Ativo,
    valor: number,
    observacao?: string
  ) => { sucesso: boolean; mensagem: string }
  realizarSaque: (
    usuarioId: number,
    ativo: Ativo,
    valor: number
  ) => { sucesso: boolean; mensagem: string }
}

const AppContext = createContext<AppContextType | undefined>(undefined)

/* ===========================
   USUÁRIOS INICIAIS
=========================== */

const usuariosIniciais: Usuario[] = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos@email.com",
    status: "ativo",
    criadoEm: new Date("2024-01-10"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 1500, BTC: 0.3, ETH: 1, USDT: 200 }
  },
  {
    id: 2,
    nome: "Juliana Souza",
    email: "juliana@email.com",
    status: "pendente",
    criadoEm: new Date("2024-02-15"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 500, BTC: 0.1, ETH: 0.5, USDT: 100 }
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro@email.com",
    status: "bloqueado",
    criadoEm: new Date("2024-03-05"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 800, BTC: 0.05, ETH: 0.8, USDT: 50 }
  },
  {
    id: 4,
    nome: "Mariana Lima",
    email: "mariana@email.com",
    status: "ativo",
    criadoEm: new Date("2024-04-01"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 1200, BTC: 0.2, ETH: 1.5, USDT: 300 }
  },
  {
    id: 5,
    nome: "Lucas Rocha",
    email: "lucas@email.com",
    status: "ativo",
    criadoEm: new Date("2024-04-20"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 900, BTC: 0.07, ETH: 0.9, USDT: 80 }
  },
  {
    id: 6,
    nome: "Fernanda Alves",
    email: "fernanda@email.com",
    status: "pendente",
    criadoEm: new Date("2024-05-10"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 3000, BTC: 2, ETH: 5, USDT: 1500 }
  },
  {
    id: 7,
    nome: "Rafael Costa",
    email: "rafael@email.com",
    status: "bloqueado",
    criadoEm: new Date("2024-05-25"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 600, BTC: 0.02, ETH: 0.3, USDT: 40 }
  },
  {
    id: 8,
    nome: "Beatriz Oliveira",
    email: "beatriz@email.com",
    status: "ativo",
    criadoEm: new Date("2024-06-12"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 2500, BTC: 0.8, ETH: 4, USDT: 900 }
  },
  {
    id: 9,
    nome: "Gustavo Mendes",
    email: "gustavo@email.com",
    status: "ativo",
    criadoEm: new Date("2024-07-01"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 1800, BTC: 0.4, ETH: 2.3, USDT: 600 }
  },
  {
    id: 10,
    nome: "Camila Ferreira",
    email: "camila@email.com",
    status: "ativo",
    criadoEm: new Date("2024-07-20"),
    ultimaAtividade: new Date(),
    saldos: { BRL: 2200, BTC: 0.6, ETH: 3.2, USDT: 750 }
  }
]

/* ===========================
   PROVIDER
=========================== */

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const data = localStorage.getItem("usuarios")
    if (!data) return usuariosIniciais

    const parsed = JSON.parse(data)
    return parsed.map((u: any) => ({
      ...u,
      criadoEm: new Date(u.criadoEm),
      ultimaAtividade: new Date(u.ultimaAtividade)
    }))
  })

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>(() => {
    const data = localStorage.getItem("movimentacoes")
    if (!data) return []

    const parsed = JSON.parse(data)
    return parsed.map((m: any) => ({
      ...m,
      data: new Date(m.data)
    }))
  })

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
  }, [usuarios])

  useEffect(() => {
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes))
  }, [movimentacoes])

  function realizarDeposito(
    usuarioId: number,
    ativo: Ativo,
    valor: number,
    observacao?: string
  ) {
    if (valor <= 0) {
      return { sucesso: false, mensagem: "Valor inválido." }
    }

    const usuario = usuarios.find(u => u.id === usuarioId)
    if (!usuario) {
      return { sucesso: false, mensagem: "Usuário não encontrado." }
    }

    if (usuario.status === "bloqueado") {
      return { sucesso: false, mensagem: "Usuário bloqueado." }
    }

    setUsuarios(prev =>
      prev.map(u =>
        u.id === usuarioId
          ? {
              ...u,
              saldos: { ...u.saldos, [ativo]: u.saldos[ativo] + valor },
              ultimaAtividade: new Date()
            }
          : u
      )
    )

    setMovimentacoes(prev => [
      ...prev,
      {
        id: prev.length + 1,
        usuarioId,
        tipo: "deposito",
        ativo,
        valor,
        observacao,
        data: new Date()
      }
    ])

    return { sucesso: true, mensagem: "Depósito realizado com sucesso!" }
  }

  function realizarSaque(
    usuarioId: number,
    ativo: Ativo,
    valor: number
  ) {
    if (valor <= 0) {
      return { sucesso: false, mensagem: "Valor inválido." }
    }

    const usuario = usuarios.find(u => u.id === usuarioId)
    if (!usuario) {
      return { sucesso: false, mensagem: "Usuário não encontrado." }
    }

    if (usuario.status !== "ativo") {
      return { sucesso: false, mensagem: "Usuário não está ativo para saque." }
    }

    if (usuario.saldos[ativo] < valor) {
      return { sucesso: false, mensagem: "Saldo insuficiente." }
    }

    setUsuarios(prev =>
      prev.map(u =>
        u.id === usuarioId
          ? {
              ...u,
              saldos: { ...u.saldos, [ativo]: u.saldos[ativo] - valor },
              ultimaAtividade: new Date()
            }
          : u
      )
    )

    setMovimentacoes(prev => [
      ...prev,
      {
        id: prev.length + 1,
        usuarioId,
        tipo: "saque",
        ativo,
        valor,
        data: new Date()
      }
    ])

    return { sucesso: true, mensagem: "Saque realizado com sucesso!" }
  }

  return (
    <AppContext.Provider
      value={{
        usuarios,
        movimentacoes,
        realizarDeposito,
        realizarSaque
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp deve ser usado dentro de AppProvider")
  }
  return context
}