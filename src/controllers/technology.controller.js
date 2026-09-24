const service = require('../services/technology.service');
const { toTechnologyOutput } = require('../dtos/technology.dto');

const notFound = message => {
  const error = new Error(message);
  error.status = 404;
  return error;
};

exports.create = async (req, res, next) => {
  try { res.status(201).json(toTechnologyOutput(await service.create(req.body))); } catch (e) { next(e); }
};
exports.list = async (req, res, next) => {
  try { res.json((await service.list()).map(toTechnologyOutput)); } catch (e) { next(e); }
};
exports.getById = async (req, res, next) => {
  try {
    const technology = await service.getById(req.params.id);
    if (!technology) return next(notFound('Tecnologia não encontrada'));
    res.json(toTechnologyOutput(technology));
  } catch (e) { next(e); }
};
exports.destroy = async (req, res, next) => {
  try {
    const deletedCount = await service.destroyById(req.params.id);
    if (!deletedCount) return next(notFound('Tecnologia não encontrada'));
    res.status(200).json({ message: 'Tecnologia excluída com sucesso' });
  } catch (e) { next(e); }
};
