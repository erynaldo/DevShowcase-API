const { param, validationResult } = require('express-validator');

const upvoteRules = [
  param('id').isInt({ min: 1 }).withMessage('O ID do projeto deve ser um inteiro positivo').toInt()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

const toUpvoteOutput = project => ({
  id: project.id,
  upvotes: project.upvotes
});

module.exports = { upvoteRules, validate, toUpvoteOutput };
