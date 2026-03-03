# 💰 TESTE PRÁTICO – NEXUS CRYPTO DASHBOARD

Dashboard financeiro focado em criptomoedas, desenvolvido como teste prático de Front-end.

---

## Tecnologias Utilizadas

- React
- Vite
- TypeScript
- TailwindCSS
- React Router DOM
- Context API
- CoinGecko API (apenas na tela de Conversão)

---

## Objetivo do Projeto

Construir um painel administrativo simulando uma plataforma financeira de criptomoedas com:

- Organização de código
- Interface moderna e responsiva
- Uso de dados mockados
- Integração real com API externa (somente Conversão)
- Separação clara de responsabilidades

---

# TESTE PRÁTICO – NEXUS CRYPTO DASHBOARD

Dashboard financeiro focado em criptomoedas, desenvolvido como teste prático de Front-end.

---

## Tecnologias Utilizadas

- React
- Vite
- TypeScript
- TailwindCSS
- React Router DOM
- Context API
- CoinGecko API (apenas na tela de Conversão)

---

## Objetivo do Projeto

Construir um painel administrativo simulando uma plataforma financeira de criptomoedas com:

- Organização de código
- Interface moderna e responsiva
- Uso de dados mockados
- Integração real com API externa (somente Conversão)
- Separação clara de responsabilidades

---

# Acesso ao Sistema

Para acessar o sistema utilize:

Email:
UserAdminNexus@gmail.com

Senha:
admin123


Não há autenticação real com back-end, apenas validação simulada (mock).

---

# Funcionalidades

## Login
- Validação simples de email e senha
- Redirecionamento para `/home`
- Simulação de autenticação

---

## Home (Dashboard)
- Cards com indicadores financeiros mockados
- Resumo de movimentações
- Exibição de saldos por ativo:
  - BRL
  - BTC
  - ETH
  - USDT

---

## Usuários
- Lista com 10+ usuários mockados
- Busca por nome ou email
- Filtro por status:
  - ACTIVE
  - PENDING
  - BLOCKED
- Paginação client-side
- Exibição de:
  - Nome
  - Email
  - Status
  - Data de criação
  - Última atividade

---

## Depósito
- Selecionar usuário
- Selecionar ativo
- Informar valor
- Atualização de saldo
- Registro de movimentação (DEPOSIT)

---

## Saque
- Selecionar usuário
- Selecionar ativo
- Informar valor
- Validação de saldo suficiente
- Exibição de erro caso saldo insuficiente
- Registro de movimentação (WITHDRAW)
- Atualização do saldo

---

## Conversão (API REAL – CoinGecko)

Integração com a API pública da CoinGecko para conversão de criptomoedas.

Funcionalidades:
- Selecionar moeda de origem
- Selecionar moeda de destino
- Informar valor
- Botão converter
- Exibição da taxa utilizada
- Tratamento de loading
- Tratamento de erro
- Evita chamadas desnecessárias (somente ao clicar em converter)

---

# Dados Mockados (Obrigatório)

Localizados em:

src/mocks/


Contém:

- usuários.ts → 10+ usuários
- movimentacoes.ts → 30+ movimentações iniciais
- ativos.ts → BRL, BTC, ETH, USDT

Tipos de movimentação:
- DEPOSIT
- WITHDRAW

Status de usuário:
- ACTIVE
- PENDING
- BLOCKED

---

# Estrutura do Projeto

TESTEPRATICONEXUS
│
├── src
│ ├── assets
│ ├── components
│ │ └── Navbar.tsx
│ │
│ ├── context
│ │ └── AppContext.tsx
│ │
│ ├── data
│ │ └── cryptoData.ts
│ │
│ ├── hooks
│ │ └── useScrollReveal.ts
│ │
│ ├── mocks
│ │ ├── ativos.ts
│ │ ├── movimentacoes.ts
│ │ └── usuarios.ts
│ │
│ ├── pages
│ │ ├── Conversao.tsx
│ │ ├── Deposito.tsx
│ │ ├── Home.tsx
│ │ ├── Login.tsx
│ │ ├── Saque.tsx
│ │ └── Usuarios.tsx
│ │
│ ├── types.ts
│ ├── App.tsx
│ ├── main.tsx
│ └── globals.css
│
└── package.json

-----------------------------------

Instale as dependências:

npm install

-----------------------------------

Execute o projeto:

npm run dev