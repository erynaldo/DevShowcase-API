const { body, validationResult } = require('express-validator');

const normalizeFeedbackInput = (req, res, next) => {
  if (req.body && req.body.projetoId === undefined) {
    req.body.projetoId = req.body.id_projeto;
  }
  next();
};

const createFeedbackRules = [
  body('projetoId')
    .isInt({ min: 1 }).withMessage('O ID do projeto deve ser um inteiro positivo')
    .toInt()
    // .not().exists().withMessage('Não é possível alterar o ID do projeto'),
    .not().withMessage('Não é possível alterar o ID do projeto'),
  body('autor').trim().notEmpty().withMessage('O nome do autor é obrigatório'),
  body('comentario').trim().notEmpty().withMessage('O comentário é obrigatório')
];

const updateFeedbackRules = [
  body('autor').optional().trim().notEmpty().withMessage('O nome do autor não pode ficar vazio'),
  body('comentario').optional().trim().notEmpty().withMessage('O comentário não pode ficar vazio'),
  body().custom((value, { req }) => {
    if (req.body.autor === undefined && req.body.comentario === undefined) {
      throw new Error('Informe autor ou comentario para atualizar o feedback');
    }
    return true;
  })
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

const toFeedbackOutput = feedback => ({
  id: feedback.id,
  projetoId: feedback.projetoId,
  autor: feedback.autor,
  comentario: feedback.comentario,
  createdAt: feedback.createdAt
});

module.exports = { normalizeFeedbackInput, createFeedbackRules, updateFeedbackRules, validate, toFeedbackOutput }; 