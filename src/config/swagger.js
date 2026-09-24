const swaggerJsdoc = require('swagger-jsdoc');

const servers = [{ url: process.env.API_URL || `http://localhost:${process.env.PORT || 3000}` }];
if (process.env.API_URL) servers.push({ url: `http://localhost:${process.env.PORT || 3000}` });

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'DevShowcase API',
      version: '1.0.0',
      description: 'Documentação Swagger - API RESTful da plataforma DevShowcase.'
    },
    servers,
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
          }
        },
        ProjectOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            profileId: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Portfólio Dev' },
            descricao: { type: 'string' },
            url_repositorio: { type: 'string', format: 'uri' },
            endereco_url: { type: 'string', format: 'uri' },
            upvotes: { type: 'integer', example: 12 },
            notaMedia: { type: 'number', format: 'float', example: 4.33 },
            totalFeedbacks: { type: 'integer', example: 3 },
            tecnologias: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  nome: { type: 'string', example: 'Node.js' }
                }
              }
            },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        ProjectPage: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: '#/components/schemas/ProjectOutput' } },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'integer', example: 1 },
                limit: { type: 'integer', example: 10 },
                total: { type: 'integer', example: 42 },
                totalPages: { type: 'integer', example: 5 }
              }
            },
            filtros: {
              type: 'object',
              properties: {
                tecnologia: { type: 'string', nullable: true, example: 'Node.js' },
                tecnologiaId: { type: 'integer', nullable: true, example: null }
              }
            }
          }
        },
        UpvoteOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Portfólio Dev' },
            upvotes: { type: 'integer', example: 13 }
          }
        },
        FeedbackInput: {
          type: 'object',
          required: ['autor', 'nota', 'comentario'],
          properties: {
            autor: { type: 'string', minLength: 1, maxLength: 120, example: 'Maria Souza' },
            nota: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
            comentario: { type: 'string', minLength: 1, example: 'Projeto muito bem estruturado.' }
          }
        },
        FeedbackOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 7 },
            projetoId: { type: 'integer', example: 1 },
            autor: { type: 'string', example: 'Maria Souza' },
            nota: { type: 'integer', example: 5 },
            comentario: { type: 'string', example: 'Projeto muito bem estruturado.' },
            createdAt: { type: 'string', format: 'date-time' },
            projeto: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                notaMedia: { type: 'number', format: 'float', example: 4.33 },
                totalFeedbacks: { type: 'integer', example: 3 }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'integer', example: 400 },
            error: { type: 'string', example: 'Bad Request' },
            message: { type: 'string', example: 'A requisição contém dados inválidos.' },
            path: { type: 'string', example: '/api/projects/1/feedbacks' },
            timestamp: { type: 'string', format: 'date-time' },
            details: {
              type: 'array',
              description: 'Presente apenas em erros de validação',
              items: {
                type: 'object',
                properties: {
                  campo: { type: 'string', example: 'nota' },
                  valor: { example: 9 },
                  mensagem: { type: 'string', example: 'A nota deve ser um número inteiro entre 1 e 5' }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
