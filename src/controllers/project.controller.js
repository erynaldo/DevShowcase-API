const service = require('../services/project.service');
const { toProjectOutput, toListQuery } = require('../dtos/project.dto');

const notFound = message => {
  const error = new Error(message);
  error.status = 404;
  return error;
};

exports.create = async (req, res, next) => {
  try { res.status(201).json(toProjectOutput(await service.create(req.body))); } catch (e) { next(e); }
};
exports.list = async (req, res, next) => {
  try {
    const { tecnologia, tecnologiaId, page, limit } = toListQuery(req);
    const { total, projects } = await service.list({ tecnologia, tecnologiaId, page, limit });
    res.json({
      data: projects.map(toProjectOutput),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      filtros: { tecnologia: tecnologia ?? null, tecnologiaId: tecnologiaId ?? null }
    });
  } catch (e) { next(e); }
};
exports.getById = async (req, res, next) => {
  try {
    const project = await service.getById(req.params.id);
    if (!project) return next(notFound('Projeto não encontrado'));
    res.json(toProjectOutput(project));
  } catch (e) { next(e); }
};
exports.upvote = async (req, res, next) => {
  try {
    const project = await service.upvote(req.params.id);
    res.json({ id: project.id, titulo: project.titulo, upvotes: project.upvotes });
  } catch (e) { next(e); }
};
