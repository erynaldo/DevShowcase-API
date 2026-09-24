const { body, param, query } = require('express-validator');
const { validate } = require('./validate');

const PAGE_PADRAO = 1;
const LIMITE_PADRAO = 10;
const LIMITE_MAXIMO = 50;

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

const listProjectRules = [
  query('tecnologia')
    .optional()
    .trim()
    .notEmpty().withMessage('A tecnologia informada no filtro não pode ser vazia'),
  query('tecnologiaId')
    .optional()
    .isInt({ min: 1 }).withMessage('O ID da tecnologia deve ser um inteiro positivo')
    .toInt(),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('A página deve ser um inteiro maior ou igual a 1')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: LIMITE_MAXIMO }).withMessage(`O limite deve ser um inteiro entre 1 e ${LIMITE_MAXIMO}`)
    .toInt()
];

const projectIdRules = [
  param('id')
    .isInt({ min: 1 }).withMessage('O ID do projeto deve ser um inteiro positivo')
    .toInt()
];

const toListQuery = req => ({
  tecnologia: req.query.tecnologia,
  tecnologiaId: req.query.tecnologiaId,
  page: req.query.page || PAGE_PADRAO,
  limit: req.query.limit || LIMITE_PADRAO
});

const toProjectOutput = project => ({
  id: project.id, profileId: project.profileId, titulo: project.titulo,
  descricao: project.descricao, url_repositorio: project.url_repositorio,
  endereco_url: project.url_demonstracao,
  upvotes: project.upvotes,
  notaMedia: project.notaMedia,
  totalFeedbacks: project.totalFeedbacks ?? 0,
  tecnologias: project.technologies?.map(t => ({ id: t.id, nome: t.nome })) || [],
  createdAt: project.createdAt
});

module.exports = {
  normalizeProjectInput, createProjectRules, listProjectRules, projectIdRules,
  validate, toListQuery, toProjectOutput
};
