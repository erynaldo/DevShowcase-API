# DevShowcase API

- Backend da plataforma DevShowcase API
- Construído com Node.js, Express, JavaScript, PostgreSQL e Prisma.


## Instalação

```bash
npm install
cp .env.example .env
```

## Antes do primeiro npm run db:migrate nesse banco, marque a migration como aplicada:

- `npx prisma migrate resolve --applied 0001_init`


## Em um banco de dados novo, execute:

```bash
npm run db:migrate
npm run db:seed
```

## Para recriar o banco lógico e reaplicar os seeds:

```bash
npm run db:reset
```

## Execução

```bash
npm run dev
```

API: `http://localhost:3000/api`

Swagger UI: `http://localhost:3000/api/docs`


## Endpoints

- `POST /api/profiles`
- `GET /api/profiles/{id}`
- `POST /api/technologies`
- `GET /api/technologies`
- `POST /api/projects`
- `GET /api/projects`


## Arquitetura

A aplicação está organizada em:

- `prisma`: schema, migrations e seed do banco; em schema.prisma fica os models
- `config`: configuração da aplicação, inicializa as instâncias do banco e Swagger
- `exception`: tratamento de exceções e erros
- `repositories`: camada de acesso a dados, comunicação com o banco via Prisma Client
- `dtos`: validação e transformação de entrada/saída
- `services`: camada de regras de negócio
- `controllers`: camada de apresentação que recebe as requisições HTTP
- `routes`: endpoints REST 
- `tests`: testes de integração


## Comando no CMD para apagar o repositório do Git sem alterar ou perder os seus arquivos e modificações.
- `rmdir /s /q .git`