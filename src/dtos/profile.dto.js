const { body, validationResult } = require('express-validator');
const profileRepo = require('../repositories/profile.repository');
const { formatDateTime } = require('./date.dto');

const createProfileRules = [
  body('nome').trim().notEmpty().withMessage('O nome é obrigatório'),
  body('usuario')
    .trim()
    .notEmpty().withMessage('O nome de usuário é obrigatório')
    .bail()
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/).withMessage('O nome de usuário não pode ser somente números')
    .custom(async value => {
      const profile = await profileRepo.findByUsuario(value);
      if (profile) throw new Error('Esse nome de usuário já existe');
      return true;
    }),
  body('funcao').trim().notEmpty().withMessage('A função é obrigatória'),
];

const toProfileOutput = profile => ({
  id: profile.id, nome: profile.nome, usuario: profile.usuario,
  funcao: profile.funcao, createdAt: formatDateTime(profile.createdAt)
}); 

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { createProfileRules, toProfileOutput, validate };
