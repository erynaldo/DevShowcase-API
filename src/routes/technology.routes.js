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

module.exports = router; 
