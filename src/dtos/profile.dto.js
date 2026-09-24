const { body } = require('express-validator');
const { validate } = require('./validate');
const profileRepo = require('../repositories/profile.repository');

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
  funcao: profile.funcao, createdAt: profile.createdAt
}); 


module.exports = { createProfileRules, toProfileOutput, validate };
