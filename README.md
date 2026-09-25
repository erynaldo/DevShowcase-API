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

**Rodar a aplicação**

```bash
npm run dev
```

**Agora é só rodar a API no endereço URL**

API: `http://localhost:3000/api`


**Endereço URL da documentação**
Swagger UI: `http://localhost:3000/api/docs`

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