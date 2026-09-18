const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'OpenAPI definition',
      version: '1.0.0',
      description: 'API REST inicial da plataforma DevShowcase.'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        ProfileInput: {
          type: 'object',
          required: ['nome', 'usuario'],
          properties: {
            nome: { type: 'string', minLength: 1 },
            usuario: { type: 'string', minLength: 1 },
            funcao: { type: 'string' }
            // avatarUrl: { type: 'string', format: 'uri' }
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
        // FeedbackInput: {
        //   type: 'object',
        //   required: ['id_projeto', 'autor', 'comentario'],
        //   properties: {
        //     id_projeto: { type: 'integer', example: 1 },
        //     autor: { type: 'string', minLength: 1 },
        //     comentario: { type: 'string', minLength: 1 }
        //   }
        // }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
