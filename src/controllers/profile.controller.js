const service = require('../services/profile.service');
const { toProfileOutput } = require('../dtos/profile.dto');
exports.create = async (req, res, next) => {
  try { res.status(201).json(toProfileOutput(await service.create(req.body))); } catch (e) { next(e); }
};
exports.list = async (req, res, next) => {
  try { res.json((await service.list()).map(toProfileOutput)); } catch (e) { next(e); }
};
exports.getById = async (req, res, next) => {
  try {
    const profile = await service.getById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Perfil não encontrado' });
    res.json(toProfileOutput(profile));
  } catch (e) { next(e); }
};
exports.destroy = async (req, res, next) => {
  try {
    const deletedCount = await service.destroyById(req.params.id);
    if (!deletedCount) return res.status(404).json({ message: 'Perfil não encontrado' });
    res.status(200).json({ message: 'Perfil excluído com sucesso' });
  } catch (e) { next(e); }
};
