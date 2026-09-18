const router = require('express').Router();
const controller = require('../controllers/profile.controller');
const { createProfileRules, validate } = require('../dtos/profile.dto'); 

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Lista todos os perfis
 *     tags: [Perfis]
 *     responses:
 *       200: {description: Lista de perfis}
 *   post:
 *     summary: Cadastra um perfil
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
router.get('/', controller.list);
router.post('/', createProfileRules, validate, controller.create);

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
 *   delete:
 *      summary: Remove um perfil por ID
 *      tags: [Perfis]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema: {type: integer}
 *      responses:
 *        204: {description: Perfil removido}
 *        404: {description: Perfil não encontrado}
 */
router.get('/:id', controller.getById);
router.delete('/:id', controller.destroy);
module.exports = router;
