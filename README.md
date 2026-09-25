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
- GET /api/profiles       (Listagem de todas os perfils).

- POST /api/technologies  (Cadastro de tecnologia com validações).
- GET /api/technologies   (Listagem de todas as tecnologias).

- POST /api/projects      (Cadastro de projeto com validações).
- GET /api/projects       (Listagem de todos os projetos).
- GET /api/projects/{id}  (Buscar projeto por id).

- GET /api/projects/technology/{technology}         (Listagem de projetos que utilizam uma tecnologia).
- GET /api/projects/pagination/{limite}?page=1      (Listagem paginada de projetos).

- POST /api/projects/{id}/upvote (Adicionar upvotes).
- PUT /api/projects/{id}/upvote  (Atualizar/Incrementar upvotes).

- POST /api/projects/{id}/feedbacks (Cadastro de feedback com nota de 1 a 5 a um projeto).
- GET /api/feedbacks           (Listagem de todos os feedbacks).


**-----------------------------------------------**

## Clonar essa aplicação

```bash
git clone URL_do_repositorio
```

**Instalar as dependências**

```bash
npm install
```

**Forçar a correção de vulnerabilidades**

```bash
npm audit fix --force
```

**Copiar o arquivo variáveis de ambiente**

```bash
cp .env.example .env
```

**Inserir no arquivo .env as credenciais do banco de dados postgresql hospedado na nuvem**

 - Exemplo: DATABASE_URL=postgres://nome_do_usuario:senha_desse_usuario@...

**Gerar a biblioteca de código para interagir com o banco de dados. Lê o arquivo schema e cria o Prisma Client**

```bash
npx prisma generate
```

**Migrate deploy**

```bash
npx prisma migrate deploy
```

**Rodar a aplicação**

```bash
npm run dev
```

**Endereços locais para testar a API**

<!-- API local: `http://localhost:3000/api` -->
API Render: `https://devshowcase-api-4ezm.onrender.com/api`


**Documentação Swagger local**

<!-- Swagger UI: `http://localhost:3000/api/docs` -->
Swagger UI Render: `https://devshowcase-api-4ezm.onrender.com/api/docs`

**-----------------------------------------------**

### Outros comandos importantes

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