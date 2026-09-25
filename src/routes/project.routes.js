const router = require('express').Router();
const controller = require('../controllers/project.controller');
const { normalizeProjectInput, createProjectRules, validate } = require('../dtos/project.dto');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projetos]
 *     responses:
 *       200: {description: Lista de projetos}
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
 *       400: {description: Dados inválidos}
 *       404: {description: Perfil ou tecnologia não encontrada}
 */

router.post('/', normalizeProjectInput, createProjectRules, validate, controller.create);
router.get('/', controller.list);

module.exports = router;
