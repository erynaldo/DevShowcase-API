const router = require('express').Router();
const controller = require('../controllers/profile.controller');
const { createProfileRules, validate } = require('../dtos/profile.dto'); 

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Busca um perfil por ID
 *     tags: [Perfis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: integer}
 *     responses:
 *       200: {description: Perfil encontrado}
 *       404: {description: Perfil não encontrado}
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Cadastra um perfil de Desenvolvedor
 *     tags: [Perfis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {$ref: '#/components/schemas/ProfileInput'}
 *     responses:
 *       201: {description: Perfil criado}
 *       400: {description: Dados inválidos}
 */

router.post('/', createProfileRules, validate, controller.create);

module.exports = router;
