export type Ativo = "BRL" | "BTC" | "ETH" | "USDT"

export interface Saldos {
  BRL: number
  BTC: number
  ETH: number
  USDT: number
}

export interface Usuario {
  id: number
  nome: string
  email: string
  status: "Ativo" | "Pendente" | "Bloqueado"
  criadoEm: Date
  ultimaAtividade: Date
  saldos: Saldos
}

export interface Movimentacao {
  id: number
  tipo: string
  valor: number
  ativo: Ativo
  data: Date
  usuarioId: number
}
