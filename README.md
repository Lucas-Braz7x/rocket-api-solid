# Rocket API Solid

Simulação de uma API de academias no estilo **Gympass**, desenvolvida durante o curso da **Rocketseat** na trilha de **Node.js**, com foco em **boas práticas de arquitetura utilizando o padrão SOLID**.

## 📌 Objetivo

A aplicação tem como objetivo representar o backend de um sistema de academias com funcionalidades como:

- Cadastro e autenticação de usuários
- Registro de academias (gyms)
- Registro de check-ins em academias
- Validação de check-ins
- Listagem de academias próximas com base em geolocalização

Esse projeto é voltado para estudo e prática de princípios como:

- **Responsabilidade única (SRP)**
- **Inversão de dependência (DIP)**
- **Separação de camadas (use-cases, controllers, repositórios, etc.)**

---

## 🛠️ Tecnologias utilizadas

- **Node.js** (runtime)
- **Fastify** (framework web)
- **Prisma ORM** (com SQLite)
- **Zod** (validação de dados)
- **JWT** (autenticação)
- **bcryptjs** (hash de senhas)
- **Vitest** + **Supertest** (testes)

---

---

## 🚀 Como executar

### Pré-requisitos

- Node.js instalado (v18+)
- Pnpm, Yarn ou npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Lucas-Braz7x/rocket-api-solid.git

# Acesse a pasta
cd rocket-api-solid

# Instale as dependências
npm install
# ou
yarn


# Crie o banco de dados SQLite
npx prisma migrate dev


npm run dev
# ou
yarn dev


# 🔐 Funcionalidades da API (resumo)
- Registro de usuário

- Autenticação com JWT

- Cadastro de academias

- Check-in em academias

- Validação de check-in

- Listagem de histórico de check-ins

- Buscar academias por proximidade


# 📚 Aprendizados
Este projeto foi fundamental para consolidar práticas modernas de desenvolvimento backend com:

- Separação de responsabilidades
- Uso de testes automatizados desde o início
- Autenticação baseada em tokens
- Boas práticas de estrutura de pastas
- Testes e TDD com Vitest

# 📖 Créditos
Projeto baseado na trilha de Node.js da Rocketseat, com adaptações pessoais.
```
