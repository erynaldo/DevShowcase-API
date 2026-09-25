const { body, validationResult } = require('express-validator');
const { formatDateTime } = require('./date.dto');

const createTechnologyRules = [
  body('nome').trim().notEmpty().withMessage('O nome da tecnologia é obrigatório'),
  body('nome').isLength({ min: 2, max: 50 }).withMessage('O nome da tecnologia deve ter entre 2 e 50 caracteres'),
  body('nome').matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/).withMessage('O nome da tecnologia não pode ser somente números')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

const toTechnologyOutput = technology => ({
  id: technology.id, nome: technology.nome, createdAt: formatDateTime(technology.createdAt)
});

module.exports = { createTechnologyRules, validate, toTechnologyOutput };
