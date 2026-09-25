const router = require('express').Router();
const controller = require('../controllers/feedback.controller');
const { normalizeFeedbackInput, createFeedbackRules, updateFeedbackRules, validate } = require('../dtos/feedback.dto');

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Lista todos os feedbacks
 *     tags: [Feedbacks]
 *     responses:
 *       200: {description: Lista de feedbacks}
 * /api/projects/{id}/feedbacks:
 *   post:
 *     summary: Cadastra feedback e atualiza a nota média do projeto
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {$ref: '#/components/schemas/FeedbackInput'}
 *     responses:
 *       201: {description: Feedback criado}
 *       400: {description: Dados inválidos}
 *       404: {description: Projeto não encontrado}
 * /api/feedbacks/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um feedback
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
 *             properties:
 *               autor: {type: string}
 *               comentario: {type: string}
 *     responses:
 *       200: {description: Feedback atualizado}
 *       400: {description: Dados inválidos}
 *       404: {description: Feedback não encontrado}
 *   delete:
 *      summary: Remove um feedback pelo ID
 *      tags: [Feedbacks]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema: {type: integer}
 *      responses:
 *        204: {description: Feedback removido}
 *        404: {description: Feedback não encontrado}
 */
router.get('/', controller.list);
router.post('/', normalizeFeedbackInput, createFeedbackRules, validate, controller.create);
router.patch('/:id', updateFeedbackRules, validate, controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
