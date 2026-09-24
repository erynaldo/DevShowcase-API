const { body } = require('express-validator');
const { validate } = require('./validate');

const createTechnologyRules = [
  body('nome').trim().notEmpty().withMessage('O nome da tecnologia é obrigatório'),
  body('nome').isLength({ min: 2, max: 50 }).withMessage('O nome da tecnologia deve ter entre 2 e 50 caracteres'),
  body('nome').matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/).withMessage('O nome da tecnologia não pode ser somente números')
];


const toTechnologyOutput = technology => ({
  id: technology.id, nome: technology.nome, createdAt: technology.createdAt
});

module.exports = { createTechnologyRules, validate, toTechnologyOutput };
