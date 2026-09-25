const router = require('express').Router();
const controller = require('../controllers/project.controller');
const { normalizeProjectInput, createProjectRules, validate } = require('../dtos/project.dto');
const feedbackController = require('../controllers/feedback.controller');
const { createFeedbackRules } = require('../dtos/feedback.dto');
const upvoteController = require('../controllers/upvote.controller');
const { upvoteRules, validate: validateUpvote } = require('../dtos/upvote.dto');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projetos]
 *     responses:
 *       200: {description: Lista de projetos}
 *   post:
 *     summary: Cadastra um novo projeto
 *     tags: [Projetos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {$ref: '#/components/schemas/ProjectInput'}
 *     responses:
 *       201: {description: Projeto criado}
 *       400: {description: Dados inválidos}
 *       404: {description: Perfil ou tecnologia não encontrada}
 */

/**
 * @swagger
 * /api/projects/technology/{technology}:
 *   get:
 *     summary: Lista os projetos que utilizam a tecnologia informada
 *     description: "Informe o nome da tecnologia, exemplo: React; ou o ID da tecnologia, exemplo: 7."
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: technology
 *         required: true
 *         description: Nome ou ID da tecnologia
 *         schema: {type: string, example: React}
 *     responses:
 *       200:
 *         description: Lista de projetos que utilizam a tecnologia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: {$ref: '#/components/schemas/ProjectOutput'}
 */

/**
 * @swagger
 * /api/projects/pagination/{limit}:
 *   get:
 *     summary: Lista os projetos especificando quantidade de projetos por página
 *     description: O limite informa a quantidade de projetos por página. A página pode ser informada pela query page e começa em 1.
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: limit
 *         required: true
 *         description: Quantidade de projetos por página, entre 1 e 100
 *         schema: {type: integer, minimum: 1, maximum: 100, example: 10}
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página
 *         schema: {type: integer, minimum: 1, default: 1, example: 1}
 *     responses:
 *       200:
 *         description: Projetos e metadados da paginação
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/PaginatedProjects'}
 *       400: {description: Parâmetros de paginação inválidos}
 */
/**
 * @swagger
 * /api/projects/{id}/feedbacks:
 *   post:
 *     summary: Cadastra feedback e atualiza a nota média do projeto
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: integer}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [autor, nota, comentario]
 *             properties:
 *               autor: {type: string}
 *               nota: {type: integer, minimum: 1, maximum: 5}
 *               comentario: {type: string}
 *     responses:
 *       201:
 *         description: Feedback criado
 *         content:
 *           application/json:
 *             schema: {$ref: '#/components/schemas/FeedbackOutput'}
 *       400: {description: Dados inválidos}
 *       404: {description: Projeto não encontrado}
 * /api/projects/{id}/upvote:
 *   put:
 *     summary: Atualiza as curtidas/estrelas de um determinado projeto
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: integer}
 *     responses:
 *       200:
 *         description: Contadores atualizados
 *       400: {description: ID inválido}
 *       404: {description: Projeto não encontrado}
 */

router.post('/', normalizeProjectInput, createProjectRules, validate, controller.create);
router.get('/', controller.list);
router.post('/:id/feedbacks', createFeedbackRules.slice(1), validate, feedbackController.createForProject);
router.post('/:id/upvote', upvoteRules, validateUpvote, upvoteController.increment);
router.put('/:id/upvote', upvoteRules, validateUpvote, upvoteController.increment);
router.get('/pagination/:limit', controller.listByLimit);
router.get('/technology/:technology', controller.listByTechnology);

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
 *         schema: {type: integer}
 *     responses:
 *       200: {description: Projeto encontrado}
 *       404: {description: Projeto não encontrado}
 */

router.get('/:id', controller.getById);

module.exports = router;
