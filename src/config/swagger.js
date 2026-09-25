const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'OpenAPI definition',
      version: '1.0.0',
      description: 'Documentação - API RESTful da plataforma DevShowcase.'
    },
    servers: [
      // { url: 'http://localhost:3000', description: 'Servidor local' }
      { url: 'https://devshowcase-api-4ezm.onrender.com', description: 'Servidor Render' }
    ],
    components: {
      schemas: {
        ProfileInput: {
          type: 'object',
          required: ['nome', 'usuario'],
          properties: {
            nome: { type: 'string', minLength: 1 },
            usuario: { type: 'string', minLength: 1 },
            funcao: { type: 'string' }
          }
        },
        TechnologyInput: {
          type: 'object',
          required: ['nome'],
          properties: { nome: { type: 'string', minLength: 1 } }
        },
        ProjectInput: {
          type: 'object',
          required: ['profileId', 'titulo'],
          properties: {
            profileId: { type: 'integer', example: 1 },
            titulo: { type: 'string', minLength: 1 },
            descricao: { type: 'string' },
            url_repositorio: { type: 'string', format: 'uri' },
            url_demonstracao: { type: 'string', format: 'uri' },
            technologyIds: { type: 'array', items: { type: 'integer' } },
            endereco_url: { type: 'string', format: 'uri' }
          }
        },
        ProjectOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            profileId: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'DevShowcase API' },
            descricao: { type: 'string', nullable: true },
            endereco_url: { type: 'string', format: 'uri', nullable: true },
            notaMedia: { type: 'number', format: 'float', example: 4.6 },
            upvotes: { type: 'integer', example: 12 },
            totalFeedbacks: { type: 'integer', example: 8 },
            createdAt: { type: 'string', example: '2026-09-25 / 14:03:07' },
            tecnologias: { type: 'array', items: { type: 'object' } }
          }
        },
        PaginatedProjects: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: '#/components/schemas/ProjectOutput' } },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'integer', example: 1 },
                projectsForPage: { type: 'integer', example: 10 },
                totalProjects: { type: 'integer', example: 25 },
                totalPages: { type: 'integer', example: 3 }
              }
            }
          }
        },
        FeedbackOutput: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              projetoId: { type: 'integer', example: 1 },
              autor: { type: 'string', example: 'Ana Silva' },
              nota: { type: 'integer', example: 5 },
              comentario: { type: 'string' },
              createdAt: { type: 'string', example: '2026-09-25 / 14:03:07' }
            }
          },
        FeedbackInput: {
          type: 'object',
          required: ['id_projeto', 'autor', 'nota', 'comentario'],
          properties: {
            id_projeto: { type: 'integer', example: 1 },
            autor: { type: 'string', minLength: 1 },
            nota: { type: 'integer', minimum: 1, maximum: 5 },
            comentario: { type: 'string', minLength: 1 }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
