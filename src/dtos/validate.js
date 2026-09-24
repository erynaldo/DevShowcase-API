const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const error = new Error('A requisição contém dados inválidos.');
  error.status = 400;
  error.details = errors.array().map(item => ({
    campo: item.path || item.param,
    valor: item.value,
    mensagem: item.msg
  }));
  return next(error);
};

module.exports = { validate };
