const router = require('express').Router();
const controller = require('../controllers/project.controller');
const feedbackController = require('../controllers/feedback.controller');
const {
  normalizeProjectInput, createProjectRules, listProjectRules, projectIdRules, validate
} = require('../dtos/project.dto');
const { createFeedbackRules } = require('../dtos/feedback.dto');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Lista projetos com filtro por tecnologia e paginação
 *     tags: [Projetos]
 *     parameters:
 *       - in: query
 *         name: tecnologia
 *         schema: {type: string}
 *         description: Filtra pelo nome da tecnologia (busca parcial, ignora maiúsculas)
 *         example: Node.js
 *       - in: query
 *         name: tecnologiaId
 *         schema: {type: integer, minimum: 1}
 *         description: Filtra pelo ID da tecnologia (tem prioridade sobre o filtro por nome)
 *       - in: query
 *         name: page
 *         schema: {type: integer, minimum: 1, default: 1}
 *         description: Página desejada
 *       - in: query
 *         name: limit
 *         schema: {type: integer, minimum: 1, maximum: 50, default: 10}
 *         description: Quantidade de projetos por página
 *     responses:
 *       200:
 *         description: Página de projetos
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ProjectPage'}
 *       400:
 *         description: Parâmetros de filtro ou paginação inválidos
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ErrorResponse'}
 *   post:
 *     summary: Cadastra um projeto
 *     tags: [Projetos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {$ref: '#/components/schemas/ProjectInput'}
 *     responses:
 *       201: {description: Projeto criado}
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ErrorResponse'}
 *       404:
 *         description: Perfil ou tecnologia não encontrada
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ErrorResponse'}
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Busca um projeto pelo ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: integer, minimum: 1}
 *     responses:
 *       200: {description: Projeto encontrado}
 *       404:
 *         description: Projeto não encontrado
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ErrorResponse'}
 */

/**
 * @swagger
 * /api/projects/{id}/upvote:
 *   put:
 *     summary: Incrementa as curtidas do projeto
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: integer, minimum: 1}
 *     responses:
 *       200:
 *         description: Curtidas atualizadas
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/UpvoteOutput'}
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ErrorResponse'}
 *       404:
 *         description: Projeto não encontrado
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ErrorResponse'}
 */

/**
 * @swagger
 * /api/projects/{id}/feedbacks:
 *   post:
 *     summary: Cadastra um feedback (nota de 1 a 5 e comentário) e atualiza a nota média do projeto
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: integer, minimum: 1}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {$ref: '#/components/schemas/FeedbackInput'}
 *     responses:
 *       201:
 *         description: Feedback criado e nota média recalculada
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/FeedbackOutput'}
 *       400:
 *         description: Dados inválidos (nota fora do intervalo de 1 a 5, autor ou comentário ausentes)
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ErrorResponse'}
 *       404:
 *         description: Projeto não encontrado
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/ErrorResponse'}
 */

router.post('/', normalizeProjectInput, createProjectRules, validate, controller.create);
router.get('/', listProjectRules, validate, controller.list);
router.get('/:id', projectIdRules, validate, controller.getById);
router.put('/:id/upvote', projectIdRules, validate, controller.upvote);
router.post('/:id/feedbacks', createFeedbackRules, validate, feedbackController.create);

module.exports = router;
