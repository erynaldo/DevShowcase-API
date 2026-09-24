const { body, param } = require('express-validator');
const { validate } = require('./validate');

const createFeedbackRules = [
  param('id')
    .isInt({ min: 1 }).withMessage('O ID do projeto deve ser um inteiro positivo')
    .toInt(),
  body('autor')
    .trim()
    .notEmpty().withMessage('O autor do feedback é obrigatório')
    .bail()
    .isLength({ max: 120 }).withMessage('O autor deve ter no máximo 120 caracteres'),
  body('nota')
    .notEmpty().withMessage('A nota é obrigatória')
    .bail()
    .isInt({ min: 1, max: 5 }).withMessage('A nota deve ser um número inteiro entre 1 e 5')
    .toInt(),
  body('comentario')
    .trim()
    .notEmpty().withMessage('O comentário é obrigatório')
];

const toFeedbackOutput = feedback => ({
  id: feedback.id, projetoId: feedback.projetoId, autor: feedback.autor,
  nota: feedback.nota, comentario: feedback.comentario, createdAt: feedback.createdAt
});

module.exports = { createFeedbackRules, validate, toFeedbackOutput };
