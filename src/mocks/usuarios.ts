export type StatusUsuario = "ACTIVE" | "PENDING" | "BLOCKED";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  status: StatusUsuario;
  criadoEm: Date;
};

export const usuarios: Usuario[] = [
  {
    id: "u1",
    nome: "Carlos Silva",
    email: "carlos@email.com",
    status: "ACTIVE",
    criadoEm: new Date("2024-01-10"),
  },
  {
    id: "u2",
    nome: "Mariana Souza",
    email: "mariana@email.com",
    status: "ACTIVE",
    criadoEm: new Date("2024-01-15"),
  },
  {
    id: "u3",
    nome: "João Oliveira",
    email: "joao@email.com",
    status: "PENDING",
    criadoEm: new Date("2024-02-01"),
  },
  {
    id: "u4",
    nome: "Fernanda Lima",
    email: "fernanda@email.com",
    status: "BLOCKED",
    criadoEm: new Date("2024-02-10"),
  },
  {
    id: "u5",
    nome: "Ricardo Mendes",
    email: "ricardo@email.com",
    status: "ACTIVE",
    criadoEm: new Date("2024-03-05"),
  },
  {
    id: "u6",
    nome: "Juliana Castro",
    email: "juliana@email.com",
    status: "PENDING",
    criadoEm: new Date("2024-03-18"),
  },
  {
    id: "u7",
    nome: "Bruno Rocha",
    email: "bruno@email.com",
    status: "ACTIVE",
    criadoEm: new Date("2024-04-02"),
  },
  {
    id: "u8",
    nome: "Patrícia Gomes",
    email: "patricia@email.com",
    status: "BLOCKED",
    criadoEm: new Date("2024-04-12"),
  },
  {
    id: "u9",
    nome: "Lucas Fernandes",
    email: "lucas@email.com",
    status: "ACTIVE",
    criadoEm: new Date("2024-05-01"),
  },
  {
    id: "u10",
    nome: "Camila Martins",
    email: "camila@email.com",
    status: "PENDING",
    criadoEm: new Date("2024-05-20"),
  },
];