const service = require('../services/project.service');
const { toProjectOutput } = require('../dtos/project.dto');
exports.create = async (req, res, next) => {
  try { res.status(201).json(toProjectOutput(await service.create(req.body))); } catch (e) { next(e); }
};
exports.list = async (req, res, next) => {
  try {
    const page = req.query.page === undefined ? undefined : Number(req.query.page);
    const limit = req.query.limit === undefined ? undefined : Number(req.query.limit);
    if ((page !== undefined && (!Number.isInteger(page) || page < 1)) ||
      (limit !== undefined && (!Number.isInteger(limit) || limit < 1 || limit > 100))) {
      return res.status(400).json({ message: 'page e limit devem ser inteiros positivos; limit deve ser no máximo 100' });
    }
    if ((page === undefined) !== (limit === undefined)) {
      return res.status(400).json({ message: 'page e limit devem ser informados juntos' });
    }
    const result = await service.list({ page, limit });
    if (page === undefined) return res.json(result.map(toProjectOutput));
    res.json({
      data: result.projects.map(toProjectOutput),
      pagination: {
        page,
        projectsForPage: limit,
        totalProjects: result.total,
        totalPages: Math.ceil(result.total / limit)
      }
    });
  } catch (e) { next(e); }
};

exports.listByLimit = async (req, res, next) => {
  try {
    const limit = Number(req.params.limit);
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isInteger(page) || page < 1) {
      return res.status(400).json({ message: 'limit deve ser um inteiro entre 1 e 100 e page deve ser um inteiro positivo' });
    }
    const result = await service.list({ page, limit });
    res.json({
      data: result.projects.map(toProjectOutput),
      pagination: {
        page,
        projectsForPage: limit,
        totalProjects: result.total,
        totalPages: Math.ceil(result.total / limit)
      }
    });
  } catch (e) { next(e); }
};

exports.listByTechnology = async (req, res, next) => {
  try {
    const projects = await service.findByTechnology(req.params.technology);
    res.json(projects.map(toProjectOutput));
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const project = await service.getById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.json(toProjectOutput(project));
  } catch (e) { next(e); }
};
