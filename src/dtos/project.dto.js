const { body, validationResult } = require('express-validator');
const { formatDateTime } = require('./date.dto');

const normalizeProjectInput = (req, res, next) => {
  if (req.body) {
    if (req.body.profileId === undefined) {
      req.body.profileId = req.body.id_perfil ?? req.body.id_proprietario;
    }
    if (req.body.url_demonstracao === undefined) {
      req.body.url_demonstracao = req.body.endereco_url;
    }
    if (req.body.technologyIds === undefined) {
      req.body.technologyIds = req.body.tecnologias ?? req.body.tecnologiasIds;
    }
    if (Array.isArray(req.body.technologyIds)) {
      req.body.technologyIds = req.body.technologyIds.map(technology => (
        typeof technology === 'object' && technology !== null ? technology.id : technology
      ));
    }
  }
  next();
};

const createProjectRules = [
  body('profileId')
    .trim()
    .notEmpty().withMessage('O ID do perfil é obrigatório')
    .bail()
    .isInt({ min: 1 }).withMessage('O ID do perfil deve ser um inteiro positivo')
    .toInt(),
  body('titulo').trim().notEmpty().withMessage('O título é um campo obrigatório'),
  body('url_repositorio').notEmpty().isURL().withMessage('Esse campo deve ser preenchido e deve ser uma URL válida'),
  body('url_demonstracao').notEmpty().withMessage('O campo endereço URL deve ser preenchido'),
  body('url_demonstracao').optional().isURL().withMessage('O endereço URL deve ser válido'),
  body('technologyIds').notEmpty().isArray().withMessage('Os IDs das tecnologias devem ser um array'),
  body('technologyIds.*').optional().isInt({ min: 1 }).withMessage('Os IDs das tecnologias devem conter valores válidos')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

const toProjectOutput = project => ({
  id: project.id, profileId: project.profileId, titulo: project.titulo,
  descricao: project.descricao, url_repositorio: project.url_repositorio,
  endereco_url: project.url_demonstracao,
  notaMedia: Number((project.notaMedia || 0).toFixed(1)),
  upvotes: project.upvotes,
  totalFeedbacks: project.totalFeedbacks,
  tecnologias: project.technologies?.map(t => ({ id: t.id, nome: t.nome })) || [],
  createdAt: formatDateTime(project.createdAt)
});

module.exports = { normalizeProjectInput, createProjectRules, validate, toProjectOutput }; 
