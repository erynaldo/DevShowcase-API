# DevShowcase API

Backend: API RESTful da plataforma DevShowcase.


## Construção da API

Linguagem: JavaScript.

Stacks escolhidas: Node.js, Express, Prisma e PostgreSQL.


## Modelagem de entidades relacionais:

**Criação das entidades:**

- Profile (Perfil do Desenvolvedor), 
- Project (Projeto), 
- Feedback (Opinião), 
- Technology (Tecnologia).


**Relacionamentos:**

- Profile 1 : N Project
- Project N : N Technology
- Project 1 : N Feedback


## Endpoints implementadas:

- POST /api/profiles      (Cadastro de perfil com validações).
- GET /api/profiles/{id}  (Buscar perfil por id).
- POST /api/technologies  (Cadastro de tecnologia com validações).
- GET /api/technologies   (Listagem de todas as tecnologias).
- POST /api/projects      (Cadastro de projeto com validações).
- GET /api/projects       (Listagem de projetos).

## Instalação das dependências da aplicação

```bash
npm install
```

```bash
cp .env.example .env
```

## Para criar o banco de dados, execute:

```bash
npm run db:migrate
```


## Para inserir os registros no banco de dados:

```bash
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


## Endpoints da API

- `POST /api/profiles`
- `GET /api/profiles/{id}`
- `POST /api/technologies`
- `GET /api/technologies`
- `POST /api/projects`
- `GET /api/projects`


## Arquitetura da aplicação

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