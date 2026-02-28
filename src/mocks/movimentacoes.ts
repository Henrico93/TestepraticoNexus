import type { Ativo } from "./ativos";
//importar ativo do arquivo de ativos


export type TipoMovimentacao = "DEPOSIT" | "WITHDRAW";

export type Movimentacao = {
  id: string;
  usuarioId: string;
  tipo: TipoMovimentacao;
  ativo: Ativo;
  valor: number;
  data: Date;
};

export const movimentacoes: Movimentacao[] = [
  // u1
  { id: "m1", usuarioId: "u1", tipo: "DEPOSIT", ativo: "BRL", valor: 5000, data: new Date() },
  { id: "m2", usuarioId: "u1", tipo: "DEPOSIT", ativo: "BTC", valor: 0.1, data: new Date() },
  { id: "m3", usuarioId: "u1", tipo: "WITHDRAW", ativo: "BRL", valor: 1000, data: new Date() },

  // u2
  { id: "m4", usuarioId: "u2", tipo: "DEPOSIT", ativo: "ETH", valor: 2, data: new Date() },
  { id: "m5", usuarioId: "u2", tipo: "DEPOSIT", ativo: "BRL", valor: 3000, data: new Date() },
  { id: "m6", usuarioId: "u2", tipo: "WITHDRAW", ativo: "ETH", valor: 0.5, data: new Date() },

  // u3
  { id: "m7", usuarioId: "u3", tipo: "DEPOSIT", ativo: "USDT", valor: 1000, data: new Date() },
  { id: "m8", usuarioId: "u3", tipo: "WITHDRAW", ativo: "USDT", valor: 200, data: new Date() },
  { id: "m9", usuarioId: "u3", tipo: "DEPOSIT", ativo: "BRL", valor: 1500, data: new Date() },

  // u4
  { id: "m10", usuarioId: "u4", tipo: "DEPOSIT", ativo: "BTC", valor: 0.05, data: new Date() },
  { id: "m11", usuarioId: "u4", tipo: "WITHDRAW", ativo: "BTC", valor: 0.01, data: new Date() },
  { id: "m12", usuarioId: "u4", tipo: "DEPOSIT", ativo: "BRL", valor: 2000, data: new Date() },

  // u5
  { id: "m13", usuarioId: "u5", tipo: "DEPOSIT", ativo: "ETH", valor: 5, data: new Date() },
  { id: "m14", usuarioId: "u5", tipo: "WITHDRAW", ativo: "BRL", valor: 500, data: new Date() },
  { id: "m15", usuarioId: "u5", tipo: "DEPOSIT", ativo: "USDT", valor: 800, data: new Date() },

  // u6
  { id: "m16", usuarioId: "u6", tipo: "DEPOSIT", ativo: "BRL", valor: 10000, data: new Date() },
  { id: "m17", usuarioId: "u6", tipo: "WITHDRAW", ativo: "BRL", valor: 2500, data: new Date() },
  { id: "m18", usuarioId: "u6", tipo: "DEPOSIT", ativo: "BTC", valor: 0.02, data: new Date() },

  // u7
  { id: "m19", usuarioId: "u7", tipo: "DEPOSIT", ativo: "USDT", valor: 1200, data: new Date() },
  { id: "m20", usuarioId: "u7", tipo: "WITHDRAW", ativo: "USDT", valor: 100, data: new Date() },
  { id: "m21", usuarioId: "u7", tipo: "DEPOSIT", ativo: "ETH", valor: 1.5, data: new Date() },

  // u8
  { id: "m22", usuarioId: "u8", tipo: "DEPOSIT", ativo: "BRL", valor: 4000, data: new Date() },
  { id: "m23", usuarioId: "u8", tipo: "WITHDRAW", ativo: "BRL", valor: 2000, data: new Date() },
  { id: "m24", usuarioId: "u8", tipo: "DEPOSIT", ativo: "BTC", valor: 0.03, data: new Date() },

  // u9
  { id: "m25", usuarioId: "u9", tipo: "DEPOSIT", ativo: "ETH", valor: 3, data: new Date() },
  { id: "m26", usuarioId: "u9", tipo: "WITHDRAW", ativo: "ETH", valor: 1, data: new Date() },
  { id: "m27", usuarioId: "u9", tipo: "DEPOSIT", ativo: "USDT", valor: 500, data: new Date() },

  // u10
  { id: "m28", usuarioId: "u10", tipo: "DEPOSIT", ativo: "BRL", valor: 7000, data: new Date() },
  { id: "m29", usuarioId: "u10", tipo: "WITHDRAW", ativo: "BRL", valor: 1000, data: new Date() },
  { id: "m30", usuarioId: "u10", tipo: "DEPOSIT", ativo: "BTC", valor: 0.08, data: new Date() },
];