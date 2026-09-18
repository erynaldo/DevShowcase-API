const router = require('express').Router();
const controller = require('../controllers/technology.controller');
const { createTechnologyRules, validate } = require('../dtos/technology.dto');

/**
 * @swagger
 * /api/technologies:
 *   get:
 *     summary: Lista todas as tecnologias
 *     tags: [Tecnologias]
 *     responses:
 *       200: {description: Lista de tecnologias}
 *   post:
 *     summary: Cadastra uma tecnologia
 *     tags: [Tecnologias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {$ref: '#/components/schemas/TechnologyInput'}
 *     responses:
 *       201: {description: Tecnologia criada}
 *       400: {description: Dados inválidos}
 */
router.get('/', controller.list);
router.post('/', createTechnologyRules, validate, controller.create);
 
/**
 * @swagger
 * /api/technologies/{id}:
 *   get:
 *     summary: Busca uma tecnologia por ID
 *     tags: [Tecnologias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: integer}
 *     responses:
 *       200: {description: Tecnologia encontrada}
 *       404: {description: Tecnologia não encontrada}
 *   delete:
 *     summary: Remove uma tecnologia por ID
 *     tags: [Tecnologias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: integer}
 *     responses:
 *       204: {description: Tecnologia removida}
 *       404: {description: Tecnologia não encontrada}
 */
router.get('/:id', controller.getById);
router.delete('/:id', controller.destroy);
module.exports = router; 
