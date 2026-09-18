const service = require('../services/project.service');
const { toProjectOutput } = require('../dtos/project.dto');
exports.create = async (req, res, next) => {
  try { res.status(201).json(toProjectOutput(await service.create(req.body))); } catch (e) { next(e); }
};
exports.list = async (req, res, next) => {
  try { res.json((await service.list()).map(toProjectOutput)); } catch (e) { next(e); }
};
exports.getById = async (req, res, next) => {
  try {
    const project = await service.getById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.json(toProjectOutput(project));
  } catch (e) { next(e); }
};
