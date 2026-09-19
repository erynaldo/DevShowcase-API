# DevShowcase API

Backend da plataforma DevShowcase API.

Construído com Node.js, Express, JavaScript, PostgreSQL e Prisma.


## Instalação

```bash
npm install
```

```bash
cp .env.example .env
```

## Antes do primeiro npm run db:migrate nesse banco, marque a migration como aplicada:

```bash
npx prisma migrate resolve --applied 0001_init
```

## Em um banco de dados novo, execute:

```bash
npm run db:migrate
npm run db:seed
```

## Para recriar o banco lógico e reaplicar os seeds:

```bash
npm run db:reset
```

## Rodar a aplicação

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


Comando para apagar o diretorio .git sem alterar ou perder os arquivos e modificações feitas no projeto.

```bash
rmdir /s /q .git
```

Comando para dar merge em todas as outras branches locais (exceto a própria main).

```bash
git branch | grep -v "main" | xargs -n 1 git merge
```