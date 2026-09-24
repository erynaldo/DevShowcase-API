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
- GET /api/projects       (Listagem de projetos com filtro por tecnologia e paginação).
- GET /api/projects/{id}  (Buscar projeto por id).
- PUT /api/projects/{id}/upvote     (Incrementa as curtidas do projeto).
- POST /api/projects/{id}/feedbacks (Cadastra nota de 1 a 5 e comentário, recalculando a nota média do projeto).

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
- `GET /api/projects?tecnologia=Node.js&page=1&limit=10`
- `GET /api/projects/{id}`
- `PUT /api/projects/{id}/upvote`
- `POST /api/projects/{id}/feedbacks`

### Filtro e paginação em `GET /api/projects`

| Parâmetro | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `tecnologia` | string | - | Filtra pelo nome da tecnologia (busca parcial, ignora maiúsculas) |
| `tecnologiaId` | inteiro | - | Filtra pelo ID da tecnologia (tem prioridade sobre `tecnologia`) |
| `page` | inteiro | 1 | Página desejada |
| `limit` | inteiro | 10 | Projetos por página (máximo 50) |

A resposta traz os projetos em `data` e os metadados em `pagination`:

```json
{
  "data": [
    {
      "id": 1,
      "titulo": "DevShowcase API",
      "upvotes": 12,
      "notaMedia": 4.5,
      "totalFeedbacks": 2,
      "tecnologias": [{ "id": 1, "nome": "Node.js" }]
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 3, "totalPages": 1 },
  "filtros": { "tecnologia": "Node.js", "tecnologiaId": null }
}
```

### Cadastro de feedback

`POST /api/projects/{id}/feedbacks` grava o feedback e recalcula a nota média do projeto
na mesma transação, devolvendo o valor já atualizado:

```json
{
  "autor": "Maria Souza",
  "nota": 5,
  "comentario": "Projeto muito bem estruturado."
}
```

```json
{
  "id": 7,
  "projetoId": 1,
  "autor": "Maria Souza",
  "nota": 5,
  "comentario": "Projeto muito bem estruturado.",
  "createdAt": "2026-02-10T12:00:00.000Z",
  "projeto": { "id": 1, "notaMedia": 4.67, "totalFeedbacks": 3 }
}
```

## Tratamento global de erros

Todo erro passa pelo manipulador global em `src/exception/error.handler.js` e volta no
mesmo formato, incluindo os erros de validação do `express-validator`:

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "A requisição contém dados inválidos.",
  "path": "/api/projects/1/feedbacks",
  "timestamp": "2026-02-10T12:00:00.000Z",
  "details": [
    { "campo": "nota", "valor": 9, "mensagem": "A nota deve ser um número inteiro entre 1 e 5" }
  ]
}
```

O campo `details` aparece somente em erros de validação. Situações cobertas:

| Status | Quando acontece |
| --- | --- |
| 400 Bad Request | Falha de validação, JSON malformado no corpo da requisição |
| 404 Not Found | Rota inexistente, projeto/perfil/tecnologia não encontrado |
| 409 Conflict | Violação de campo único (ex.: tecnologia já cadastrada) |
| 503 / 504 | Banco de dados indisponível ou lento para responder |
| 500 Internal Server Error | Demais falhas inesperadas |


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